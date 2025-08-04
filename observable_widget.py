import anywidget
import traitlets
import pathlib

class ObservableWidget(anywidget.AnyWidget):
    notebook_path = traitlets.Unicode().tag(sync=True)
    json_data = traitlets.Dict(default_value={}).tag(sync=True)
    runtime_js = traitlets.Unicode().tag(sync=True)
    notebook_js = traitlets.Unicode().tag(sync=True)
    scrubber_js = traitlets.Unicode().tag(sync=True)
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
            
            with open(base_path / "runtime.js", 'r') as f:
                self.runtime_js = f.read()
            with open(base_path / "845501cdfbbf1a83@464.js", 'r') as f:
                self.notebook_js = f.read()
            with open(base_path / "450051d7f1174df8@254.js", 'r') as f:
                self.scrubber_js = f.read()
            
            print(f"ObservableHQ files loaded successfully")
            
        except Exception as e:
            print(f"Error loading files: {e}")
    
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
            
            // Create module URLs
            const moduleUrls = createModuleUrls(runtimeCode, notebookCode, scrubberCode);
            
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

    function createModuleUrls(runtimeCode, notebookCode, scrubberCode) {
        const runtimeBlob = new Blob([runtimeCode], {type: 'application/javascript'});
        const runtimeUrl = URL.createObjectURL(runtimeBlob);
        
        const scrubberBlob = new Blob([scrubberCode], {type: 'application/javascript'});
        const scrubberUrl = URL.createObjectURL(scrubberBlob);
        
        // Update scrubber reference in notebook code
        const updatedNotebookCode = notebookCode.replace('./450051d7f1174df8@254.js', scrubberUrl);
        const notebookBlob = new Blob([updatedNotebookCode], {type: 'application/javascript'});
        const notebookUrl = URL.createObjectURL(notebookBlob);
        
        return {
            runtime: runtimeUrl,
            notebook: notebookUrl,
            scrubber: scrubberUrl
        };
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
            URL.revokeObjectURL(moduleUrls.scrubber); 
            URL.revokeObjectURL(moduleUrls.notebook);
            globalThis.FileAttachment = originalFileAttachment;
        }, 15000);
    }

    export default { render };
    """