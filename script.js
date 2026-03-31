const pageHierarchy = {

data:["Home","Data"],
methodology:["Home","Methodology"],

evaluation:["Home","Evaluation"],
eval_methods:["Home","Evaluation","Methods"],
eval_results:["Home","Evaluation","Results"],
eval_temp:["Home","Evaluation","Results","Temperature"],
eval_prec:["Home","Evaluation","Results","Precipitation"],
eval_wind:["Home","Evaluation","Results","Wind Speed"],
eval_hum:["Home","Evaluation","Results","Relative Humidity"],
eval_rad:["Home","Evaluation","Results","Short-wave Radiation"],

downscaling:["Home","Downscaling"],
down_methods:["Home","Downscaling","Methods"],
down_results:["Home","Downscaling","Results"],
down_temp:["Home","Downscaling","Results","Temperature"],
down_prec:["Home","Downscaling","Results","Precipitation"],
down_wind:["Home","Downscaling","Results","Wind Speed"],
down_hum:["Home","Downscaling","Results","Relative Humidity"],
down_rad:["Home","Downscaling","Results","Short-wave Radiation"],

applications:["Home","Applications"],
seasonal:["Home","Applications","Seasonal Forecasting"],
seas_methods:["Home","Applications","Seasonal Forecasting", "Methods"],
seas_results:["Home","Applications","Seasonal Forecasting", "Results"],
seas_temp:["Home","Applications","Seasonal Forecasting", "Results", "Temperature"],
seas_prec:["Home","Applications","Seasonal Forecasting", "Results", "Precipitation"],
seas_wind:["Home","Applications","Seasonal Forecasting", "Results", "Wind Speed"],
seas_hum:["Home","Applications","Seasonal Forecasting", "Results", "Relative Humidity"],
seas_rad:["Home","Applications","Seasonal Forecasting", "Results", "Short-wave Radiation"],
reservoirs:["Home","Applications","Water Reservoirs"],
reserv_methods:["Home","Applications","Water Reservoirs", "Methods"],
reserv_results:["Home","Applications","Water Reservoirs", "Results"],
aquacrop:["Home","Applications","AquaCrop"],
aquacrop_methods:["Home","Applications","AquaCrop", "Methods"],
aquacrop_results:["Home","Applications","AquaCrop", "Results"]

};

let historyStack = [];

function showPage(pageName){

let pages=document.getElementsByClassName("page");

for(let i=0;i<pages.length;i++){
pages[i].style.display="none";
}

document.getElementById(pageName).style.display="grid";

historyStack.push(pageName);

updateBreadcrumbs(pageName); 

}

function goBack(){

historyStack.pop();

let previous = historyStack.pop() || "home";

showPage(previous);

}

window.onload=function(){

// SOLO ejecutar en index (SPA)
if(document.getElementById("home")){
  showPage("home");
}

}

function updateBreadcrumbs(pageName){

let container = document.getElementById("breadcrumbs");

let path = pageHierarchy[pageName];

if(!path){
container.innerHTML="";
return;
}

let html="";

for(let i=0;i<path.length;i++){

let label = path[i];
let pageId = Object.keys(pageHierarchy).find(
key => pageHierarchy[key][pageHierarchy[key].length-1] === label
);

if(i===0){
html += `<a onclick="showPage('home')">Home</a>`;
}
else if(i < path.length-1){
html += ` > <span>${label}</span>`;
}
else{
html += ` > <strong>${label}</strong>`;
}

}

container.innerHTML = html;

}


function setBreadcrumbs(path){

let container=document.getElementById("breadcrumbs");

container.innerHTML=path;

}



function updateMap(config){

// fallback para mantener compatibilidad
if(!config){
  config = {
    statId: "statSelect",
    datasetId: "datasetSelect",
    imgId: "mapImage",
    basePath: "../figures/evaluation/wind",
    prefix: "map",
    suffix: "_wind_speed"
  };
}

let stat = document.getElementById(config.statId).value;
let dataset = document.getElementById(config.datasetId).value;

let path = `${config.basePath}/${config.prefix}_${stat}_${dataset}${config.suffix}.png`;

document.getElementById(config.imgId).src = path;
}



function updateGrid(config){

if(!config){
  config = {
    statId: "gridStatSelect",
    imgId: "gridImage",
    basePath: "../figures/evaluation/wind",
    prefix: "wind_speed",
    suffix: "_grids_comparison"
  };
}

let stat = document.getElementById(config.statId).value;

let path = `${config.basePath}/${config.prefix}_${stat}${config.suffix}.png`;

document.getElementById(config.imgId).src = path;
}




function updateImageMulti(config){

let values = config.selectIds.map(id => document.getElementById(id).value);

let filename = config.prefix;

for(let i=0;i<values.length;i++){

  if(i === 1 && config.insertVar){
    filename += "_" + config.insertVar;
  }

  filename += "_" + values[i];
}

filename += config.suffix + ".png";

let path = `${config.basePath}/${filename}`;

document.getElementById(config.imgId).src = path;

}