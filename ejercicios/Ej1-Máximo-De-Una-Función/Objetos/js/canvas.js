class Graph {
  constructor(name, label) {
    this.canvas = document.getElementById(`canvas_${name}`);
    this.ctx = this.canvas.getContext('2d');
    this.label = label;
    this.labels = [0];
    this.data = [0];
    this.chart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [{
          label: this.label,
          backgroundColor: 'rgb(255, 0, 132)',
          borderColor: 'rgb(255, 0, 132)',
          data: this.data,
          fill: false,
          borderWidth: 1,
          pointRadius: 1,
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

  reset() {
    this.data.splice(1, this.data.length);
    this.counter = 0;
    this.labels.splice(0, this.labels.length);
  }

  add(data) {
    this.data.push(data);
    this.counter++;
    this.labels.push(this.counter);
  }

  graph() {
    this.chart.update();
  }
}
