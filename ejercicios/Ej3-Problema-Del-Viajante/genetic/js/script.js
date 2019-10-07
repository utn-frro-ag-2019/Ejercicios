const geneticButton = document.getElementById('geneticButton');
const resetButton = document.getElementById('resetButton');

/*-----------------------------------------------------------*/

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
  resetFunction();
}
m_slider.oninput = function() {
  m_value.value = this.value;
  resetFunction();
}
p_slider.oninput = function() {
  p_value.value = this.value;
  resetFunction();
}
i_slider.oninput = function() {
  i_value.value = this.value;
  resetFunction();
}

/*-----------------------------------------------------------*/

const resetFunction = () => {
  active = false;
  crossoverProb = parseFloat(c_value.value);
  mutateProb = parseFloat(m_value.value);
  populationSize = parseInt(p_value.value);
  iterationsPs = Math.floor(parseInt(i_value.value) / 10) + 1;
  environment = new Environment(crossoverProb, mutateProb, populationSize);
  graph([]);
}

/*-----------------------------------------------------------*/

let active = false;

let crossoverProb;
let mutateProb;
let populationSize;
let iterationsPs;
let environment;

resetFunction();

/*-----------------------------------------------------------*/

geneticButton.addEventListener("click", () => {
  active = !active;
});

resetButton.addEventListener("click", () => {
  resetFunction();
});

/*-----------------------------------------------------------*/

function loop() {
  setTimeout(() => {
    requestAnimationFrame(loop);

    if (active) {
      for (let i = 0; i < iterationsPs; i++) {
        environment.step();
      }
      let bestRoute = environment.bestRoute();
      let r = [...bestRoute.chromosome];
      r.push(r[0]);
      graph(r);
    }

  }, 100);
}

loop();
