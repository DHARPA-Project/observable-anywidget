import marimo

__generated_with = "0.9.30"
app = marimo.App()

@app.cell
def imports():
    import marimo as mo
    from simple_html_widget import SimpleHtmlWidget
    return SimpleHtmlWidget, mo

@app.cell
def create_simple_widget(SimpleHtmlWidget):
    widget = SimpleHtmlWidget(message="Testing AnyWidget in Marimo!")
    return widget,

@app.cell
def display_simple_widget(create_simple_widget):
    widget, = create_simple_widget
    widget

if __name__ == "__main__":
    app.run()