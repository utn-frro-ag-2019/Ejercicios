class Graph {
  constructor() {
    this.init();
  }

  init() {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.cc = document.getElementById('cc');

    this.decimalView = document.getElementById('decimal');
    this.funcValView = document.getElementById('funcVal');
    this.chromosomeView = document.getElementById('chromosome');
  }

  reset(iterations) {
    this.width = this.canvas.width = this.cc.clientWidth;
    this.height = this.canvas.height = this.cc.clientHeight;
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.space = this.width / iterations;
    this.p = {
      x: 0,
      y: this.height,
    };
  }

  graph(cell) {
    let h = cell.currentValue * this.height;
    let c = {
      x: this.p.x + this.space,
      y: this.height - h,
    };

    this.ctx.lineWidth = 3;
    this.ctx.beginPath();
    this.ctx.moveTo(this.p.x, this.p.y);
    this.ctx.lineTo(c.x, c.y);
    this.ctx.stroke();
    this.p = c;

    this.decimalView.innerHTML = parseInt(cell.chromosome.join(""), 2);
    this.funcValView.innerHTML = cell.currentValue;
    this.chromosomeView.innerHTML = cell.chromosome.join("");
  }
}

class Graph_avg extends Graph {
  init() {
    this.canvas = document.getElementById('canvas_avg');
    this.ctx = this.canvas.getContext('2d');
    this.cc = document.getElementById('cc_avg');
    this.width = this.canvas.width = this.cc.clientWidth;
    this.height = this.canvas.height = this.cc.clientHeight;

    this.funcValView = document.getElementById('funcVal_avg');
  }

  graph(avg) {
    let h = avg * this.height;
    let c = {
      x: this.p.x + this.space,
      y: this.height - h,
    };

    this.ctx.lineWidth = 3;
    this.ctx.beginPath();
    this.ctx.moveTo(this.p.x, this.p.y);
    this.ctx.lineTo(c.x, c.y);
    this.ctx.stroke();
    this.p = c;

    this.funcValView.innerHTML = avg;
  }

}

class Graph_min extends Graph {
  init() {
    this.canvas = document.getElementById('canvas_min');
    this.ctx = this.canvas.getContext('2d');
    this.cc = document.getElementById('cc_min');

    this.decimalView = document.getElementById('decimal_min');
    this.funcValView = document.getElementById('funcVal_min');
    this.chromosomeView = document.getElementById('chromosome_min');
  }
}

class Graph_max extends Graph {
  init() {
    this.canvas = document.getElementById('canvas_max');
    this.ctx = this.canvas.getContext('2d');
    this.cc = document.getElementById('cc_max');

    this.decimalView = document.getElementById('decimal_max');
    this.funcValView = document.getElementById('funcVal_max');
    this.chromosomeView = document.getElementById('chromosome_max');
  }
}
