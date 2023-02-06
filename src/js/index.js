// El styles lo importamos aquí, ya se carga después al compilar todo
import { root } from 'postcss';
import '../scss/styles.scss';
//import { sayHello } from './demo.js';

const countriesContainer = document.getElementById('countriesContainer');
const themeMode = document.getElementById('theme-mode');
const moonIcon = document.getElementById('moon');
const searchIcon = document.getElementById('search-icon');
const selectItem = document.getElementById('region');
selectItem.selectedIndex = 0;
const searchItem = document.getElementById('search');
const modal = document.getElementById('modal');
const returnButton = document.getElementById('return');
const modalFlag = document.getElementById('modal-flag');
const modalTitle = document.getElementById('modal-title');
const modalNativeName = document.getElementById('native-name');
const topLevelDomain = document.getElementById('domain');
const modalPopulation = document.getElementById('population');
const modalRegion = document.getElementById('region-modal');
const modalSubregion = document.getElementById('subregion');
const modalCapital = document.getElementById('capital');
const modalCurrencies = document.getElementById('currencies');
const modalLanguages = document.getElementById('languages');

let countriesList;

const fetchData = async url => {
  const response = await fetch(url);
  const data = await response.json();
  countriesList = data;
  printData(countriesList);
};

const printData = array => {
  countriesContainer.innerHTML = '';
  const fragment = document.createDocumentFragment();
  array.forEach(country => {
    const newCountry = document.createElement('div');
    newCountry.classList.add('country-card');
    const cardFlag = document.createElement('img');
    cardFlag.classList.add('card-flag');
    cardFlag.src = country.flags.svg;
    const textContainer = document.createElement('div');
    textContainer.classList.add('card-text-container');

    const newCountryText = document.createElement('h3');
    newCountryText.classList.add('title--small');
    newCountryText.textContent = country.name.common;

    const newPopulationText = document.createElement('h3');
    newPopulationText.classList.add('card-text', 'card-text--bold');
    newPopulationText.textContent = 'Population:';
    const newPopulationData = document.createElement('span');
    newPopulationData.classList.add('card-text');
    newPopulationData.textContent = country.population;
    newPopulationText.append(newPopulationData);

    const newRegionText = document.createElement('h3');
    newRegionText.classList.add('card-text', 'card-text--bold');
    newRegionText.textContent = 'Region:';
    const newRegionData = document.createElement('span');
    newRegionData.classList.add('card-text');
    newRegionData.textContent = country.region;
    newRegionText.append(newRegionData);

    const newCapitalText = document.createElement('h3');
    newCapitalText.classList.add('card-text', 'card-text--bold');
    newCapitalText.textContent = 'Capital:';
    const newCapitalData = document.createElement('span');
    newCapitalData.classList.add('card-text');
    newCapitalData.textContent = country.capital && [...country.capital];
    newCapitalText.append(newCapitalData);
    textContainer.append(newCountryText);
    textContainer.append(newPopulationText);
    textContainer.append(newRegionText);
    textContainer.append(newCapitalText);
    newCountry.append(cardFlag);
    newCountry.append(textContainer);
    newCountry.dataset.name = country.name.common;
    fragment.append(newCountry);
  });
  countriesContainer.append(fragment);
};

const filterByRegion = async selectedRegion => {
  const filteredArray = countriesList.filter(
    country => country.region.toLowerCase() === selectedRegion.toLowerCase()
  );
  printData(filteredArray);
};

const filterByName = async search => {
  const filteredArray = countriesList.filter(country =>
    country.name.common.toLowerCase().startsWith(search.toLowerCase())
  );
  printData(filteredArray);
};

const filterCountry = async selectedcountry => {
  const filteredCountry = countriesList.filter(
    country =>
      country.name.common.toLowerCase() === selectedcountry.toLowerCase()
  );

  printCountry(filteredCountry);
};

const printCountry = async filteredCountry => {
  const threeLetters = filteredCountry[0].cca3.toLowerCase();
  modalFlag.src = filteredCountry[0].flags.svg;
  modalTitle.textContent = filteredCountry[0].name.common;
  const allNativeName = Object.keys(filteredCountry[0].name.nativeName)[0];
  filteredCountry.forEach(nameCountry => {
    modalNativeName.textContent =
      filteredCountry[0].name.nativeName[allNativeName].common;
  });
  topLevelDomain.textContent = `. ${filteredCountry[0].altSpellings[0].toLowerCase()}`;
  modalPopulation.textContent = filteredCountry[0].population;
  const allCurrencies = Object.keys(filteredCountry[0].currencies)[0];
  modalCurrencies.textContent =
    filteredCountry[0].currencies[allCurrencies].name;
  modalRegion.textContent = filteredCountry[0].region;
  modalSubregion.textContent = filteredCountry[0].subregion;
  modalCapital.textContent = filteredCountry[0].capital;
  const allLanguages = Object.values(filteredCountry[0].languages);
  modalLanguages.textContent = allLanguages;
  console.log(allLanguages);
};

fetchData('https://restcountries.com/v3.1/all');

selectItem.addEventListener('change', e => {
  if (e.target.selectedIndex === 0) return;
  filterByRegion(e.target.value);
});

themeMode.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  moonIcon.classList.toggle('icon--invert');
  searchIcon.classList.toggle('icon--invert');
});

searchItem.addEventListener('keyup', e => {
  filterByName(e.srcElement.value);
});

countriesContainer.addEventListener('click', e => {
  filterCountry(e.target.dataset.name);
  modal.classList.add('country-modal--show');
  document.body.style.overflow = 'hidden';
});

returnButton.addEventListener('click', () => {
  modal.classList.remove('country-modal--show');
  document.body.style.overflow = 'auto';
});
