// El styles lo importamos aquí, ya se carga después al compilar todo
import { root } from 'postcss';
import '../scss/styles.scss';
//import { sayHello } from './demo.js';

const countryFlags = document.querySelectorAll('.card-flag');
const countriesContainer = document.getElementById('countriesContainer');
const themeMode = document.getElementById('theme-mode')
const rootStyles = document.documentElement.style;

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

    const newCapitalText = document.createElement('h3');
    newCapitalText.classList.add('card-text', 'card-text--bold');
    newCapitalText.textContent = 'Capital:';
    const newCapitalData = document.createElement('span');
    newCapitalData.classList.add('card-text');
    newCapitalData.textContent = country.capital && [...country.capital];
    newCapitalText.append(newCapitalData);
    textContainer.append(newPopulationText);
    textContainer.append(newRegionText);
    textContainer.append(newCapitalText);
    newCountry.append(cardFlag);
    newCountry.append(textContainer);
    fragment.append(newCountry);
  });
  countriesContainer.append(fragment);
};

printData();

themeMode.addEventListener('click', () => {
  themeMode.dataset.mode = 'dark'
  rootStyles.setProperty("--bg-color", "#2b3743")
  rootStyles.setProperty("--secondary-bg", "rgba(32, 32, 32, 0.774)")
  rootStyles.setProperty("--bg", "#202d36")
  rootStyles.setProperty("--text-color", "white")
})
