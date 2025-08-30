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
    # Multi-type network data with people and places
    sample_network_data = {
        "nodes": [
            # People nodes
            {"id": "alice", "title": "Alice Chen", "group": "person", "start_date": 1980, "end_date": 2024},
            {"id": "bob", "title": "Bob Smith", "group": "person", "start_date": 1975, "end_date": 2024},
            {"id": "carol", "title": "Carol Jones", "group": "person", "start_date": 1982, "end_date": 2024},
            {"id": "david", "title": "David Lee", "group": "person", "start_date": 1978, "end_date": 2024},
            {"id": "eve", "title": "Eve Wilson", "group": "person", "start_date": 1985, "end_date": 2024},
            {"id": "frank", "title": "Frank Brown", "group": "person", "start_date": 1990, "end_date": 2024},
            
            # Place nodes
            {"id": "nyc", "title": "New York City", "group": "place", "start_date": 1624, "end_date": 2024},
            {"id": "boston", "title": "Boston", "group": "place", "start_date": 1630, "end_date": 2024},
            {"id": "sf", "title": "San Francisco", "group": "place", "start_date": 1776, "end_date": 2024},
            {"id": "mit", "title": "MIT", "group": "institution", "start_date": 1861, "end_date": 2024},
            {"id": "stanford", "title": "Stanford University", "group": "institution", "start_date": 1885, "end_date": 2024},
            {"id": "google", "title": "Google HQ", "group": "company", "start_date": 1998, "end_date": 2024}
        ],
        "edges": [
            # knows (person-person)
            {"source": "alice", "target": "bob", "type": "knows", "strength": 1.0, "start_date": 2005, "end_date": 2024},
            {"source": "alice", "target": "carol", "type": "knows", "strength": 1.0, "start_date": 2008, "end_date": 2024},
            {"source": "bob", "target": "david", "type": "knows", "strength": 1.0, "start_date": 2000, "end_date": 2024},
            {"source": "carol", "target": "eve", "type": "knows", "strength": 1.0, "start_date": 2010, "end_date": 2024},
            {"source": "david", "target": "frank", "type": "knows", "strength": 0.8, "start_date": 2015, "end_date": 2024},
            
            # collaborates_with (person-person)
            {"source": "alice", "target": "bob", "type": "collaborates", "strength": 1.0, "start_date": 2010, "end_date": 2018},
            {"source": "carol", "target": "eve", "type": "collaborates", "strength": 1.0, "start_date": 2015, "end_date": 2024},
            {"source": "david", "target": "bob", "type": "collaborates", "strength": 0.9, "start_date": 2012, "end_date": 2020},
            
            # co_publishes_with (person-person)
            {"source": "alice", "target": "carol", "type": "publishes", "strength": 0.8, "start_date": 2012, "end_date": 2016},
            {"source": "bob", "target": "david", "type": "publishes", "strength": 0.9, "start_date": 2014, "end_date": 2019},
            {"source": "eve", "target": "frank", "type": "publishes", "strength": 0.7, "start_date": 2018, "end_date": 2024},
            
            # lives_in (person-place)
            {"source": "alice", "target": "nyc", "type": "lives_in", "strength": 0.9, "start_date": 2005, "end_date": 2015},
            {"source": "alice", "target": "sf", "type": "lives_in", "strength": 1.0, "start_date": 2015, "end_date": 2024},
            {"source": "bob", "target": "boston", "type": "lives_in", "strength": 0.8, "start_date": 1975, "end_date": 2010},
            {"source": "bob", "target": "nyc", "type": "lives_in", "strength": 1.0, "start_date": 2010, "end_date": 2024},
            {"source": "carol", "target": "sf", "type": "lives_in", "strength": 1.0, "start_date": 2008, "end_date": 2024},
            {"source": "david", "target": "boston", "type": "lives_in", "strength": 1.0, "start_date": 2000, "end_date": 2024},
            {"source": "eve", "target": "sf", "type": "lives_in", "strength": 1.0, "start_date": 2010, "end_date": 2024},
            {"source": "frank", "target": "nyc", "type": "lives_in", "strength": 0.9, "start_date": 2015, "end_date": 2024},
            
            # works_at (person-place)
            {"source": "alice", "target": "mit", "type": "works_at", "strength": 1.0, "start_date": 2005, "end_date": 2015},
            {"source": "alice", "target": "google", "type": "works_at", "strength": 1.0, "start_date": 2015, "end_date": 2024},
            {"source": "bob", "target": "mit", "type": "works_at", "strength": 1.0, "start_date": 2000, "end_date": 2024},
            {"source": "carol", "target": "stanford", "type": "works_at", "strength": 0.9, "start_date": 2008, "end_date": 2018},
            {"source": "carol", "target": "google", "type": "works_at", "strength": 1.0, "start_date": 2018, "end_date": 2024},
            {"source": "david", "target": "mit", "type": "works_at", "strength": 1.0, "start_date": 2005, "end_date": 2024},
            {"source": "eve", "target": "stanford", "type": "works_at", "strength": 1.0, "start_date": 2010, "end_date": 2024},
            {"source": "frank", "target": "google", "type": "works_at", "strength": 0.8, "start_date": 2015, "end_date": 2024}
        ]
    }
    return (sample_network_data,)


@app.cell
def _(ObservableWidget, sample_network_data, sample_people_data):
    # Create widget with people-places network visualization
    network_widget = ObservableWidget(
        notebook_path="radical-translations-agents-network-visualisation",
        json_data={"network@26.json": sample_network_data}, # json data variable to replace
        tabular_data={"athletes.csv": sample_people_data}, #tabular data to replace
        visible_cells=["display","chart"]  # cells to display
    )
    return (network_widget,)


@app.cell
def _(mo):
    mo.md(
        r"""
    ## Multi-Type Network Visualization
    
    This visualization shows:
    - **Node Types**: People (researchers/engineers), Places (cities), Institutions (universities), and Companies
    - **Edge Types**: 
      - `knows` - social connections between people
      - `collaborates` - professional collaborations
      - `publishes` - co-authorship relationships
      - `lives_in` - residence relationships
      - `works_at` - employment relationships
        
    Note: Set minimum connections to 1 to see all nodes, as this is a small sample dataset.
    """
    )
    return


@app.cell
def _(network_widget):
    # Display the network visualization
    network_widget
    return


if __name__ == "__main__":
    app.run()