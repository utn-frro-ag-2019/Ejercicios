/*-----------------------------------------------------------*/

const routeGraph = document.getElementById('graph');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const canvas_container = document.getElementById("canvas_container");

let offSetLeft = canvas.offsetLeft;
let offSetTop = canvas.offsetTop;
let width = canvas.width = canvas_container.clientWidth;
let height = canvas.height = canvas_container.clientHeight;

window.addEventListener('resize', function() {
  offSetLeft = canvas.offsetLeft;
  offSetTop = canvas.offsetTop;
  width = canvas.width = canvas_container.clientWidth;
  height = canvas.height = canvas_container.clientHeight;
});

// --------------------------------------------------------------------

const cities_pos = {
"BsAs" : {x: 231, y: 241},
"Córdoba" : {x: 144, y: 180},
"Corrientes" : {x: 234, y: 110},
"Formosa" : {x: 243, y: 86},
"La Plata" : {x: 239, y: 248},
"La Rioja" : {x: 101, y: 146},
"Mendoza" : {x: 72, y: 210},
"Neuquén" : {x: 88, y: 322},
"Paraná" : {x: 202, y: 188},
"Posadas" : {x: 280, y: 109},
"Rawson" : {x: 134, y: 401},
"Resistencia" : {x: 228, y: 110},
"Río Galleqos" : {x: 90, y: 557},
"Catamarca" : {x: 117, y: 128},
"Tucumán" : {x: 125, y: 97},
"Jujuy" : {x: 124, y: 48},
"Salta" : {x: 122, y: 59},
"San Juan" : {x: 75, y: 186},
"San Luis" : {x: 111, y: 216},
"Santa Fe" : {x: 198, y: 186},
"Santa Rosa" : {x: 143, y: 277},
"Sgo del Estero" : {x: 141, y: 115},
"Ushuaia" : {x: 105, y: 616},
"Viedma" : {x: 162, y: 357},
}

// --------------------------------------------------------------------

let currentRoute = [];

const graph = (route) => {
  currentRoute = route;
  graphCurrentRoute()
}

window.addEventListener('resize', function() {
  graphCurrentRoute()
});

// --------------------------------------------------------------------

function graphCurrentRoute(){

  let count = 1;
  let totalDistance = 0;

  routeGraph.innerHTML = "";

  ctx.clearRect(0,0,width,height);

  ctx.fillStyle = "#000";
  Object.keys(cities_pos).forEach(function(key) {
    ctx.beginPath();
    ctx.arc(cities_pos[key].x, cities_pos[key].y,4, 0, 2 * Math.PI);
    ctx.fill();
  })

  for (let i = 0; i < currentRoute.length - 1; i++) {
    let c1 = currentRoute[i];
    let c2 = currentRoute[i + 1];
    let distance = distances[cities[c1]][cities[c2]];
    totalDistance += distance;

    routeGraph.innerHTML += `
    <div class="route">
      <p>${c1} -> ${c2}</p>
      <p>distancia recorrida: ${distance} km</p>
    </div>
    `

    ctx.fillStyle = "#000";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cities_pos[c1].x, cities_pos[c1].y);
    ctx.lineTo(cities_pos[c2].x, cities_pos[c2].y);
    ctx.stroke();
    ctx.fill();

    ctx.fillStyle = "#fff";
    ctx.font = "10px Arial";
    ctx.strokeText(count, cities_pos[c1].x - 2, cities_pos[c1].y - 8);
    ctx.fillText(count, cities_pos[c1].x - 2, cities_pos[c1].y - 8);

    count++;
  }

  routeGraph.innerHTML += `
  <div class="finalkm">
    <p>Distancia final recorrida: ${totalDistance} km</p>
  </div>
  `

}
