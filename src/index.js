///////////////////////////////// STRUCTURE ///////////////////////////////////
//                                                                           //
//                                index.js                                   //
//                              /         \                                  //
//                displayResults.js      changeSearchMode.js                 //
//                        |                                                  //
//                  getWeather.js                                            //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////


import {
  showCoordinatesSearchbar,
  showLocationSearchbar,
} from './changeSearchMode.js';
import {
  displayResultsByCoordinates,
  displayResultsByLocation,
} from './displayResults.js';


////////////////////// BOOTSTRAP TOOLTIPS INITIALIZATION //////////////////////
$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});


////////// FUNCTION THAT DISPLAYS APPROPRIATE SEARCHBAR ///////////

let status = 'location';
const link = document.getElementsByClassName('search-by-link')[0];
link.addEventListener('click', (event) => {
  event.preventDefault();
  if (status === 'location') {
    showCoordinatesSearchbar();
    status = 'coordinates';
  } else {
    showLocationSearchbar();
    status = 'location';
  }
});


////////////// FUNCTION THAT LISTENS TO USER INPUT ////////////////

//Event-listener dei forms
const locationForm = document.forms.locationSearchbar;
locationForm.addEventListener('submit', (event) => {
  event.preventDefault();
  displayResultsByLocation();
});

const coordinatesForm = document.forms.coordinatesSearchbar;
coordinatesForm.addEventListener('submit', (event) => {
  event.preventDefault();
  displayResultsByCoordinates();
});



