const citiesSelect = document.getElementById('citiesSelect');
const findByCityButton = document.getElementById('findByCity');
const findBestButton = document.getElementById('findBest');

/*-----------------------------------------------------------*/

Object.keys(cities).forEach(function(key) {
  let option = `<option value="${key}">${key}</option>`;
  citiesSelect.innerHTML += option;
})

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

findByCityButton.addEventListener("click", () => {
  let route = findByCity(citiesSelect.value);
  graph(route);
});

findBestButton.addEventListener("click", () => {
  let route = findBest();
  graph(route);
});

/*-----------------------------------------------------------*/
