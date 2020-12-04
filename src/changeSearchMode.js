const locationSearchbar = document.getElementsByClassName(
  'location-searchbar'
)[0];
const coordinatesSearchbar = document.getElementsByClassName(
  'coordinates-searchbar'
)[0];

const link = document.getElementsByClassName('search-by-link')[0];

export function showLocationSearchbar() {
    link.innerHTML = 'Search by coordinates';
    locationSearchbar.classList.remove('hide');
    coordinatesSearchbar.classList.add('hide');
}

export function showCoordinatesSearchbar() {
  link.innerHTML = 'Search by location';
  locationSearchbar.classList.add('hide');
  coordinatesSearchbar.classList.remove('hide');
}
