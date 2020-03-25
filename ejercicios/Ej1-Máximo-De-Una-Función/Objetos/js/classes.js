class Cell {
  constructor(chromosome) {
    this.chromosome = [];
    this.currentFitness = 0;
    this.currentValue = 0;

    if (chromosome !== undefined) {
      this.chromosome = chromosome;
    } else {
      for (let i = 0; i < 30; i++) {
        let n = Math.round(Math.random());
        this.chromosome.push(n);
      }
    }
  }

  mutate() {
    let index = Math.floor(Math.random() * this.chromosome.length);
    this.chromosome[index] = this.chromosome[index] == 1 ? 0 : 1;
  }

  reproduce(cell2) {
    let cut = Math.floor(Math.random() * (this.chromosome.length - 2)) + 1;

    let ownHead = this.chromosome.slice(0, cut);
    let cell2Head = cell2.chromosome.slice(0, cut);
    let owntail = this.chromosome.slice(cut, this.chromosome.length);
    let cell2Tail = cell2.chromosome.slice(cut, cell2.chromosome.length);

    let chromosome1 = [...ownHead, ...cell2Tail];
    let chromosome2 = [...cell2Head, ...owntail];

    let child1 = new Cell(chromosome1);
    let child2 = new Cell(chromosome2);

    return {
      child1: child1,
      child2: child2,
    }
  }
}

class Environment {
  constructor(crossoverProb, mutateProb, populationSize, UseElitism) {
    this.crossoverProb = crossoverProb;
    this.mutateProb = mutateProb;
    this.UseElitism = UseElitism;

    this.populationSize = populationSize;
    if (this.populationSize < 2) this.populationSize = 2;
    if (this.UseElitism && this.populationSize % 2 == 0) this.populationSize++;
    if (!this.UseElitism && this.populationSize % 2 == 1) this.populationSize++;

    this.average = 0;

    this.objectiveFunction = (x) => (x / (2 ** 30 - 1)) ** 2

    this.population = [];

    for (let i = 0; i < this.populationSize; i++) {
      let cell = new Cell();
      this.population.push(cell);
    }

    this.calculateEachFitness();
  }

  calculateEachFitness() {
    let sum = 0;
    for (let cell of this.population) {
      let decimalValue = parseInt(cell.chromosome.join(""), 2);
      let value = this.objectiveFunction(decimalValue);
      cell.currentValue = value;
      sum += value;
    }

    for (let cell of this.population) {
      cell.currentFitness = cell.currentValue / sum;
    }

    this.average = sum / this.populationSize;
  }

  bestCell() {
    let bestValue = 0;
    let bestCell;

    for (let cell of this.population) {
      let decimalValue = parseInt(cell.chromosome.join(""), 2);
      let value = this.objectiveFunction(decimalValue);
      if (value >= bestValue) {
        bestValue = value;
        bestCell = cell;
      }
    }
    return bestCell;
  }

  worstCell() {
    let worstValue = 1;
    let worstCell;

    for (let cell of this.population) {
      let decimalValue = parseInt(cell.chromosome.join(""), 2);
      let value = this.objectiveFunction(decimalValue);
      if (value <= worstValue) {
        worstValue = value;
        worstCell = cell;
      }
    }
    return worstCell;
  }

  step() {
    let newPopulation = [];

    let theBest = 0;
    if (this.UseElitism) {
      let bestChromosome = this.bestCell().chromosome.slice();
      let elite = new Cell(bestChromosome);
      newPopulation.push(elite);
      theBest = 1;
    }

    let roulette = [];
    for (let cell of this.population) {
      let prob = Math.floor(cell.currentFitness * 500) + 1;
      for (let i = 0; i < prob; i++) {
        let newCell = new Cell(cell.chromosome);
        roulette.push(newCell);
      }
    }

    let preselection = [];
    for (let i = 0; i < this.populationSize - theBest; i++) {
      let cell = roulette[Math.floor(Math.random() * roulette.length)];
      preselection.push(cell);
    }

    while (preselection.length > 0) {
      let newCell1;
      let newCell2;

      let parent1 = preselection.pop();
      let parent2 = preselection.pop();

      if (Math.random() < this.crossoverProb) {
        let { child1, child2 } = parent1.reproduce(parent2);
        newCell1 = child1;
        newCell2 = child2;
      } else {
        newCell1 = parent1;
        newCell2 = parent2;
      }

      if (Math.random() < this.mutateProb) {
        newCell1.mutate();
      }
      if (Math.random() < this.mutateProb) {
        newCell2.mutate();
      }

      newPopulation.push(newCell1);
      newPopulation.push(newCell2);
    }
    this.population = newPopulation;
    this.calculateEachFitness();
  }
}
