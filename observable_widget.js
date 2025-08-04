// Dynamic import to handle path issues
let Runtime, Library, Inspector;

async function loadObservableRuntime() {
  try {
    console.log("📦 Attempting to load ObservableHQ runtime...");
    const runtimeModule = await import("./dynamic-network-graph/runtime.js");
    Runtime = runtimeModule.Runtime;
    Library = runtimeModule.Library;
    Inspector = runtimeModule.Inspector;
    console.log("✅ ObservableHQ runtime loaded successfully");
    return true;
  } catch (error) {
    console.error("❌ Failed to load ObservableHQ runtime:", error);
    return false;
  }
}

export default function render({ model, el }) {
  console.log("🚀 ObservableWidget render function called");
  console.log("Model data:", {
    notebook_path: model.get("notebook_path"),
    json_data: model.get("json_data")
  });

  // Create container for the ObservableHQ visualization
  const container = document.createElement("div");
  container.style.width = "100%";
  container.style.height = "500px";
  container.style.border = "1px solid #ccc";
  container.style.padding = "10px";
  container.innerHTML = "<div>🔄 Loading ObservableHQ notebook...</div>";
  el.appendChild(container);

  let runtime;
  let main;
  let fileAttachmentOverrides = {};

  // Initialize the widget
  async function initialize() {
    try {
      console.log("🔧 Starting initialization...");
      
      // Load ObservableHQ runtime first
      const runtimeLoaded = await loadObservableRuntime();
      if (!runtimeLoaded) {
        throw new Error("Failed to load ObservableHQ runtime");
      }
      
      // Set up file attachment overrides for JSON data injection
      setupFileAttachmentOverrides();
      
      // Create ObservableHQ runtime
      console.log("🏗️ Creating ObservableHQ runtime...");
      runtime = new Runtime();
      
      // Load the main notebook module
      const notebookPath = model.get("notebook_path");
      console.log(`📂 Loading notebook from: ${notebookPath}`);
      
      const defineModule = await import(`./${notebookPath}/index.js`);
      console.log("📋 Notebook module loaded");
      
      // Create custom inspector that renders into our container
      const inspector = createCustomInspector(container);
      
      // Run the notebook
      console.log("🎯 Running notebook...");
      main = runtime.module(defineModule.default, inspector);
      
      console.log("✅ ObservableHQ notebook loaded successfully");
      container.innerHTML = "<div>✅ Notebook loaded! Visualization should appear below...</div>";
      
    } catch (error) {
      console.error("❌ Error initializing ObservableHQ notebook:", error);
      container.innerHTML = `<div style="color: red; padding: 20px;">
        ❌ Error loading notebook: ${error.message}<br>
        <small>Check browser console for details</small><br>
        <small>Error: ${error.stack}</small>
      </div>`;
    }
  }

  function setupFileAttachmentOverrides() {
    // Override FileAttachment to inject our JSON data
    const originalFileAttachment = globalThis.FileAttachment;
    
    globalThis.FileAttachment = function(filename) {
      const jsonData = model.get("json_data");
      
      if (jsonData && jsonData.hasOwnProperty(filename)) {
        // Return a mock FileAttachment that provides our data
        return {
          json: () => Promise.resolve(jsonData[filename]),
          text: () => Promise.resolve(JSON.stringify(jsonData[filename])),
          url: () => Promise.resolve(`data:application/json,${encodeURIComponent(JSON.stringify(jsonData[filename]))}`),
          name: filename,
          mimeType: "application/json"
        };
      }
      
      // Fall back to original behavior if no override data
      if (originalFileAttachment) {
        return originalFileAttachment(filename);
      }
      
      // If no original FileAttachment, create a basic implementation
      return {
        json: () => fetch(`./${model.get("notebook_path")}/files/${filename}`).then(r => r.json()),
        text: () => fetch(`./${model.get("notebook_path")}/files/${filename}`).then(r => r.text()),
        url: () => Promise.resolve(`./${model.get("notebook_path")}/files/${filename}`),
        name: filename,
        mimeType: "application/json"
      };
    };
  }

  function createCustomInspector(container) {
    return function(name) {
      const div = document.createElement("div");
      div.className = `observable-cell observable-cell-${name || "unnamed"}`;
      container.appendChild(div);
      
      return {
        pending() {
          div.classList.add("loading");
        },
        fulfilled(value, name) {
          div.classList.remove("loading");
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
          div.classList.remove("loading");
          console.error("Cell error:", error);
          div.innerHTML = `<div style="color: red;">Error in ${name}: ${error.message}</div>`;
        }
      };
    };
  }

  // Handle model changes
  model.on("change:json_data", () => {
    console.log("JSON data updated");
    // Re-setup file attachments with new data
    setupFileAttachmentOverrides();
    // Could trigger re-evaluation here if needed
  });

  model.on("change:current_time", () => {
    const currentTime = model.get("current_time");
    if (currentTime !== null && main) {
      // Try to update the time variable in the ObservableHQ notebook
      try {
        const timeVariable = main._scope.get("time");
        if (timeVariable) {
          timeVariable._value = currentTime;
          // Trigger re-evaluation
          main._runtime._updates.add(timeVariable);
          main._runtime._compute();
        }
      } catch (error) {
        console.warn("Could not update time:", error);
      }
    }
  });

  model.on("change:is_playing", () => {
    const isPlaying = model.get("is_playing");
    console.log("Play state changed:", isPlaying);
    // Could control animation state here
  });

  // Cleanup function
  function cleanup() {
    if (runtime) {
      runtime.dispose();
    }
  }

  // Initialize the widget
  initialize();

  // Return cleanup function
  return cleanup;
}