import marimo

__generated_with = "0.14.15"
app = marimo.App(width="medium")


@app.cell
def _():
    import marimo as mo
    from observable_widget import ObservableWidget
    return ObservableWidget, mo


@app.cell(hide_code=True)
def _(mo):
    mo.md(r"""# Observable HQ - Marimo Integration Experiment""")
    return


@app.cell(hide_code=True)
def _(mo):
    mo.md(r"""## Example 1""")
    return


@app.cell
def _(mo):
    mo.md(r"""https://observablehq.com/@yaslena/dynamic-network-graph""")
    return


@app.cell
def _():
    # Sample fake data to illustrate reusability of the visualization
    sample_data = {
        "nodes": [
            {"id": "A", "start_date": 1450, "end_date": 1784, "bipartite": 0, "sides": "France"},
            {"id": "B", "start_date": 1460, "end_date": 1784, "bipartite": 1, "year": 1460},
            {"id": "C", "start_date": 1470, "end_date": 1784, "bipartite": 0, "sides": "England"},
            {"id": "D", "start_date": 1480, "end_date": 1784, "bipartite": 1, "year": 1480},
            {"id": "E", "start_date": 1490, "end_date": 1784, "bipartite": 0, "sides": "Spain"},
        ],
        "links": [
            {"source": "A", "target": "B", "start_date": 1460, "end_date": 1784},
            {"source": "B", "target": "C", "start_date": 1470, "end_date": 1784},
            {"source": "C", "target": "D", "start_date": 1480, "end_date": 1784},
            {"source": "D", "target": "E", "start_date": 1490, "end_date": 1784},
        ]
    }
    return (sample_data,)


@app.cell
def _(ObservableWidget, sample_data):
    # Example 1: Working approach with JSON data
    widget = ObservableWidget(
        notebook_path="dynamic-network-graph", # Name of observable project directory (from exported code)
        json_data={"treatiesBi@4.json": sample_data}, # Data source to replace
        visible_cells=["viewof time", "chart"]  # Cells to display
    )
    return (widget,)


@app.cell
def _(widget):
    widget
    return


if __name__ == "__main__":
    app.run()
