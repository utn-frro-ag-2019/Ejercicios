// --- RETORNA TODAS LAS COMBINACIONES ÚNICAS ENTRE LOS ELEMENTOS DE UN ARRAY --- //

function combinations(arr) {
  let i, j, temp
  let result = []
  let arrLen = arr.length
  let power = Math.pow
  let combinations = power(2, arrLen)
  for (i = 0; i < combinations;  i++) {
    temp = []
    for (j = 0; j < arrLen; j++) {
      if ((i & power(2, j))) {
        temp.push(arr[j])
      }
    }
    result.push(temp)
  }
  return result
}

// --- CLASES --- //

class Objeto {
  constructor(vol, val) {
    this.volumen = vol;
    this.valor = val;
  }
}

class Mochila {
  constructor(maxVol) {
    this.MaxVolumen = maxVol;
    this.objetos = [];
  }

  colocar(obj){
    this.objetos.push(obj);
  }

  seEncuentra(obj){
    for (const el of this.objetos) {
      if (el == obj) return true;
    }
    return false;
  }

  calcularValor(){
    this.valorTotal = 0;
    this.volumenTotal = 0;
    for (let obj of this.objetos) {
      this.valorTotal+= obj.valor;
      this.volumenTotal += obj.volumen;
    }
    if (this.volumenTotal > this.MaxVolumen) return;
    return {valor: this.valorTotal, volumen: this.volumenTotal}
  }
}

// --- PARÁMETROS GLOBALES --- //

const max = document.getElementById('max');
const time = document.getElementById('time');
const tableBody = document.getElementById('tableBody');
const tableFoot = document.getElementById('tableFoot');

const maxVol = 4200;
const combinaciones = combinations([1,2,3,4,5,6,7,8,9,10]);
const mochilas = [];

const objetos = {
  1  : new Objeto(150, 20),
  2  : new Objeto(325, 40),
  3  : new Objeto(600, 50),
  4  : new Objeto(805, 36),
  5  : new Objeto(430, 25),
  6  : new Objeto(1200, 64),
  7  : new Objeto(770, 54),
  8  : new Objeto(60, 18),
  9  : new Objeto(930, 46),
  10 : new Objeto(353, 28),
}

// --- SE CREA UNA MOCHILA POR CADA DISTINTA COMBINACION DE OBJETOS --- //

let startTime = Date.now();

for (const combinacion of combinaciones) {
  const mochila = new Mochila(maxVol);
  for (const el of combinacion) {
    mochila.colocar(objetos[el]);
  }
  mochilas.push(mochila);
}

// --- EVALUAMOS TODAS LAS MOCHILAS --- //

let mejorMochila = new Mochila(maxVol);
let valorDelMejor = 0;
let volumenDelMejor = 0;
for (const mochila of mochilas) {
  const data = mochila.calcularValor();
  if (data) {
    const {valor, volumen} = data;
    if (valor > valorDelMejor){
      valorDelMejor = valor;
      volumenDelMejor = volumen;
      mejorMochila = mochila;
    }
  }
}

let endTime = Date.now();

// --- SE REALIZAN LAS GRÁFICAS DE LOS RESULTADOS --- //

for (const i in objetos) {
  let data =`
  <tr>
    <td>${i}</td>
    <td>${objetos[i].volumen} cm3</td>
    <td>$${objetos[i].valor}</td>
    <td>${mejorMochila.seEncuentra(objetos[i]) ? '<span class="green">✔<span>' : '<span class="red">✘<span>'}</td>
  </tr>`
  tableBody.innerHTML += data;
}
tableFoot.innerHTML = `
<tr>
  <th>Total:</th>
  <th>${volumenDelMejor} cm3</th>
  <th>$${valorDelMejor}</th>
  <th>${mejorMochila.objetos.length} Obj</th>
</tr>`
max.innerHTML = `Capacidad Máxima: ${maxVol} cm3`;
time.innerHTML = `Tiempo de ejecución: ${endTime - startTime} ms`;
