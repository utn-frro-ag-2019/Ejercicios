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

  quitarUltimoElemento(){
    this.objetos.pop();
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
const mochila = new Mochila(maxVol);

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

// --- SE CREA UN ARRAY DE LOS OBJETOS --- //

let startTime = Date.now();

const arrayDeObjetos = [];
for (const i in objetos) {
  arrayDeObjetos.push(objetos[i]);
}

// --- SE ORDENA EL ARRAY DE OBJETOS DE ACUERDO A (VALOR/VOLUMEN) --- //

arrayDeObjetos.sort(function(a,b){return (b.valor/b.volumen - a.valor/a.volumen)});

// --- SE COLOCAN LOS OBJETOS EN LA MOCHILA HASTA QUE YA NO ENTREN --- //
// --- Si entra uno posterior a uno que no entra también se agrega --- //

for (const obj of arrayDeObjetos) {
  mochila.colocar(obj);
  if (!mochila.calcularValor()) {
    mochila.quitarUltimoElemento();
  }
}

let endTime = Date.now();

// --- SE REALIZAN LAS GRÁFICAS DE LOS RESULTADOS --- //

const {valor, volumen} = mochila.calcularValor();

for (const i in objetos) {
  let data =`
  <tr>
    <td>${i}</td>
    <td>${objetos[i].volumen} cm3</td>
    <td>$${objetos[i].valor}</td>
    <td>${mochila.seEncuentra(objetos[i]) ? '<span class="green">✔<span>' : '<span class="red">✘<span>'}</td>
  </tr>`
  tableBody.innerHTML += data;
}
tableFoot.innerHTML = `
<tr>
  <th>Total:</th>
  <th>${volumen} cm3</th>
  <th>$${valor}</th>
  <th>${mochila.objetos.length} Obj</th>
</tr>`
max.innerHTML = `Capacidad Máxima: ${maxVol} cm3`;
time.innerHTML = `Tiempo de ejecución: ${endTime - startTime} ms`;
