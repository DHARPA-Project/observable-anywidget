import marimo

__generated_with = "0.15.2"
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
    # Sample tabular data for people (matching the CSV format expected)
    sample_people_data = [
        {
            "id": "alice",
            "name": "Alice Chen",
            "nationality": "USA", 
            "sex": "female",
            "date_of_birth": "1980-01-15",
            "height": "165",
            "weight": "60",
            "sport": "researcher",
            "gold": "3",
            "silver": "2", 
            "bronze": "1",
            "info": "AI researcher specializing in machine learning and neural networks"
        },
        {
            "id": "bob", 
            "name": "Bob Smith",
            "nationality": "USA",
            "sex": "male", 
            "date_of_birth": "1975-06-22",
            "height": "180",
            "weight": "75",
            "sport": "researcher",
            "gold": "2",
            "silver": "4",
            "bronze": "3", 
            "info": "Computer science professor focused on distributed systems"
        },
        {
            "id": "carol",
            "name": "Carol Jones", 
            "nationality": "USA",
            "sex": "female",
            "date_of_birth": "1982-03-10", 
            "height": "170",
            "weight": "65",
            "sport": "engineer",
            "gold": "4",
            "silver": "1",
            "bronze": "2",
            "info": "Software engineer with expertise in cloud computing"
        },
        {
            "id": "david",
            "name": "David Lee",
            "nationality": "USA",
            "sex": "male",
            "date_of_birth": "1978-11-30",
            "height": "175",
            "weight": "70",
            "sport": "researcher",
            "gold": "1",
            "silver": "3",
            "bronze": "4",
            "info": "Research scientist in computational biology"
        },
        {
            "id": "eve",
            "name": "Eve Wilson",
            "nationality": "USA",
            "sex": "female",
            "date_of_birth": "1985-07-18",
            "height": "168",
            "weight": "62",
            "sport": "engineer",
            "gold": "2",
            "silver": "2",
            "bronze": "2",
            "info": "Data scientist working on predictive analytics"
        },
        {
            "id": "frank",
            "name": "Frank Brown",
            "nationality": "USA",
            "sex": "male",
            "date_of_birth": "1990-04-25",
            "height": "182",
            "weight": "78",
            "sport": "engineer",
            "gold": "1",
            "silver": "1",
            "bronze": "3",
            "info": "Junior software developer focused on web technologies"
        }
    ]
    return (sample_people_data,)


@app.cell
def _():
    # Multi-type network data with corrected format for Observable notebook
    sample_network_data = {
        "nodes": [
            # People nodes with gender indicators
            {"id": "alice", "title": "Alice Chen", "group": "person (f)", "start_date": 1980, "end_date": 2024},
            {"id": "bob", "title": "Bob Smith", "group": "person (m)", "start_date": 1975, "end_date": 2024},
            {"id": "carol", "title": "Carol Jones", "group": "person (f)", "start_date": 1982, "end_date": 2024},
            {"id": "david", "title": "David Lee", "group": "person (m)", "start_date": 1978, "end_date": 2024},
            {"id": "eve", "title": "Eve Wilson", "group": "person (f)", "start_date": 1985, "end_date": 2024},
            {"id": "frank", "title": "Frank Brown", "group": "person (m)", "start_date": 1990, "end_date": 2024},

            # Place nodes
            {"id": "nyc", "title": "New York City", "group": "place", "start_date": 1624, "end_date": 2024},
            {"id": "boston", "title": "Boston", "group": "place", "start_date": 1630, "end_date": 2024},
            {"id": "sf", "title": "San Francisco", "group": "place", "start_date": 1776, "end_date": 2024},

            # Organisation nodes
            {"id": "mit", "title": "MIT", "group": "organisation", "start_date": 1861, "end_date": 2024},
            {"id": "stanford", "title": "Stanford University", "group": "organisation", "start_date": 1885, "end_date": 2024},
            {"id": "google", "title": "Google", "group": "organisation", "start_date": 1998, "end_date": 2024}
        ],
        "edges": [
            # knows relationships (person-person)
            {"source": "alice", "target": "bob", "label": "knows", "meta": []},
            {"source": "alice", "target": "carol", "label": "knows", "meta": []},
            {"source": "bob", "target": "david", "label": "knows", "meta": []},
            {"source": "carol", "target": "eve", "label": "knows", "meta": []},
            {"source": "david", "target": "frank", "label": "knows", "meta": []},
            {"source": "bob", "target": "carol", "label": "knows", "meta": []},
            {"source": "eve", "target": "frank", "label": "knows", "meta": []},

            # member of relationships (person-organisation)
            {"source": "alice", "target": "mit", "label": "member of", "meta": []},
            {"source": "alice", "target": "google", "label": "member of", "meta": []},
            {"source": "bob", "target": "mit", "label": "member of", "meta": []},
            {"source": "carol", "target": "stanford", "label": "member of", "meta": []},
            {"source": "carol", "target": "google", "label": "member of", "meta": []},
            {"source": "david", "target": "mit", "label": "member of", "meta": []},
            {"source": "eve", "target": "stanford", "label": "member of", "meta": []},
            {"source": "frank", "target": "google", "label": "member of", "meta": []},

            # based in relationships (person-place)
            {"source": "alice", "target": "nyc", "label": "based in", "meta": []},
            {"source": "alice", "target": "sf", "label": "based in", "meta": []},
            {"source": "bob", "target": "boston", "label": "based in", "meta": []},
            {"source": "bob", "target": "nyc", "label": "based in", "meta": []},
            {"source": "carol", "target": "sf", "label": "based in", "meta": []},
            {"source": "david", "target": "boston", "label": "based in", "meta": []},
            {"source": "eve", "target": "sf", "label": "based in", "meta": []},
            {"source": "frank", "target": "nyc", "label": "based in", "meta": []},

            # published in relationships (organisation-place)
            {"source": "mit", "target": "boston", "label": "published in", "meta": []},
            {"source": "stanford", "target": "sf", "label": "published in", "meta": []},
            {"source": "google", "target": "sf", "label": "published in", "meta": []}
        ]
    }
    return (sample_network_data,)


@app.cell
def _(mo):
    mo.md(
        r"""
    ## Multi-Type Network Visualization

    This visualization shows:
    - **Node Types**: 
      - People (with gender indicators: f/m)
      - Places (cities)
      - Organisations (universities and companies)
    - **Edge Types**: 
      - `knows` - social connections between people
      - `member of` - affiliation with organisations
      - `based in` - location relationships
      - `published in` - organisation to place relationships

    The visualization is configured with custom defaults via config_overrides.
    """
    )
    return


@app.cell
def _(ObservableWidget, sample_network_data, sample_people_data):
    # Create and display widget with matching relationships
    network_widget = ObservableWidget(
        notebook_path="radical-translations-agents-network-visualisation",
        json_data={"network@26.json": sample_network_data},
        tabular_data={"athletes.csv": sample_people_data},
        visible_cells=["chart"],  # Show both filters and chart
        config_overrides={
            "numberOfConnections": 1,  # Set to 1 for small dataset
            #"relationships": ["knows", "member of", "based in"], 
            "relationships": ["knows", "member of"],
            "linkDistance": 30,
            "strokeWidth": 1.5,
            "zoomLevel": 1,
            "showData": False
        }
    )
    network_widget  # Display the widget
    return


@app.cell
def _():
    return


if __name__ == "__main__":
    app.run()
