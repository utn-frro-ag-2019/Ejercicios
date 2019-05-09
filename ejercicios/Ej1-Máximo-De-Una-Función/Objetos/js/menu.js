const c_slider = document.getElementById('c_slider');
const m_slider = document.getElementById('m_slider');
const p_slider = document.getElementById('p_slider');
const i_slider = document.getElementById('i_slider');

const c_value = document.getElementById('c_value');
const m_value = document.getElementById('m_value');
const p_value = document.getElementById('p_value');
const i_value = document.getElementById('i_value');

c_slider.oninput = function() {
  c_value.value = this.value;
}
m_slider.oninput = function() {
  m_value.value = this.value;
}
p_slider.oninput = function() {
  p_value.value = this.value;
}
i_slider.oninput = function() {
  i_value.value = this.value;
}

// --------------------------------------------------------------------

let enviroment;
let graph_avg = new Graph("avg", "valor promedio");
let graph_min = new Graph("min", "valor mínimo");
let graph_max = new Graph("max", "valor máximo");

function run() {

  let crossoverProb = parseFloat(c_value.value);
  let mutateProb = parseFloat(m_value.value);
  let populationSize = parseInt(p_value.value);
  let iterations = parseInt(i_value.value);

  enviroment = new Enviroment(crossoverProb, mutateProb, populationSize);

  graph_avg.reset();
  graph_max.reset();
  graph_min.reset();

  for (var i = 0; i < iterations; i++) {
    enviroment.step();
    graph_avg.add(enviroment.average);
    graph_max.add(enviroment.bestCell().currentValue);
    graph_min.add(enviroment.worstCell().currentValue);
  }

  graph_avg.graph();
  graph_max.graph();
  graph_min.graph();

}
