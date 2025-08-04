import anywidget
import traitlets
import pathlib
import re

class ObservableWidget(anywidget.AnyWidget):
    notebook_path = traitlets.Unicode().tag(sync=True)
    json_data = traitlets.Dict(default_value={}).tag(sync=True)
    runtime_js = traitlets.Unicode().tag(sync=True)
    notebook_js = traitlets.Unicode().tag(sync=True)
    scrubber_js = traitlets.Unicode().tag(sync=True)
    dependency_files = traitlets.Dict(default_value={}).tag(sync=True)
    visible_cells = traitlets.List(default_value=[]).tag(sync=True)
    
    def __init__(self, notebook_path="", json_data=None, visible_cells=None, **kwargs):
        super().__init__(**kwargs)
        self.notebook_path = notebook_path
        if json_data:
            self.json_data = json_data
        if visible_cells:
            self.visible_cells = visible_cells
        
        try:
            base_path = pathlib.Path(notebook_path)
            
            # Load runtime.js (still hardcoded)
            with open(base_path / "runtime.js", 'r') as f:
                self.runtime_js = f.read()
            
            # Load main notebook file using auto-discovery
            main_file = self._find_main_notebook_file(base_path)
            with open(main_file, 'r') as f:
                self.notebook_js = f.read()
            
            # Auto-discover and load dependencies from main file
            self._load_dependencies(base_path, self.notebook_js)
            
            print(f"ObservableHQ files loaded successfully")
            
        except Exception as e:
            print(f"Error loading files: {e}")
    
    def _find_main_notebook_file(self, base_path):
        """Find the main notebook JavaScript file using index.js"""
        index_file = base_path / "index.js"
        
        if not index_file.exists():
            raise FileNotFoundError(f"index.js not found in {base_path}")
        
        # Read index.js to find the main export
        with open(index_file, 'r') as f:
            content = f.read()
        
        # Parse export statement like: export {default} from "./845501cdfbbf1a83@464.js";
        export_pattern = r'export\s+\{[^}]*default[^}]*\}\s+from\s+[\'"]\.\/([^\'\"]+)[\'"]'
        match = re.search(export_pattern, content)
        
        if match:
            main_filename = match.group(1)
            main_file = base_path / main_filename
            
            if main_file.exists():
                return main_file
            else:
                raise FileNotFoundError(f"Main file {main_filename} referenced in index.js not found")
        
        # Alternative pattern: export {default} from "./file.js"
        simple_export_pattern = r'export\s+\{[^}]*\}\s+from\s+[\'"]\.\/([^\'\"]+)[\'"]'
        match = re.search(simple_export_pattern, content)
        
        if match:
            main_filename = match.group(1)
            main_file = base_path / main_filename
            
            if main_file.exists():
                return main_file
        
        raise FileNotFoundError(f"Could not parse main file from index.js in {base_path}")
    
    def _load_dependencies(self, base_path, notebook_content):
        """Parse and load dependency files from import statements in the main notebook"""
        # Find import statements like: import define1 from "./450051d7f1174df8@254.js";
        import_pattern = r'import\s+\w+\s+from\s+[\'"]\.\/([^\'\"]+)[\'"]'
        matches = re.findall(import_pattern, notebook_content)
        
        dependencies = {}
        
        # Load each dependency file
        for dep_filename in matches:
            dep_file = base_path / dep_filename
            if dep_file.exists():
                with open(dep_file, 'r') as f:
                    dependencies[dep_filename] = f.read()
            else:
                print(f"Warning: Dependency file {dep_filename} not found")
        
        self.dependency_files = dependencies
        
        # For backward compatibility, set scrubber_js to the first dependency
        if dependencies:
            first_dep = list(dependencies.values())[0]
            self.scrubber_js = first_dep
        else:
            self.scrubber_js = ""
    
    _esm = r"""
    function render(view) {
        const model = view.model;
        const el = view.el;
        
        const container = document.createElement("div");
        container.style.cssText = "width: 100%; min-height: 500px; padding: 20px; border: 1px solid #ccc;";
        container.innerHTML = "<h3>Loading ObservableHQ Notebook...</h3>";
        el.appendChild(container);
        
        executeObservableNotebook(container, model);
    }

    async function executeObservableNotebook(container, model) {
        try {
            console.log("Loading ObservableHQ notebook");
            
            const runtimeCode = model.get("runtime_js");
            let notebookCode = model.get("notebook_js"); 
            const scrubberCode = model.get("scrubber_js");
            const dependencyFiles = model.get("dependency_files");
            const jsonData = model.get("json_data");
            const visibleCells = model.get("visible_cells");
            
            // Inject JSON data if provided
            let jsonBlobUrl;
            if (jsonData && Object.keys(jsonData).length > 0) {
                const jsonFilename = Object.keys(jsonData)[0];
                const sampleData = jsonData[jsonFilename];
                const jsonBlob = new Blob([JSON.stringify(sampleData)], {
                    type: 'application/json'
                });
                jsonBlobUrl = URL.createObjectURL(jsonBlob);
                
                const filePattern = /\.\/files\/[a-f0-9]+\.json/g;
                notebookCode = notebookCode.replace(filePattern, jsonBlobUrl);
            }
            
            // Override FileAttachment for data injection
            const originalFileAttachment = globalThis.FileAttachment;
            globalThis.FileAttachment = function(filename) {
                if (jsonData && jsonData[filename]) {
                    return {
                        json: () => Promise.resolve(jsonData[filename]),
                        name: filename,
                        mimeType: "application/json"
                    };
                }
                return originalFileAttachment ? originalFileAttachment(filename) : null;
            };
            
            // Create module URLs with all dependencies
            const moduleUrls = createModuleUrls(runtimeCode, notebookCode, dependencyFiles);
            
            // Load ObservableHQ runtime
            const runtimeModule = await import(moduleUrls.runtime);
            const { Runtime, Library, Inspector } = runtimeModule;
            
            const runtime = new Runtime();
            const notebookModule = await import(moduleUrls.notebook);
            
            container.innerHTML = "";
            
            // Create inspector with cell visibility control
            const inspector = createSelectiveInspector(container, visibleCells);
            
            const main = runtime.module(notebookModule.default, inspector);
            
            console.log("ObservableHQ notebook loaded successfully");
            
            // Cleanup URLs after delay
            scheduleCleanup(moduleUrls, jsonBlobUrl, originalFileAttachment);
            
        } catch (error) {
            console.error("Error loading ObservableHQ notebook:", error);
            container.innerHTML = `<div style="color: red; padding: 20px;">
                <h3>Error loading ObservableHQ notebook</h3>
                <p><strong>Error:</strong> ${error.message}</p>
            </div>`;
        }
    }

    function createModuleUrls(runtimeCode, notebookCode, dependencyFiles) {
        const runtimeBlob = new Blob([runtimeCode], {type: 'application/javascript'});
        const runtimeUrl = URL.createObjectURL(runtimeBlob);
        
        const urls = {
            runtime: runtimeUrl,
            dependencies: {}
        };
        
        // Create URLs for all dependency files and update references in notebook
        let updatedNotebookCode = notebookCode;
        
        for (const [filename, content] of Object.entries(dependencyFiles)) {
            const depBlob = new Blob([content], {type: 'application/javascript'});
            const depUrl = URL.createObjectURL(depBlob);
            urls.dependencies[filename] = depUrl;
            
            // Replace references to this dependency in the notebook code
            const originalRef = `./${filename}`;
            updatedNotebookCode = updatedNotebookCode.replace(new RegExp(originalRef.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), depUrl);
        }
        
        // Create notebook URL with updated references
        const notebookBlob = new Blob([updatedNotebookCode], {type: 'application/javascript'});
        urls.notebook = URL.createObjectURL(notebookBlob);
        
        return urls;
    }

    function createSelectiveInspector(container, visibleCells) {
        return function(name) {
            // Hide cells not in visible list
            if (visibleCells.length > 0 && !visibleCells.includes(name)) {
                return {
                    pending() {},
                    fulfilled() {},
                    rejected() {}
                };
            }
            
            // Create visible cell
            const div = document.createElement("div");
            div.className = `observable-cell observable-cell-${name || "unnamed"}`;
            div.style.cssText = "margin: 10px 0;";
            container.appendChild(div);
            
            return {
                pending() {
                    div.style.opacity = "0.7";
                },
                fulfilled(value, name) {
                    div.style.opacity = "1";
                    if (value instanceof Element) {
                        div.innerHTML = "";
                        div.appendChild(value);
                    } else if (value != null) {
                        div.innerHTML = "";
                        const inspector = new Inspector(div);
                        inspector.fulfilled(value, name);
                    }
                },
                rejected(error, name) {
                    console.error("Cell error:", error);
                    div.innerHTML = `<div style="color: red;">Error in ${name}: ${error.message}</div>`;
                }
            };
        };
    }

    function scheduleCleanup(moduleUrls, jsonBlobUrl, originalFileAttachment) {
        setTimeout(() => {
            if (jsonBlobUrl) URL.revokeObjectURL(jsonBlobUrl);
            URL.revokeObjectURL(moduleUrls.runtime);
            Object.values(moduleUrls.dependencies).forEach(url => URL.revokeObjectURL(url));
            URL.revokeObjectURL(moduleUrls.notebook);
            globalThis.FileAttachment = originalFileAttachment;
        }, 15000);
    }

    export default { render };
    """