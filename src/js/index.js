// El styles lo importamos aquí, ya se carga después al compilar todo
import '../scss/styles.scss';
//import { sayHello } from './demo.js';

const countryFlags = document.querySelectorAll('.card-flag');
const countriesContainer = document.getElementById('countriesContainer');

const fetchData = async url => {
  const response = await fetch(url);
  const data = response.json();
  return data;
};

const printData = async () => {
  const data = await fetchData('https://restcountries.com/v3.1/all');
  const fragment = document.createDocumentFragment();
  data.forEach(country => {
    const newCountry = document.createElement('div');
    newCountry.classList.add('country-card');
    const cardFlag = document.createElement('img');
    cardFlag.classList.add('card-flag');
    cardFlag.src = country.flags.svg;
    const textContainer = document.createElement('div');
    textContainer.classList.add('card-text-container');
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

    // const newCapitalText = document.createElement('h3');
    // newCapitalText.classList.add('card-text', 'card-text--bold');
    // newCapitalText.textContent = 'Capital:';
    // const newCapitalData = document.createElement('span');
    // newCapitalData.classList.add('card-text');
    // newCapitalData.textContent = country.capital && [...country.capital];
    // newCapitalText.append(newRegionData);
    textContainer.append(newPopulationText);
    textContainer.append(newRegionText);
    //textContainer.append(newCapitalText);
    newCountry.append(cardFlag);
    newCountry.append(textContainer);
    fragment.append(newCountry);
    console.log(country.region);
  });
  countriesContainer.append(fragment);
};

printData();
