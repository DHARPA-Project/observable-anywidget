import define1 from "./450051d7f1174df8@254.js";

function _1(md){return(
md`# Dynamic Network Graph

This notebook is a technical exercise in creating a dynamic network graph with a small data sample. It uses [Temporal Force-Directed Graph](https://observablehq.com/@d3/temporal-force-directed-graph) from Bostock as a starter. In addition to the original, this graph has labels and colored nodes according to the node partition. Another difference is that nodes and edges don't disappear as in the original because the end-date is set to be the same date (1784) for all nodes and edges. As a result, nodes and edges simply accumulate over time.

The data for this graph comes from an online database focused on European peace treaties from 1450 to 1789 (https://www.ieg-friedensvertraege.de/vertraege). The data sample here only shows a selection of that data.

The scraping code can be found here: https://github.com/yaslena/WebScraping. Code for restructuring the table data and for generating a bipartite graph with python networkX can be found here: https://github.com/yaslena/NetworkAnalysis`
)}

function _text(md,time){return(
md`Network for the year of ${time}`
)}

function _time(Scrubber,times){return(
Scrubber(times, {
  autoplay: false,
  ///format: (d, i) => moment(d).format("YYYY"),
  format: date => date.toLocaleString("fr", {year: 'numeric'}),
  delay: 400
})
)}

function _chart(d3,width,height,invalidation,colorScale,drag)
{
  const simulation = d3.forceSimulation()
      .force("charge", d3.forceManyBody())
      .force("link", d3.forceLink().id(d => d.id))
      .force("x", d3.forceX())
      .force("y", d3.forceY())
      .on("tick", ticked);

  const svg = d3.create("svg")
      .attr("viewBox", [-width / 2, -height / 2, width +30, height -10 ]); // parameters: min-x, min-y, width and height

  let link = svg.append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
    .selectAll("line");

  let node = svg.append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
    .selectAll("circle");

  let text = svg.append("g")
  .selectAll("text");

  function ticked() {
    node.attr("cx", d => d.x)
        .attr("cy", d => d.y);

    link.attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    text
      .attr("x", d => d.x)
      .attr("y", d => d.y);
  }

  invalidation.then(() => simulation.stop());

  return Object.assign(svg.node(), {
    update({nodes, links}) {

      // Make a shallow copy to protect against mutation, while
      // recycling old nodes to preserve position and velocity.
      const old = new Map(node.data().map(d => [d.id, d]));
      nodes = nodes.map(d => Object.assign(old.get(d.id) || {}, d));
      links = links.map(d => Object.assign({}, d));

      node = node
        .data(nodes, d => d.id)
        .join(enter => enter.append("circle")
          .attr("r", 5)
          .attr("fill", function(d) { return colorScale(d.bipartite)}) // with dharpa dataset: can use gender, yields 2 colors or name, yields 10 colors
          .call(drag(simulation))
          .call(node => node.append("title").text(d => d.id)));

      text = text
      .data(nodes)
      .join("text") // "join" here is important, because otherwise the labels keep piling up
      // .enter()
      // .append('text')
      .attr('class', 'graph-node-labels')
      // .attr('label-id', d => d.label)
      .style("text-anchor", "middle")
      .style("pointer-events", "none")
      .attr('font-family', 'sans-serif')
      .attr('font-size', '5px')
      .attr('dx', 0)
      .attr('dy', +2)
      .text((d,i) => {
        return d.sides || d.year}) // "||" is a logical OR operator in JS. Options for label display: d.title || d.sides || d.year

      link = link
        .data(links, d => [d.source, d.target])
        .join("line");

      simulation.nodes(nodes);
      simulation.force("link").links(links);
      simulation.alpha(1).restart().tick();
      ticked(); // render now!
    }
  });
}


function _update(data,contains,time,chart)
{
  const nodes = data.nodes.filter(d => contains(d, time));
  const links = data.links.filter(d => contains(d, time));
  chart.update({nodes, links});
}


function _contains(){return(
({start_date, end_date}, time) => start_date <= time && time < end_date
)}

function _7(md){return(
md`# Data`
)}

function _Jsondata(FileAttachment){return(
FileAttachment("treatiesBi@4.json")
)}

async function _data(Jsondata){return(
(await Jsondata).json()
)}

function _10(md){return(
md`# Functions & Definitions`
)}

function _times(data){return(
[...new Set(Array.from(data.links, d  => d.start_date).sort((a, b) => a - b))]
)}

function _drag(d3){return(
simulation => {
  
  function dragstarted(event) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  }
  
  function dragged(event) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }
  
  function dragended(event) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
  }
  
  return d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
}
)}

function _colorScale(d3){return(
d3.scaleOrdinal(d3.schemeSet3)
)}

function _height(){return(
250
)}

function _width(){return(
400
)}

function _16(md){return(
md`# Libraries`
)}

function _d3(require){return(
require("d3@6")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["treatiesBi@4.json", {url: new URL("./files/c40c5841c359d8480043ec90ac055e06e3523ccecc931a4a6655e500d7f0faba0f29f1d148d463a47b672178a3cb07d906befb25781a3d5256a9c514f952ac43.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("text")).define("text", ["md","time"], _text);
  main.variable(observer("viewof time")).define("viewof time", ["Scrubber","times"], _time);
  main.variable(observer("time")).define("time", ["Generators", "viewof time"], (G, _) => G.input(_));
  main.variable(observer("chart")).define("chart", ["d3","width","height","invalidation","colorScale","drag"], _chart);
  main.variable(observer("update")).define("update", ["data","contains","time","chart"], _update);
  main.variable(observer("contains")).define("contains", _contains);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("Jsondata")).define("Jsondata", ["FileAttachment"], _Jsondata);
  main.variable(observer("data")).define("data", ["Jsondata"], _data);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("times")).define("times", ["data"], _times);
  main.variable(observer("drag")).define("drag", ["d3"], _drag);
  main.variable(observer("colorScale")).define("colorScale", ["d3"], _colorScale);
  main.variable(observer("height")).define("height", _height);
  main.variable(observer("width")).define("width", _width);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  const child1 = runtime.module(define1);
  main.import("Scrubber", child1);
  return main;
}
