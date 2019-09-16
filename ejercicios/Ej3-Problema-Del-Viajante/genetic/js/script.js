const findBestButton = document.getElementById('findBest');

/*-----------------------------------------------------------*/

const compareRoutes = (r1, r2) => {
  let d1 = 0;
  let d2 = 0;

  let c1, c2;
  for (let i = 0; i < r1.length - 1; i++) {
    c1 = r1[i];
    c2 = r1[i + 1];
    d1 += distances[cities[c1]][cities[c2]];

    c1 = r2[i];
    c2 = r2[i + 1];
    d2 += distances[cities[c1]][cities[c2]];
  }

  return d1 < d2 ? r1 : r2;
}

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

/*-----------------------------------------------------------*/

const findByCity = (firstCity) => {
  let arrayOfCities = [];
  Object.keys(cities).forEach(function(key) {
    arrayOfCities.push(key);
  })

  let route = [];
  let currentCity = firstCity;
  while (arrayOfCities.length != 0) {
    route.push(currentCity);
    arrayOfCities = arrayOfCities.filter((e) => e != currentCity);
    let smallestDistance = Infinity;
    let nearestCity;
    for (let city of arrayOfCities) {
      let first = currentCity;
      let second = city;
      var distance = distances[cities[first]][cities[second]];
      if (distance < smallestDistance) {
        smallestDistance = distance;
        nearestCity = second;
      }
    }
    currentCity = nearestCity;
  }
  route.push(firstCity);
  return route;
}

const findBest = () => {
  let bestRoute = [];
  Object.keys(cities).forEach(function(key) {
    bestRoute.push(key);
  })

  Object.keys(cities).forEach(function(key) {
    let route = findByCity(key);
    bestRoute = compareRoutes(bestRoute, route);
  })

  return bestRoute;
}

/*-----------------------------------------------------------*/

findBestButton.addEventListener("click", () => {
  let route = findBest();
  graph(route);
});

/*-----------------------------------------------------------*/

class possibleRoute {
  constructor(chromosome) {
    this.chromosome = [];
    this.currentFitness = 0;
    this.currentValue = 0;

    if (chromosome !== undefined) {
      this.chromosome = chromosome;
    } else {
      for (let i = 0; i <= 23; i++) {
        chromosome.push(cities[i]);
      }
      shuffle(this.chromosome);
    }
  }

  mutate() {
    // again
  }

  reproduce(cell2) {

    //again

    return {
      child1: child1,
      child2: child2,
    }
  }
}

class Enviroment {
  constructor(crossoverProb, mutateProb, populationSize, UseElitism) {
    this.crossoverProb = crossoverProb;
    this.mutateProb = mutateProb;
    this.UseElitism = UseElitism;

    this.populationSize = populationSize;
    if (this.populationSize < 2) this.populationSize = 2;
    if (this.UseElitism && this.populationSize % 2 == 0) this.populationSize++;

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
