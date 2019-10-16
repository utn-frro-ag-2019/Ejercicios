function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

class Route {
  constructor(aRoute) {
    this.chromosome = [];
    this.currentFitness = 0;
    this.currentValue = 0;

    if (aRoute !== undefined) {
      this.chromosome = aRoute;
    } else {
      for (let i = 0; i < 24; i++) {
        this.chromosome.push(Object.keys(cities)[i]);
      }
      shuffle(this.chromosome);
    }
  }

  mutate() {
    let p1 = Math.floor(Math.random() * 24);
    let p2 = Math.floor(Math.random() * 24);
    let v1 = this.chromosome[p1];
    let v2 = this.chromosome[p2];
    this.chromosome[p1] = v2;
    this.chromosome[p2] = v1;
    return this;
  }

  reproduce(route2) {
    let val = null;
    let c1 = this.chromosome;
    let c2 = route2.chromosome;
    let newC1 = [];
    let newC2 = [];
    for (let i = 0; i < 24; i++) {
      newC1.push(null);
      newC2.push(null);
    }
    let index = 0;
    newC1[index] = c1[index];
    newC2[index] = c1[index];
    while (val != c1[0]) {
      val = c2[index];
      index = c1.indexOf(val);
      newC1[index] = c1[index];
      newC2[index] = c1[index];
    }

    for (let i = 0; i < 24; i++) {
      if (newC1[i] == null) {
        newC1[i] = c2[i];
        newC2[i] = c1[i];
      }
    }

    let child1 = new Route(newC1);
    let child2 = new Route(newC2);

    return {
      child1: child1,
      child2: child2,
    }
  }
}
