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
    mo.md(
        r"""
    ---
    ## Example 2

    https://observablehq.com/@jmiguelv/radical-translations-agents-network-visualisation
    """
    )
    return


@app.cell
def _():
    # Fake CSV-style data to match requirements of the visualization and illustrate reusability 
    sample_distributors_data = [
        {
            "id": "2001",
            "name": "Fresh Farms Co",
            "nationality": "USA", 
            "sex": "company",
            "date_of_birth": "1995-06-10",
            "height": "180",
            "weight": "50000",
            "sport": "distribution",
            "gold": "5",
            "silver": "2", 
            "bronze": "1",
            "info": "Specializing in organic apples and citrus fruits nationwide"
        },
        {
            "id": "2002", 
            "name": "Verde Gardens",
            "nationality": "ITA",
            "sex": "company", 
            "date_of_birth": "1988-03-22",
            "height": "150",
            "weight": "35000",
            "sport": "distribution",
            "gold": "3",
            "silver": "4",
            "bronze": "2", 
            "info": "Mediterranean vegetables and herbs distributor"
        },
        {
            "id": "2003",
            "name": "Harvest Direct", 
            "nationality": "CAN",
            "sex": "company",
            "date_of_birth": "1992-09-15", 
            "height": "200",
            "weight": "75000",
            "sport": "distribution",
            "gold": "2",
            "silver": "3",
            "bronze": "4",
            "info": "Root vegetables and seasonal produce specialist"
        }
    ]
    return (sample_distributors_data,)


@app.cell
def _():
    # Sample network data for produce categories and distributor connections
    sample_network_data = {
        "nodes": [
            # Produce category nodes
            {
                "id": "fruits",
                "title": "Fruits", 
                "group": "category",
                "url": "/database/distributors/?category__term=Fruits"
            },
            {
                "id": "vegetables",
                "title": "Vegetables",
                "group": "category", 
                "url": "/database/distributors/?category__term=Vegetables"
            },
            # Distributor nodes
            {
                "id": "dist_2001",
                "title": "Fresh Farms Co",
                "group": "distributor",
                "specialization": "organic_fruits",
                "nationality": "USA"
            },
            {
                "id": "dist_2002", 
                "title": "Verde Gardens",
                "group": "distributor",
                "specialization": "mediterranean_produce",
                "nationality": "ITA"
            },
            {
                "id": "dist_2003",
                "title": "Harvest Direct",
                "group": "distributor", 
                "specialization": "root_vegetables",
                "nationality": "CAN"
            }
        ],
        "edges": [
            # Produce specialization connections
            {"source": "dist_2001", "target": "fruits", "type": "primary", "strength": 1.0},
            {"source": "dist_2002", "target": "vegetables", "type": "primary", "strength": 1.0},
            {"source": "dist_2003", "target": "vegetables", "type": "primary", "strength": 1.0}
        ]
    }
    return (sample_network_data,)


@app.cell
def _(ObservableWidget, sample_distributors_data, sample_network_data):
    # Example 2: Testing with minimal cell selection to avoid Inspector error
    produce_widget = ObservableWidget(
        notebook_path="radical-translations-agents-network-visualisation",
        json_data={"network@26.json": sample_network_data}, # json data variable to replace
        tabular_data={"athletes.csv": sample_distributors_data}, #tabular data to replace
        visible_cells=["display","chart"]  # cells to display
    )
    return (produce_widget,)


@app.cell
def _(mo):
    mo.md(
        r"""
    As sample data is very small, set minimum connections to 1 to have content displayed, or use bigger dataset.

    As the sample data is much smaller and less complex than the original data, the options are not all available.

    Also, at the moment, the widget does not support bi-directionality (show labels when hovering over nodes) and data display, since the latter should be possible directly in Marimo for a given dataset.
    """
    )
    return


@app.cell
def _(produce_widget):
    # Display the network visualization
    produce_widget
    return


if __name__ == "__main__":
    app.run()
