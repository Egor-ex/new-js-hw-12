import './sass/main.scss';
import fetchCountries from './js/fetchCountries.js';
import countryTemplate from './template/country.hbs';
import countryTemplateList from './template/countries-list.hbs';
const debounce = require('lodash.debounce');

import '@pnotify/core/dist/BrightTheme.css';
import { error, alert } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';

const refs = {
  input: document.querySelector('#js-search'),
  countries: document.querySelector('.js-country-list'),
  infoBox: document.querySelector('.js-country-info'),
};

refs.input.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  e.preventDefault();

  const searchQuery = e.target.value;

  fetchCountries(searchQuery).then(getCountries).finally(onClear());
}

function isActive(e) {
  console.log(e);
}

function getCountries(country) {
  if (country.length === 1) {
    renderCountryCard(country);
  } else if (country.length >= 2 && country.length <= 10) {
    renderCountryList(country);
    refineRequestMessage();
  } else {
    onFetchError();
  }
}

function renderCountryCard(country) {
  const markup = countryTemplate(country);
  refs.countries.insertAdjacentHTML('beforeend', markup);
}

function renderCountryList(country) {
  const markupList = countryTemplateList(country);
  refs.countries.insertAdjacentHTML('beforeend', markupList);
}

function onClear() {
  refs.infoBox.innerHTML = '';
  refs.countries.innerHTML = '';
}

function refineRequestMessage() {
  alert({
    text: 'Too many matches found. Please enter a more specific query.',
  });
}

function onFetchError() {
  error({
    text: 'Sorry, this country does not exist ',
  });
}
// =============================================================
// ////////////////////////////////////////////////////////////

// import './sass/main.scss';
// import fetchCountries from './js/fetchCountries.js';
// import countryTemplate from './template/country.hbs';
// import countriesList from './template/countries-list.hbs';
// const debounce = require('lodash.debounce');

// import '@pnotify/core/dist/BrightTheme.css';
// import { error } from '@pnotify/core';
// import '@pnotify/core/dist/PNotify.css';

// const refs = {
//   input: document.querySelector('#js-search'),
//   countries: document.querySelector('.js-country-list'),
//   infoBox: document.querySelector('.js-country-info'),
// };

// refs.input.addEventListener('input', debounce(searchCountry, 500));

// function searchCountry(e) {
//   e.preventDefault();

//   onInputClear();

//   const searchValue = refs.input.value.trim();

//   fetchCountries(searchValue)
//     .then(country => {
//       if (country.length > 10) {
//         error({
//           text: 'Too many matches found. Please enter a more specific query!',
//         });
//       } else if (country.status === 200) {
//         error({
//           text: 'No country has been found. Please enter a more specific query!',
//         });
//       } else if (country.length === 1) {
//         renderCountryCard(country);
//       } else if (country.length >= 2 && country.length <= 10) {
//         renderCountryList(country);
//       }
//     })
//     .catch(onFetchError);
// }

// function renderCountryCard(country) {
//   const markup = countryTemplate(country);
//   refs.infoBox.insertAdjacentHTML('beforeend', markup);
// }
// function renderCountryList(country) {
//   const markup = countriesList(country);
//   refs.countries.insertAdjacentHTML('beforeend', markup);
// }

// function onInputClear() {
//   refs.infoBox.innerHTML = '';
//   refs.countries.innerHTML = '';
// }

// function onFetchError(Error) {
//   Error;
// }
// /////////////////////////////////////////////////////////////////////
