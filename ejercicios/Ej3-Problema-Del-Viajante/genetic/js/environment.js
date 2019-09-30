const objectiveFunction = (route) => {
  let r = [...route.chromosome];
  r.push(r[0]);
  let totalDistance = 0;
  for (let i = 0; i < r.length - 1; i++) {
    let c1 = r[i];
    let c2 = r[i + 1];
    let distance = distances[cities[c1]][cities[c2]];
    totalDistance += distance;
  }
  return totalDistance;
}

/*-----------------------------------------------------------*/

class Environment {
  constructor(crossoverProb, mutateProb, populationSize) {
    this.crossoverProb = crossoverProb;
    this.mutateProb = mutateProb;

    this.populationSize = populationSize;
    if (this.populationSize < 2) this.populationSize = 2;
    if (this.populationSize % 2 == 1) this.populationSize++;

    this.average = 0;

    this.population = [];

    for (let i = 0; i < this.populationSize; i++) {
      let route = new Route();
      this.population.push(route);
    }

    this.calculateEachFitness();
  }

  calculateEachFitness() {
    for (let route of this.population) {
      let fitness = 1000 / objectiveFunction(route);
      route.currentFitness = fitness;
    }
  }

  bestRoute() {
    let bestValue = Infinity;
    let bestRoute;

    for (let route of this.population) {
      let value = objectiveFunction(route);
      if (value <= bestValue) {
        bestValue = value;
        bestRoute = route;
      }
    }
    return bestRoute;
  }

  worstRoute() {
    let worstValue = 0;
    let worstRoute;

    for (let cell of this.population) {
      let value = objectiveFunction(route);
      if (value >= worstValue) {
        worstValue = value;
        worstRoute = route;
      }
    }
    return worstRoute;
  }

  step() {
    let newPopulation = [];

    let roulette = [];
    for (let route of this.population) {
      let prob = Math.floor(route.currentFitness * 500) + 1;
      for (let i = 0; i < prob; i++) {
        let newRoute = new Route(route.chromosome);
        roulette.push(newRoute);
      }
    }

    let preselection = [];
    for (let i = 0; i < this.populationSize; i++) {
      let route = roulette[Math.floor(Math.random() * roulette.length)];
      preselection.push(route);
    }

    while (preselection.length > 0) {
      let newRoute1;
      let newRoute2;

      let parent1 = preselection.pop();
      let parent2 = preselection.pop();

      if (Math.random() < this.crossoverProb) {
        let {
          child1,
          child2
        } = parent1.reproduce(parent2);
        newRoute1 = child1;
        newRoute2 = child2;
      } else {
        newRoute1 = parent1;
        newRoute2 = parent2;
      }

      if (Math.random() < this.mutateProb) {
        newRoute1.mutate();
      }
      if (Math.random() < this.mutateProb) {
        newRoute2.mutate();
      }

      newPopulation.push(newRoute1);
      newPopulation.push(newRoute2);
    }
    this.population = newPopulation;
    this.calculateEachFitness();
  }
}
