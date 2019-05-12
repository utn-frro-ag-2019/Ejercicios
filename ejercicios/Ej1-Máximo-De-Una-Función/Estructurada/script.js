var population = []; //ARRAY DE POBLACIÓN
var fitness = []; //FITNESS ARRAY
var matPool = []; //MATING POOL ARRAY
var crossProb; //PROBABILIDAD DE CROSSOVER
var mutProb; //PROBABILIDAD DE MUTACIÓN
var n; //NÚMERO DE GENERACIONES
var popNum; //NÚMERO DE INDIVIDUOS
var geneNum = 30; // NÚMERO DE GENES

var labels;
var data1; //CANVAS1
var data2; //CANVAS2
var data3; //CANVAS3
var chart1, chart2, chart3;


//RANDOM NUMBER BETWEEN 0 AND MAX
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


//SUMS ARRAY NUMBERS
function sum(input) {
  if (toString.call(input) !== "[object Array]")
    return false;
  var total = 0;
  for (var i = 0; i < input.length; i++) {
    if (isNaN(input[i])) {
      continue;
    }
    total += Number(input[i]);
  }
  return total;
}


//CONVERTS DECIMAL TO BINARY
function dec2bin(dec) {
  return (dec >>> 0).toString(2);
}


//FUNCIÓN OBJETIVO
function objFunction(x) {
  return ((x / (2 ** 30 - 1)) ** 2);
}


//GRAFICAR CANVAS
function graph() {

  $("canvas").css("display", "block");
  $(".canvasDiv").css("display", "flex");

  if(chart1) chart1.destroy();
  if(chart2) chart2.destroy();
  if(chart3) chart3.destroy();

  //MAX GRAPH
  var canvas1 = document.getElementById("canvas1");
  var ctx1 = canvas1.getContext("2d");

  chart1 = new Chart(ctx1, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: "Máximos",
        backgroundColor: '#3F3FFF',
        borderColor: '#3F3FFF',
        data: data1,
        fill: false,
        borderWidth: 2,
        pointRadius: 2,
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            max: 1,
            min: 0,
          }
        }]
      },
      legend: {
        labels: {
          defaultFontSize: 50
        }
      }
    }
  });


  //MIN GRAPH
  var canvas2 = document.getElementById("canvas2");
  var ctx2 = canvas2.getContext("2d");

  chart2 = new Chart(ctx2, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: "Mínimos",
        backgroundColor: '#E01616',
        borderColor: '#E01616',
        data: data2,
        fill: false,
        borderWidth: 2,
        pointRadius: 2,
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            max: 1,
            min: 0,
          }
        }]
      }
    }
  });


  //AVERAGE GRAPH
  var canvas3 = document.getElementById("canvas3");
  var ctx3 = canvas3.getContext("2d");

  chart3 = new Chart(ctx3, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: "Promedios",
        backgroundColor: '#E0BB16',
        borderColor: '#E0BB16',
        data: data3,
        fill: false,
        borderWidth: 2,
        pointRadius: 2,
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            max: 1,
            min: 0,
          }
        }]
      }
    }
  });
}



//DEFINE PRIMERA POBLACIÓN
function definePopulation() {
  var gene;
  for (var i = 0; i < popNum; i++) {
    let chromosome = [];
    for (var j = 0; j < geneNum; j++) {
      gene = getRandomInt(2);
      chromosome.push(gene);
    }
    population.push(chromosome);
  }
}



//CALCULA FITNESS
function calcFitness() {
  var cromosome;
  var objFCromosome;
  var sumObj = 0;
  for (var i = 0; i < popNum; i++) {
    sumObj += objFunction(parseInt(population[i].join(""), 2)); //ADDS OBJECT FUNCTION OF POPULATION
  }
  //console.log(sumObj / popNum);
  for (var i = 0; i < popNum; i++) {
    objFCromosome = objFunction(parseInt(population[i].join(""), 2));
    fitness.push((objFCromosome / sumObj));
  }
}



//MATING POOL
function matingPool() {
  matPool = [];
  for (var i = 0; i < popNum; i++) {
    for (var j = 0; j <= (fitness[i] * 10000); j++) {
      matPool.push(population[i]);
    }
  }
  fitness = []; //EMPTIES FITNESS
}



//CROSSOVER
function crossover() {
  population = []; //EMPTIES POPULATION
  var parents = [];
  var cut; //SPLIT OF PARENTS
  var prob; //PROBABILITY OF CROSSOVER

  for (var i = 0; i < popNum; i++) {
    parents[i] = matPool[getRandomInt(matPool.length)].slice(0);
  }

  while (parents.length != 0) {
    let parent1 = parents.pop();
    let parent2 = parents.pop();

    let child1 = [];
    let child2 = [];

    //CROSSING PARENTS 1 AND 2
    prob = Math.random();
    if (prob < crossProb) {
      cut = getRandomInt(geneNum);

      for (var i = 0; i < cut; i++) {
        child1.push(parent1[i]);
      }
      for (var i = cut; i < geneNum; i++) {
        child1.push(parent2[i]);
      }

      cut = getRandomInt(geneNum);

      for (var i = 0; i < cut; i++) {
        child2.push(parent2[i]);
      }
      for (var i = cut; i < geneNum; i++) {
        child2.push(parent1[i]);
      }

    } else {
      child1 = parent1.slice(0);
      child2 = parent2.slice(0);
    }

    //ADDS CHILDREN TO NEW POPULATION
    population.push(child1);
    population.push(child2);
  }
}



//MUTATION
function mutation() {
  var prob, indexMut;
  for (var i = 0; i < popNum; i++) {
    prob = Math.random();
    if (prob < mutProb) {
      indexMut = getRandomInt(geneNum);
      population[i][indexMut] = (population[i][indexMut] == 0 ? 1 : 0);
    }
  }
}


//PROGRAMA PRINCIPAL
$("#run").on("click", function() {

  population = [];
  fitness = [];

  //TOMA VALORES
  crossProb = $("#crossProb").val();
  mutProb = $("#mutProb").val();
  n = $("#genNum").val();
  popNum = $("#popNum").val();

  if (popNum % 2 == 0 && mutProb >= 0 && mutProb <= 1 && crossProb >= 0 && crossProb <= 1) {

    $(".tableBody").empty(); //VACÍA TABLA
    labels = []; //VACÍA GRAFICO
    data1 = []; //VACÍA GRAFICO
    data2 = []; //VACÍA GRAFICO
    data3 = []; //VACÍA GRAFICO


    $(".tableTitle").text(n + " Generaciones");
    $(".tableBody").append("<tr><th>Generación</th><th>Valor Máximo</th><th>Promedio</th><th>Máximo</th><th>Mínimo</th></tr>");

    definePopulation();

    //N ITERATIONS
    for (var i = 0; i <= n; i++) {

      var decimalPopulation = [];
      var decimalTruePopulation = [];
      calcFitness();
      matingPool();
      crossover();
      mutation();

      //VALORES PARA LA TABLA
      for (var j = 0; j < popNum; j++) {
        decimalPopulation.push(objFunction(parseInt(population[j].join(""), 2)));
        decimalTruePopulation.push(parseInt(population[j].join(""), 2));
      }

      //APPENDS VALORES
      $(".tableBody").append('<tr><td>' + i + '</td><td>' + dec2bin(Math.max.apply(null, decimalTruePopulation)) + '</td><td>' + (sum(decimalPopulation) / decimalPopulation.length).toFixed(5) + '</td><td>' + Math.max.apply(null, decimalPopulation).toFixed(5) + '</td><td>' + Math.min.apply(null, decimalPopulation).toFixed(5) + '</td></tr>');

      labels.push(i);
      data1.push(parseFloat(Math.max.apply(null, decimalPopulation).toFixed(5)));
      data2.push(parseFloat(Math.min.apply(null, decimalPopulation).toFixed(5)));
      data3.push(parseFloat((sum(decimalPopulation) / decimalPopulation.length).toFixed(5)));

    }

    data1.unshift(0);
    data2.unshift(0);
    data3.unshift(0);

    graph();

    $("footer").css("display", "flex");

  } else alert("Ingresar valores correctos");
});
