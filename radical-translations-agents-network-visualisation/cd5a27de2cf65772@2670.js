import define1 from "./8dc540e05527b63f@14.js";
import define2 from "./f3d342db2d382751@886.js";

function _1(config,rtDescription,md){return(
md`# ${config.title} Network Visualisation
## Radical Translations

*Concept and notebook by Miguel Vieira*; 
*narrative by Rosa Musignat and Sanja Perovic*;
*review by Arianna Ciula*.

${rtDescription}`
)}

function _2(md){return(
md`The Agents Networks visualized here feed on both biographical and bibliographical information collected in the [database](https://radicaltranslations.org/database/) about translators, authors of source texts, publishers, periodicals, and organisations that they were associated with. In the RT database, the category ‘Agent’ includes Persons (authors, translators, publishers and other contributors) and Organisations (e.g. political clubs, societies, institutions). Publishers generally appear under Organisations unless they have personally authored Resources - in that case they are recorded as Persons. Only Persons that feature in our database in one of the categories above are included in the network. Otherwise important or famous figures are absent if they have not authored any source text or translation that we have been able to locate thus far. As a consequence, the Agents Networks are deliberately partial and skewed: they only link people and organizations who participated in the translation and circulation of radical texts. We are interested in exploring what a network of translation looks like, and how much it differs from or overlaps with more well-known networks such as the Republic of Letters or Freemasonry. 

In addition to Persons and Organisations, the Agents Network also includes nodes that represent serial publications and places. The emergence of a literary culture organized around serial publications as well as books and meetings has been recognized as key to late eighteenth-century radicalism in all three language areas (see, among others, Morton and Smith 2002 for the British context; De Felice 1962 on Italy; and Darnton and Roche 1989 on France). Visualizing data about contributors to journals and newspapers can thus help 
Place nodes represent places of publication and places where Agents are based. Person nodes in the Networks are colour-coded to indicate gender (female, male, or unknown).

The edges represent 8 different types of relationships:
* Based in (place)
* Edited (REMOVE?)
* Knows: linking two persons with any degrees of acquaintance (ranging from epistolary correspondence to kinship); this property does not specify the characteristic of the relation but groups of people that were very “close” in real life can typically be identified through the presence of many interconnecting “knows” links 
* Member of: links persons to organisations
* Published: links publishers to authors of source texts or translators
* Published in (place): links authors of source texts and translators to places
* Translated: links translators to authors of source texts

Results can also be filtered and parsed by target language (languages translated to) and by minimum number of connections (2 is the default value). “Knows” connections are always reciprocal so Agent A’s connection to Agent B is counted as 2 connections. 

The simple geometry of networks is inherently intuitive, but relies on abstraction. It reduces people and their complicated personal trajectories to nodes and edges in a way that might appear crudely simplistic, especially for humanities scholarship. Personalities and relationships that developed through time are fixed in a comprehensive “at one view”, accentuated by the fact that our current visualizations do not show progression over time. Thus, the visualizations are best perused in conjunction with the database and timelines available at radicaltranslations.org. When a node has been selected, a clickable link automatically appears to the corresponding Agent record on our database, which helps users navigate back from the one-dimensional patterns of the visualizations to the fuller accounts provided in the database entries. These are in turn the result of a process of abstraction, as we have transformed our objects of study into data points that can be entered into a database. 

It is important to note that what we have made available here is a carefully researched but inevitably incomplete record. As we learn more about our agents and add new entries, the network is likely to change shape. But even if they are not definitive, the visualizations have already become integral to our research, as we have been employing them in an iterative mode to verify hypotheses and alert us to potential gaps in the research, as well as to create new knowledge. The networks have brought into sharper focus the implications of our conceptualization of radicalism and the selection criteria. In cases when the data visualizations did not match the historical evidence, they have guided us to omissions, technical errors, inconsistencies, and even biases in the underlying data that we weren’t necessarily aware of. We take unclear or otherwise baffling results as an indication that our theorized historical explanation needs further articulation. In this sense, the networks are both “descriptive” and “argumentative”, that is they serve both to explore data as well as to communicate findings (Meirelles 2018).

---

[Part 2 - Resources Network Visualisation](https://observablehq.com/@jmiguelv/radical-translations-resources-network-visualisation?collection=@jmiguelv/radical-translations)`
)}

function _3(config,nodeGroups,linkLabels,md){return(
md`## ${config.title} network
The visualisation shows a network of &#150; *${nodeGroups.join(", ")}* &#150; nodes, and how they are connected to one another via the relationships *${linkLabels.join(", ")}*. The size of the nodes corresponds to the number of connections the node has.

To interact with the visualisation:
* Search nodes to show the nodes and connections that are related to the search term.
* Select relationships to show using the checkboxes.
* Hover over the nodes to show more information about the node.
* Click on a node to highlight/hide the selected node network.
* Double-click on a node to view more details about it in the [Radical Translations website](https://radicaltranslations.org).`
)}

function _4(md){return(
md`### Filter the visualisation`
)}

function _foundNodes(Inputs,data,nodesData,html,width){return(
Inputs.search(data.nodes, {
  datalist: nodesData,
  label: html`<b>Search nodes</b>`,
  placeholder: "Name, type, etc.",
  width: width / 2
})
)}

function _filters(html,$0,$1){return(
html`${[$0, $1]}`
)}

function _display(html,$0,$1,$2,$3,$4){return(
html`<h4>Display options</h4>${[
  $0,
  $1,
  $2,
  $3,
  $4
]}`
)}

function _8(config,$0,relationships,translatedTo,results,numberOfConnections,md){return(
md`### Visualising ${config.title.toLowerCase()}${$0.input.value ? `, with *${$0.input.value}* in the content` : ""}${relationships.length > 0 ? `, with *${relationships.join(", ")}* relationships` : ", with any relationship"}${translatedTo.length > 0 ? `, that translated to *${translatedTo.join(", ")}*` : ""}
*${results.nodes.length === 0 ? "No results. Try reducing the minimum number of connections and/or changing the filters." : `${results.nodes.length} nodes with a minimum of ${numberOfConnections} connections and ${results.links.length} links`}*`
)}

function _9(showData,html,$0,nodeGroups,nodeColor,linkLabels,strokeWidth,linkColor,getSelectedNodeInfo,htl){return(
htl.html`<div class="oi-f09d35">
  ${showData ? html`<h3>Data</h3><i>Select an item to higlight the selected item network</i>${$0 ? $0 : ""}` : ""}
  <p>
    <label><b>Node key</b></label>
    ${nodeGroups.map((n) => html`<span class="node-key" style="background: ${nodeColor(n)}"></span>
    <span>${n}</span>`)}
  </p>
  <p>
    <label><b>Link key</b></label>
    ${linkLabels.map((l) => html`<span class="link-key" style="border-bottom: ${strokeWidth}px solid ${linkColor(l)}">${l}</span> `)}
  </p>
  <p>
    <label><b>Selected node</b></label>
    <span>${getSelectedNodeInfo() ? html`<em>${getSelectedNodeInfo()}</em>` : html`<i>Click on a node to highlight/hide the selected node network</i>`}</span>
  </p>
</div>`
)}

function _chart(results,d3,linkDistance,width,height,zoomLevel,linkColor,strokeWidth,nodeStroke,nodeFill,drag,$0,baseUrl,invalidation)
{
  const links = results.links.map((d) => Object.create(d));

  const linksByIndex = {};
  links.forEach((l) => (linksByIndex[`${l.source},${l.target}`] = true));

  const areConnected = (a, b) =>
    a === b ||
    linksByIndex[`${a.id},${b.id}`] ||
    linksByIndex[`${b.id},${a.id}`];

  const nodes = results.nodes.map((d) => Object.create(d));

  const simulation = d3
    .forceSimulation(nodes)
    .force("charge", d3.forceManyBody())
    .force(
      "collision",
      d3.forceCollide().radius((d) => d.radius)
    )
    .force(
      "link",
      d3
        .forceLink(links)
        .id((d) => d.id)
        .distance(linkDistance)
    )
    .force("x", d3.forceX())
    .force("y", d3.forceY());

  const left = -width / 2;
  const top = -height / 2;

  const svg = d3.create("svg").attr("viewBox", [left, top, width, height]);

  svg
    .append("svg:defs")
    .selectAll("marker")
    .data(["arrow"])
    .enter()
    .append("svg:marker")
    .attr("id", String)
    .attr("viewBox", "0 0 10 10")
    .attr("refX", 25)
    .attr("refY", 5)
    .attr("markerWidth", 3)
    .attr("markerHeight", 3)
    .attr("orient", "auto")
    .append("svg:path")
    .attr("d", "M 0 0 L 10 5 L 0 10 z");

  const root = svg.append("g").attr("id", "root");
  const transform = d3.zoomIdentity.translate(0, 0).scale(zoomLevel);
  root.attr("transform", transform);

  const linkOpacity = 0.75;
  const link = root
    .append("g")
    .attr("opacity", linkOpacity)
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("stroke", (d) => linkColor(d.label))
    .attr("stroke-width", strokeWidth)
    .attr("marker-end", "url(#arrow)");

  const node = root
    .append("g")
    .attr("stroke-width", strokeWidth)
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("id", (d) => d.id)
    .attr("class", (d) => (d.url !== undefined ? "has-link" : "no-link"))
    .attr("r", (d) => Math.sqrt(d.connections + 25))
    .attr("stroke", (d) => nodeStroke(d.group))
    .attr("fill", (d) => nodeFill(d.group))
    .call(drag(simulation));

  const tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("visibility", "hidden");

  const hideTooltip = () => tooltip.style("visibility", "hidden");
  const showTooltip = (node) =>
    tooltip
      .style("visibility", "visible")
      .html(
        `${node.id}: ${node.group}<br>${node.title}<br>${node.connections} connections`
      );

  let focusedNode = null;
  const transitionTimeout = 125;

  const handleNodeClick = (d) => {
    showTooltip(d);

    if (d === focusedNode) {
      $0.value = focusedNode = null;

      hideTooltip();

      link
        .transition(transitionTimeout)
        .style("opacity", linkOpacity)
        .transition(transitionTimeout)
        .attr("marker-end", "url(#arrow)");
      node.transition(transitionTimeout).style("opacity", 1);
    } else {
      $0.value = focusedNode = d;

      link
        .transition(transitionTimeout)
        .style("opacity", (l) =>
          l.source.id === d.id || l.target.id === d.id ? 1.0 : 0.1
        )
        .transition(transitionTimeout)
        .attr("marker-end", (l) =>
          l.source.id === d.id || l.target.id === d.id ? "url(#arrow)" : "url()"
        );
      node
        .transition(transitionTimeout)
        .style("opacity", (n) => (areConnected(n, d) ? 1.0 : 0.25));
    }
  };

  node
    .on("mousemove pointermove", (e) =>
      tooltip
        .style("top", `${e.clientY - 10}px`)
        .style("left", `${e.clientX + 10}px`)
    )
    .on("mouseenter pointerenter", (e, d) => {
      showTooltip(d);
    })
    .on("mouseout pointerout", () => {
      hideTooltip();
    })
    .on("dblclick", (e, d) => {
      if (d.url !== undefined) {
        window.open(`${baseUrl}${d.url}`, "agent:detail");
      }

      $0.value = focusedNode = null;
      handleNodeClick(d);
    })
    .on("click", (e, d) => {
      handleNodeClick(d);
    });

  simulation.on("tick", () => {
    link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);

    node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
  });

  invalidation.then(() => simulation.stop());

  return svg.node();
}


function _11(md){return(
md`## Networks
The individual network descriptions below provide more information and interpretation about the individual relationships between the agents.`
)}

function _12(mdNetwork,mdNetworkLink,md){return(
md`### The _knows_ network
As mentioned above, the _knows_ relation is a blunt but effective tool insofar as it allows patterns to emerge from the data rather than relay back more analytical descriptions that we have entered ourselves. 

${mdNetwork("knows", "Filtering the network for knows relationship")} creates two distinct clusters, as shown in Fig. 1: on the centre-right, a larger one with a high density of _knows_ edges and prominent person nodes, and a smaller, looser one to the left of the image, which has a narrow connection to the rest of the graph. The bigger cluster is made up mainly of French and British agents, organized around major nodes representing ${mdNetworkLink("agent-1186", "Thomas Paine")} (110 connections), ${mdNetworkLink("agent-1261", "Brissot")} (68), Condorcet (64), Jefferson and Franklin (66 and 56 respectively) and Mirabeau (62). Paine is by far the most connected agent and his personal network spans Britain, France, and the United States. Jefferson’s and Franklin’s nodes are almost conjoined, indicating that their networks look virtually the same. As Paine, they too act as bridges between France and the Atlantic world. Both Brissot and Mirabeau are revolutionary leaders with extensive connections within France as well as across the Channel. The high level of interconnection between nodes in this area of the network, combined with the prevalence of large nodes (20+ connections), suggests that French and English-speaking agents involved in translation form a relatively high-profile and well connected group. [talk about the Girondins]   

By contrast, Italian agents feature form a largely separate group that is not as closely integrated within itself and is linked to the rest of the network through four main nodes: Vittorio Alfieri, Philippe Buonarroti, Marc-Antoine Jullien, and Francesco Saverio Salfi. The Abbé Grégoire, Domenico Forges Davanzati and Elisabetta Caminer have smaller personal networks that also bridge the two clusters. There are fewer prominent nodes in part of the graph (the largest one is Salfi with 40 connections, followed by the poet Ugo Foscolo with 36). There are several ways of interpreting this in the light of existing historiographical and biographical knowledge. First of all, users might be surprised to see this picture of Italian isolation, given the interventionist role of France in the peninsula under the Directory and later Napoleon, and in general French cultural influence throughout the eighteenth century (Hazard 1910, Brincat 1971). In our effort to locate radicalism as a cultural phenomenon, we have privileged translators working on their own initiative to further their own political aims, sometimes in conflict with French policies. Thus, we have given limited space to the avalanche of government-sponsored translations of edicts, laws, speeches etc. produced during the French occupation, including only those we associate with a radical libertarian purpose. For example, the republican Abbé Grégoire is present on account of his writings on the emancipation of the Jews and ecclesiastical reform - his influence on Italian radicals documented by links with 3 of them. Marc-Antoine Jullien is another French agent active in Northern Italy who was an ally of the Italian patriots and opposed Napoleon’s imperialistic plans. Generals of the Armeé d’Italie, French commissaries, and other functionaries, although politically important, are not included here as we don’t consider them radical. Among the other nodes connecting the two areas of the network, Buonarroti and Salfi are prominent Italian revolutionaries and conspirators who conceived of their political practice in international terms, took part in revolutionary activity across Italy and Europe, and lived long periods of their lives as exiles in France. Forges Davanzati was involved in the 1799 Neapolitan Revolution and went into exile in Paris. Most of Alfieri’s works were published before 1789 but he was an important reference for revolutionary theatre both in Italy and France, where he lived until the Terror. Further transnational links are provided by the Venetian Elisabetta Caminer, prolific translator and theatre director. There are no direct links connecting Italian and British agents. Our cut-off point of 1815 excludes the experiences of the many Italian radicals (including Foscolo himself) who went to England as political exiles after Waterloo, forging many personal and professional connections there (Isabella 2009). The network captures the state of play in the revolutionary and Napoleonic period only, and shows that radical culture travelled predominantly via France. 

Outside the 2 main clusters several disjointed components are visible. The four-cornered one on the top left is particularly interesting as it shows a tight unit of Genoese radicals who are only connected to themselves, representing the short-lived revolutionary republic there as a local experience with limited impact outside Liguria, whose members however participated in the translation and circulation of texts (in this case from the radical Enlightenment). 

One of the attractive features of networks is that they provide a multidirectional, non-hierarchical, non-genealogical model of knowledge. This was important to us as our project works specifically against the notion of revolutionary culture emanating from a single core and being received by the periphery. The democratising effect of the network view appeared to fit well with our idea of radical translators bridging communities and geographies and of radical culture as a collective effort “from below”, flowing in many directions and taking many forms. Even if they appear to flatten hierarchies, however, networks encode power along different lines. Centrality and connectivity (expressed by the size of nodes and density of edges) expresses influence and power. Marginal, less connected nodes suggest peripherality - as discussed above with regards to the Italian agents. So the core/periphery hierarchy is reinscribed in the topology of the graph. But the question we have to ask ourselves is what the relative positions of nodes mean within our particular network of radical translations. The centre of the diagram is occupied by moderate, well-connected individuals. Is it in the nature of radicals to be isolated and at the fringe? If so, we should read the network against the grain, paying more attention to the margins. What value should we assign to quantitative considerations around the volume of connections and of the flow of information across the network, given that we are investigating a qualitative phenomenon with high contextual variability? In other words, is radicalism necessarily a minority pursuit whose impact is best captured on a local, rather than transnational level? The weight of a radical intervention might be incommensurate to the number of agents it is connected to. Considering the secrecy and constraints under which radical groups operated, especially in Italy and Britain, it makes sense that they should appear as decentralized, distributed communities with few connections to cultural hubs and centres of political power. 
`
)}

function _13(md){return(
md`## Code`
)}

function _14(md){return(
md`### Filter data
Data after searches, filters and display options are applied.`
)}

function _results(filteredData,numberOfConnections)
{
  let nodes = filteredData.nodes
    .map((n) => {
      return {
        ...n,
        connections: filteredData.links.filter(
          (l) => l.source === n.id || l.target === n.id
        ).length
      };
    })
    .filter((n) => n.connections >= numberOfConnections);

  const links = filteredData.links.filter(
    (l) =>
      nodes.some((n) => n.id === l.source) &&
      nodes.some((n) => n.id === l.target)
  );

  nodes = nodes
    .map((n) => {
      return {
        ...n,
        connections: links.filter((l) => l.source === n.id || l.target === n.id)
          .length
      };
    })
    .filter((d) => d.connections > 0);

  return { nodes: nodes, links: links };
}


function _16(md){return(
md`Data after search and filters are applied.`
)}

function _filteredData(foundData,relationships,translatedTo)
{
  const links = foundData.links
    .filter(
      (l) => relationships.length === 0 || relationships.includes(l.label)
    )
    .filter(
      (l) =>
        translatedTo.length === 0 ||
        l.meta.some((m) => translatedTo.includes(m))
    );

  const nodes = foundData.nodes.filter((n) =>
    links.some((l) => l.source === n.id || l.target === n.id)
  );

  return { nodes: nodes, links: links };
}


function _18(md){return(
md`Data after text search is done.`
)}

function _foundData(foundNodes,data)
{
  // let links = data.links.filter(
  //   (l) =>
  //     foundNodes.some((n) => n.id === l.source) &&
  //     foundNodes.some((n) => n.id === l.target)
  // );

  // const nodeIds = links.flatMap((l) =>
  //   l.source === l.target ? l.source : [l.source, l.target]
  // );

  // links = links.filter(
  //   (l) =>
  //     nodeIds.filter((n) => n === l.source || n === l.target).length >=
  //     numberOfConnections
  // );

  return {
    nodes: foundNodes,
    links: data.links.filter(
      (l) =>
        foundNodes.some((n) => n.id === l.source) &&
        foundNodes.some((n) => n.id === l.target)
    )
  };
}


function _mdNetwork(htl,updateInput,$0){return(
(relationship, title) =>
  htl.html`<a href="#chart" onclick=${updateInput($0, [
    relationship
  ])}>${title}</a>`
)}

function _updateInput(Event){return(
(input, value) => {
  input.value = value;
  input.dispatchEvent(new Event("input"));
}
)}

function _mdNetworkLink(htl,toggleNode){return(
(id, title) =>
  htl.html`<a href="#chart" onclick=${() => toggleNode(id)}>${title}</a>`
)}

function _toggleNode(d3){return(
(id) => {
  d3.select(`#${id}`).dispatch("click");
}
)}

function _24(md){return(
md`### Link functions`
)}

function _linkColor(d3,linkLabels){return(
d3.scaleOrdinal().domain(linkLabels).range(d3.schemeCategory10)
)}

function _linkLabels(data){return(
data.links
  .reduce((a, c) => {
    if (!a.includes(c.label)) a.push(c.label);
    return a;
  }, [])
  .sort()
)}

function _27(md){return(
md`### Node functions`
)}

function _drag(d3){return(
(simulation) => {
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

  return d3
    .drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended);
}
)}

function _getSelectedNodeInfo(selectedNode,baseUrl){return(
() => {
  let info = null;

  if (selectedNode !== null) {
    info = `${selectedNode.group}: ${selectedNode.title}`;

    if (selectedNode.url !== undefined) {
      info = `<a href="${baseUrl}${selectedNode.url}" target="agent:detail">${info}</a>`;
    }
  }

  return info;
}
)}

function _selectedNode(){return(
null
)}

function _nodeStroke(isOutline,nodeColor){return(
(value) => (isOutline(value) ? nodeColor(value) : "#eee")
)}

function _nodeFill(isOutline,nodeColor){return(
(value) => (isOutline(value) ? "#fff" : nodeColor(value))
)}

function _isOutline(){return(
(value) => false
)}

function _nodeColor(d3,nodeGroups){return(
d3.scaleOrdinal().domain(nodeGroups).range(d3.schemeSet2)
)}

function _nodeGroups(data){return(
data.nodes
  .reduce((a, c) => {
    if (!a.includes(c.group)) a.push(c.group);
    return a;
  }, [])
  .sort((a, b) => {
    a = a.startsWith("person") ? `0${a}` : a.startsWith("org") ? `1${a}` : a;
    b = b.startsWith("person") ? `0${b}` : b.startsWith("org") ? `1${b}` : b;

    return a.localeCompare(b);
  })
)}

function _nodesData(data){return(
[
  ...new Set(
    data.nodes
      .map((n) => n.group.replaceAll(/[()]/g, ""))
      .concat(
        data.nodes.map((n) => n.title.replaceAll(/(\[.*?\]\s)|(\(.*?\))/g, ""))
      )
      .concat(
        data.nodes.flatMap((n) =>
          n.meta !== undefined
            ? n.meta
                .filter((r) => r)
                .map((r) => r.replaceAll(/(\[.*?\]\s)|(\(.*?\))/g, ""))
            : ""
        )
      )
      .sort()
  )
]
)}

function _languages(raw){return(
raw.nodes
  .filter((n) => n.group === "language" && n.title !== "German")
  .map((n) => n.title)
  .sort()
)}

function _38(md){return(
md`### Data table functions`
)}

function _handleTableClear(nodeSelection,tableSelectedNode,d3,$0)
{
  if (nodeSelection === null && tableSelectedNode !== null) {
    d3.select(`#${tableSelectedNode.id}`).dispatch("click");
    $0.value = null;
  }
}


function _handleTableSelection(nodeSelection,$0,d3)
{
  if (nodeSelection !== null) {
    $0.value = nodeSelection;
    d3.select(`#${nodeSelection.id}`).dispatch("click");
  }
}


function _tableSelectedNode(){return(
null
)}

function _42(config,md){return(
md`### Normalise the data
* Transform person ${config.title.toLowerCase()} with no gender into unknown gender.
* Flatten the meta information.
* Remove nodes with no links.
* Copy the meta information into the links for easier filtering.`
)}

function _data(raw)
{
  const nodes = raw.nodes
    .map((n) => {
      if (n.group === "person (None)") n.group = "person (u)";

      n.meta =
        n.meta !== undefined ? Object.values(n.meta).flatMap((m) => m) : [];

      return n;
    })
    .filter((n) =>
      raw.edges.some((e) => e.source === n.id || e.target == n.id)
    );

  const links = raw.edges.map((e) => {
    const nodes = raw.nodes.filter(
      (n) => n.id === e.source || n.id === e.target
    );

    e.meta = nodes.flatMap((n) => (n.meta !== undefined ? n.meta : []));

    return e;
  });

  return { nodes: nodes, links: links };
}


function _44(md){return(
md`### Load the data`
)}

function _raw(FileAttachment){return(
FileAttachment("network@26.json").json()
)}

function _config(){return(
{ title: "Agents", relationships: ["knows"], connections: 2 }
)}

function _baseUrl(){return(
"https://radicaltranslations.org"
)}

function _48(md){return(
md`### Filters and display options
The views are defined here so they can be grouped in a single form above. Because they are used above, they produce empty outputs in this section.`
)}

function _relationships(Inputs,linkLabels,html,strokeWidth,linkColor,config){return(
Inputs.checkbox(linkLabels, {
  label: html`<b>Relationships</b>`,
  format: (x) =>
    html`<span style="border-bottom: solid ${strokeWidth}px ${linkColor(
      x
    )}; margin-bottom: -2px;">${x}`,
  value: config.relationships
})
)}

function _translatedTo(Inputs,languages,html){return(
Inputs.checkbox(languages, {
  label: html`<b>Languages translated to</b>`
})
)}

function _height(){return(
window.outerHeight - 175
)}

function _numberOfConnections(Inputs,html,$0,relationships,translatedTo,config){return(
Inputs.range([0, 25], {
  label: html`<b>Minimum number of connections</b>`,
  step: 1,
  value:
    $0.input.value ||
    relationships.length > 0 ||
    translatedTo.length > 0
      ? config.connections
      : 10
})
)}

function _linkDistance(Inputs,html){return(
Inputs.range([10, 100], {
  label: html`<b>Link distance</b>`,
  step: 5,
  value: 30
})
)}

function _strokeWidth(Inputs,html){return(
Inputs.range([0.5, 2.5], {
  label: html`<b>Link width</b>`,
  step: 0.25,
  value: 1.5
})
)}

function _zoomLevel(Inputs,html,results){return(
Inputs.range([0.25, 2], {
  label: html`<b>Zoom</b>`,
  step: 0.25,
  value: results.nodes.length > 500 ? 0.75 : 1
})
)}

function _showData(Inputs,html){return(
Inputs.toggle({ label: html`<b>Show data</b>` })
)}

function _nodeSelection(html,baseUrl,results,Inputs,d3)
{
  function link(item) {
    return html`<a href="${baseUrl}${item.url}" target="network:detail">${item.title}</a>`;
  }
  function sparkbar(max) {
    return (x) => html`<span class="sparkline"
      style="width: ${(100 * x) / max}%;">${x.toLocaleString("en")}`;
  }

  const data = results.nodes;

  return Inputs.table(data, {
    columns:
      data.length > 0 ? Object.keys(data[0]).filter((c) => c !== "url") : [],
    format: {
      title: (v, i, d) => link(d[i]),
      connections: sparkbar(d3.max(data, (d) => d.connections / 3))
    },
    multiple: false,
    rows: 5.5,
    sort: "title"
  });
}


function _58(md){return(
md`### Styles
CSS styles.`
)}

function _styles(html){return(
html`
  <style>
  .sparkline {
    background: lightgray;
    box-sizing: border-box;
    color: steelblue;
    float: right;
    padding-right: 2px;
  }
  .node-key {
    border-radius: 50%;
    display: inline-block;
    height: 15px;
    width: 15px; 
    margin-left: 10px;
  }
  .link-key {
    margin-left: 10px;
  }
  .has-link {
    cursor: pointer;
  }
  .tooltip {
    background: rgba(6, 6, 6, .6);
    border-radius: .4rem;
    color: #fff;
    display: block;
    font-family: sans-serif;
    font-size: .8rem;
    max-width: 400px;
    padding: .4rem;
    position: absolute;
    text-overflow: ellipsis;
    z-index: 300;
  }
</style>`
)}

function _60(md){return(
md`### Imports`
)}

function _63(md){return(
md`## References
* [Disjoint force directed graph](https://observablehq.com/@d3/disjoint-force-directed-graph)
* [Basic tooltip](https://observablehq.com/@jianan-li/basic-tooltip)
* [Form inputs](https://observablehq.com/@observablehq/inputs)
* [Zoom transform](https://devdocs.io/d3~6/d3-zoom#zoomtransform)
* [Force layout](https://www.d3indepth.com/force-layout/)
* [Understanding the force layout](https://medium.com/@sxywu/understanding-the-force-ef1237017d5)
* [Multitouch events](https://observablehq.com/@d3/multitouch)
* https://observablehq.com/@ravengao/force-directed-graph-with-cola-grouping
* https://observablehq.com/@vk2425/game-of-thrones-relationship-graph`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["network@26.json", {url: new URL("./files/cf87b446671ce05a74cd55bd0bc2ca0f6462623cb611160bb67e5dcbc8b9716c99f87c60e5fee04e3c127e88ff6b44128a844630d85b1bd0429860b2fc93702d.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["config","rtDescription","md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["config","nodeGroups","linkLabels","md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("viewof foundNodes")).define("viewof foundNodes", ["Inputs","data","nodesData","html","width"], _foundNodes);
  main.variable(observer("foundNodes")).define("foundNodes", ["Generators", "viewof foundNodes"], (G, _) => G.input(_));
  main.variable(observer("filters")).define("filters", ["html","viewof relationships","viewof translatedTo"], _filters);
  main.variable(observer("display")).define("display", ["html","viewof numberOfConnections","viewof linkDistance","viewof strokeWidth","viewof zoomLevel","viewof showData"], _display);
  main.variable(observer()).define(["config","viewof foundNodes","relationships","translatedTo","results","numberOfConnections","md"], _8);
  main.variable(observer()).define(["showData","html","viewof nodeSelection","nodeGroups","nodeColor","linkLabels","strokeWidth","linkColor","getSelectedNodeInfo","htl"], _9);
  main.variable(observer("chart")).define("chart", ["results","d3","linkDistance","width","height","zoomLevel","linkColor","strokeWidth","nodeStroke","nodeFill","drag","mutable selectedNode","baseUrl","invalidation"], _chart);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["mdNetwork","mdNetworkLink","md"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("results")).define("results", ["filteredData","numberOfConnections"], _results);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("filteredData")).define("filteredData", ["foundData","relationships","translatedTo"], _filteredData);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer("foundData")).define("foundData", ["foundNodes","data"], _foundData);
  main.variable(observer("mdNetwork")).define("mdNetwork", ["htl","updateInput","viewof relationships"], _mdNetwork);
  main.variable(observer("updateInput")).define("updateInput", ["Event"], _updateInput);
  main.variable(observer("mdNetworkLink")).define("mdNetworkLink", ["htl","toggleNode"], _mdNetworkLink);
  main.variable(observer("toggleNode")).define("toggleNode", ["d3"], _toggleNode);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer("linkColor")).define("linkColor", ["d3","linkLabels"], _linkColor);
  main.variable(observer("linkLabels")).define("linkLabels", ["data"], _linkLabels);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer("drag")).define("drag", ["d3"], _drag);
  main.variable(observer("getSelectedNodeInfo")).define("getSelectedNodeInfo", ["selectedNode","baseUrl"], _getSelectedNodeInfo);
  main.define("initial selectedNode", _selectedNode);
  main.variable(observer("mutable selectedNode")).define("mutable selectedNode", ["Mutable", "initial selectedNode"], (M, _) => new M(_));
  main.variable(observer("selectedNode")).define("selectedNode", ["mutable selectedNode"], _ => _.generator);
  main.variable(observer("nodeStroke")).define("nodeStroke", ["isOutline","nodeColor"], _nodeStroke);
  main.variable(observer("nodeFill")).define("nodeFill", ["isOutline","nodeColor"], _nodeFill);
  main.variable(observer("isOutline")).define("isOutline", _isOutline);
  main.variable(observer("nodeColor")).define("nodeColor", ["d3","nodeGroups"], _nodeColor);
  main.variable(observer("nodeGroups")).define("nodeGroups", ["data"], _nodeGroups);
  main.variable(observer("nodesData")).define("nodesData", ["data"], _nodesData);
  main.variable(observer("languages")).define("languages", ["raw"], _languages);
  main.variable(observer()).define(["md"], _38);
  main.variable(observer("handleTableClear")).define("handleTableClear", ["nodeSelection","tableSelectedNode","d3","mutable tableSelectedNode"], _handleTableClear);
  main.variable(observer("handleTableSelection")).define("handleTableSelection", ["nodeSelection","mutable tableSelectedNode","d3"], _handleTableSelection);
  main.define("initial tableSelectedNode", _tableSelectedNode);
  main.variable(observer("mutable tableSelectedNode")).define("mutable tableSelectedNode", ["Mutable", "initial tableSelectedNode"], (M, _) => new M(_));
  main.variable(observer("tableSelectedNode")).define("tableSelectedNode", ["mutable tableSelectedNode"], _ => _.generator);
  main.variable(observer()).define(["config","md"], _42);
  main.variable(observer("data")).define("data", ["raw"], _data);
  main.variable(observer()).define(["md"], _44);
  main.variable(observer("raw")).define("raw", ["FileAttachment"], _raw);
  main.variable(observer("config")).define("config", _config);
  main.variable(observer("baseUrl")).define("baseUrl", _baseUrl);
  main.variable(observer()).define(["md"], _48);
  main.variable(observer("viewof relationships")).define("viewof relationships", ["Inputs","linkLabels","html","strokeWidth","linkColor","config"], _relationships);
  main.variable(observer("relationships")).define("relationships", ["Generators", "viewof relationships"], (G, _) => G.input(_));
  main.variable(observer("viewof translatedTo")).define("viewof translatedTo", ["Inputs","languages","html"], _translatedTo);
  main.variable(observer("translatedTo")).define("translatedTo", ["Generators", "viewof translatedTo"], (G, _) => G.input(_));
  main.variable(observer("height")).define("height", _height);
  main.variable(observer("viewof numberOfConnections")).define("viewof numberOfConnections", ["Inputs","html","viewof foundNodes","relationships","translatedTo","config"], _numberOfConnections);
  main.variable(observer("numberOfConnections")).define("numberOfConnections", ["Generators", "viewof numberOfConnections"], (G, _) => G.input(_));
  main.variable(observer("viewof linkDistance")).define("viewof linkDistance", ["Inputs","html"], _linkDistance);
  main.variable(observer("linkDistance")).define("linkDistance", ["Generators", "viewof linkDistance"], (G, _) => G.input(_));
  main.variable(observer("viewof strokeWidth")).define("viewof strokeWidth", ["Inputs","html"], _strokeWidth);
  main.variable(observer("strokeWidth")).define("strokeWidth", ["Generators", "viewof strokeWidth"], (G, _) => G.input(_));
  main.variable(observer("viewof zoomLevel")).define("viewof zoomLevel", ["Inputs","html","results"], _zoomLevel);
  main.variable(observer("zoomLevel")).define("zoomLevel", ["Generators", "viewof zoomLevel"], (G, _) => G.input(_));
  main.variable(observer("viewof showData")).define("viewof showData", ["Inputs","html"], _showData);
  main.variable(observer("showData")).define("showData", ["Generators", "viewof showData"], (G, _) => G.input(_));
  main.variable(observer("viewof nodeSelection")).define("viewof nodeSelection", ["html","baseUrl","results","Inputs","d3"], _nodeSelection);
  main.variable(observer("nodeSelection")).define("nodeSelection", ["Generators", "viewof nodeSelection"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _58);
  main.variable(observer("styles")).define("styles", ["html"], _styles);
  main.variable(observer()).define(["md"], _60);
  const child1 = runtime.module(define1);
  main.import("rtDescription", child1);
  const child2 = runtime.module(define2);
  main.import("d3", child2);
  main.variable(observer()).define(["md"], _63);
  return main;
}
