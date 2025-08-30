# ObservableHQ Marimo Integration Experiment

This experiment tests the integration of ObservableHQ exported code into Marimo projects to embed interactive ObservableHQ visualizations in your Marimo notebooks.

## Overview

The ObservableWidget loads ObservableHQ project files to embed visualizations in a Marimo project. The widget handles file discovery, dependency loading, and data injection.

## Project Structure

```
your-project/
├── example1.py                  # Marimo notebook
├── example2.py                  # Marimo notebook
├── observable_widget/              # Widget code
│   └── observable_widget.py
└── dynamic-network-graph/          # ObservableHQ project exported code
└── radical-translations-agents-network-visualisation/          # ObservableHQ project exported code

```

## Widget Parameters

### ObservableWidget

```python
widget = ObservableWidget(
    notebook_path="path-to-observable-project",
    json_data={"filename.json": your_data}, # variable containing data to inject to the visualization
    visible_cells=["cell1", "cell2"] # cells of the Observable notebook that need displaying
)
```

#### Parameters

- **notebook_path** (required): Path to the ObservableHQ project directory (exported code).
  - Should contain `index.js`, `runtime.js`, and the main notebook files.
  - Example: `"dynamic-network-graph"`

- **json_data** (optional): Dictionary mapping data filenames to your data.
  - Key: Original filename referenced in the ObservableHQ notebook.
  - Value: Your Python data structure (dict, list, etc.).
  - Example: `{"treatiesBi@4.json": sample_data}`

- **visible_cells** (optional): List of cell names to display.
  - Only the specified cells will be rendered.
  - Useful for showing only specific parts of the visualization.
  - Example: `["viewof time", "chart"]`

## Usage Example

```python
import marimo as mo
from observable_widget import ObservableWidget

# Your data
sample_data = {
    "nodes": [
        {"id": "A", "start_date": 1450, "end_date": 1784},
        {"id": "B", "start_date": 1460, "end_date": 1784}
    ],
    "edges": [
        {"source": "A", "target": "B", "start_date": 1460, "end_date": 1784}
    ]
}

# Create widget
widget = ObservableWidget(
    notebook_path="dynamic-network-graph",
    json_data={"treatiesBi@4.json": sample_data},
    visible_cells=["viewof time", "chart"]
)

# Display in Marimo

widget
```

## Adding New ObservableHQ Projects

1. Export your ObservableHQ notebook (Download tarball)
2. Extract the files to a new directory in your project
3. Use the directory name as the `notebook_path` parameter
4. Map your data to the expected filenames using `json_data`

## Example 1

This example includes a visualization created by Dr. Lena Jaskov: https://observablehq.com/@yaslena/dynamic-network-graph. The experiment uses fake data in the Marimo notebook to test the possibility to reuse the visualization with another dataset.


## Installation

1. Clone this repository
2. Install dependencies in your python environment: `pip install marimo anywidget`
3. Run the example: `marimo run example1.py` to open the notebook in "app mode" (without code) or 
`marimo edit example1.py` to show tge editor with UI controls

## Example 2

This example includes a visualization created by Miguel Vieira:
https://observablehq.com/@jmiguelv/radical-translations-agents-network-visualisation


## Installation

1. Clone this repository
2. Install dependencies in your python environment: `pip install marimo anywidget`
3. Run the example: `marimo run example2.py` to open the notebook in "app mode" (without code) or 
`marimo edit example2.py` to show tge editor with UI controls