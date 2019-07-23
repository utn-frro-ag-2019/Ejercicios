// --- CLASES --- //

class Objeto {
  constructor(vol, val) {
    this.peso = vol;
    this.valor = val;
  }
}

class Mochila {
  constructor(maxPeso) {
    this.MaxVolumen = maxPeso;
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
    this.pesoTotal = 0;
    for (let obj of this.objetos) {
      this.valorTotal+= obj.valor;
      this.pesoTotal += obj.peso;
    }
    if (this.pesoTotal > this.MaxVolumen) return;
    return {valor: this.valorTotal, peso: this.pesoTotal}
  }
}

// --- PARÁMETROS GLOBALES --- //

const max = document.getElementById('max');
const time = document.getElementById('time');
const tableBody = document.getElementById('tableBody');
const tableFoot = document.getElementById('tableFoot');

const maxPeso = 3000;
const mochila = new Mochila(maxPeso);

const objetos = {
  1  : new Objeto(1800, 72),
  2  : new Objeto(600, 36),
  3  : new Objeto(1200, 60),
}

// --- SE CREA UN ARRAY DE LOS OBJETOS --- //

let startTime = Date.now();

const arrayDeObjetos = [];
for (const i in objetos) {
  arrayDeObjetos.push(objetos[i]);
}

// --- SE ORDENA EL ARRAY DE OBJETOS DE ACUERDO A (VALOR/VOLUMEN) --- //

arrayDeObjetos.sort(function(a,b){return (b.valor/b.peso - a.valor/a.peso)});

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

const {valor, peso} = mochila.calcularValor();

for (const i in objetos) {
  let data =`
  <tr>
    <td>${i}</td>
    <td>${objetos[i].peso} gr</td>
    <td>$${objetos[i].valor}</td>
    <td>${mochila.seEncuentra(objetos[i]) ? '<span class="green">✔<span>' : '<span class="red">✘<span>'}</td>
  </tr>`
  tableBody.innerHTML += data;
}
tableFoot.innerHTML = `
<tr>
  <th>Total:</th>
  <th>${peso} gr</th>
  <th>$${valor}</th>
  <th>${mochila.objetos.length} Obj</th>
</tr>`
max.innerHTML = `Capacidad Máxima: ${maxPeso} gr`;
time.innerHTML = `Tiempo de ejecución: ${endTime - startTime} ms`;
