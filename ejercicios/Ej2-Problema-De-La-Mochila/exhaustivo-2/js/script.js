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
  constructor(peso, val) {
    this.peso = peso;
    this.valor = val;
  }
}

class Mochila {
  constructor(maxVol) {
    this.MaxPeso = maxVol;
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
    this.PesoTotal = 0;
    for (let obj of this.objetos) {
      this.valorTotal+= obj.valor;
      this.PesoTotal += obj.peso;
    }
    if (this.PesoTotal > this.MaxPeso) return;
    return {valor: this.valorTotal, peso: this.PesoTotal}
  }
}

// --- PARÁMETROS GLOBALES --- //

const max = document.getElementById('max');
const time = document.getElementById('time');
const tableBody = document.getElementById('tableBody');
const tableFoot = document.getElementById('tableFoot');

const maxPeso = 3000;
const combinaciones = combinations([1,2,3]);
const mochilas = [];

const objetos = {
  1  : new Objeto(1800, 72),
  2  : new Objeto(600, 36),
  3  : new Objeto(1200, 60),
}

// --- SE CREA UNA MOCHILA POR CADA DISTINTA COMBINACION DE OBJETOS --- //

let startTime = Date.now();

for (const combinacion of combinaciones) {
  const mochila = new Mochila(maxPeso);
  for (const el of combinacion) {
    mochila.colocar(objetos[el]);
  }
  mochilas.push(mochila);
}

// --- EVALUAMOS TODAS LAS MOCHILAS --- //

let mejorMochila = new Mochila(maxPeso);
let valorDelMejor = 0;
let PesoDelMejor = 0;
for (const mochila of mochilas) {
  const data = mochila.calcularValor();
  if (data) {
    const {valor, peso} = data;
    if (valor > valorDelMejor){
      valorDelMejor = valor;
      PesoDelMejor = peso;
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
    <td>${objetos[i].peso} gr</td>
    <td>$${objetos[i].valor}</td>
    <td>${mejorMochila.seEncuentra(objetos[i]) ? '<span class="green">✔<span>' : '<span class="red">✘<span>'}</td>
  </tr>`
  tableBody.innerHTML += data;
}
tableFoot.innerHTML = `
<tr>
  <th>Total:</th>
  <th>${PesoDelMejor} gr</th>
  <th>$${valorDelMejor}</th>
  <th>${mejorMochila.objetos.length} Obj</th>
</tr>`
max.innerHTML = `Capacidad Máxima: ${maxPeso} gr`;
time.innerHTML = `Tiempo de ejecución: ${endTime - startTime} ms`;
