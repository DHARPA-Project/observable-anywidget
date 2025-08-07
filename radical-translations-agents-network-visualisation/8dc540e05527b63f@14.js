function _1(md){return(
md`# Radical Translations`
)}

function _rtDescription(md){return(
md`The [Radical Translations (RT)](https://radicaltranslations.org/) project seeks to capture the meaning of radical ideas, language and politics by looking at how, when, and why they were translated. We approach these questions from two angles: by looking at the transmission of texts through the instruments of bibliography and comparative literary history; and by using prosopographical methods to shed light on often little-known figures of translators, their life and work. Biographical information and personal histories shed light on questions such as why certain texts were selected for translation and what strategies were chosen. Moreover, personal details and connections often explain the degree of a translator’s influence (or lack thereof). At the moment, 236 out of 509 translators in our database are anonymous. Mapping the social and intellectual circles in which translators operated is a way to reconstruct the context of their radical activities, and even aid identification in cases of anonymity and when information is scarce. The translator’s invisibility has become proverbial (Venuti 1995). We hope these visualisations and the database on which they are based will lure some of our lesser-known radical translators out of the shadows. More in general, they will aid us in writing a social history of radical translations`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("rtDescription")).define("rtDescription", ["md"], _rtDescription);
  return main;
}
