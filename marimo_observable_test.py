import marimo

__generated_with = "0.14.15"
app = marimo.App(width="medium")

@app.cell
def _():
    import marimo as mo
    from observable_widget import ObservableWidget
    return ObservableWidget, mo

@app.cell
def _():
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
    widget = ObservableWidget(
        notebook_path="dynamic-network-graph",
        json_data={"treatiesBi@4.json": sample_data},
        visible_cells=["viewof time", "chart"]  # Only show time control and visualization
    )
    return (widget,)

@app.cell
def _(widget):
    widget
    return

@app.cell
def _():
    return

@app.cell
def _():
    return

@app.cell(hide_code=True)
def _(mo):
    mo.md(r""" """)
    return

if __name__ == "__main__":
    app.run()