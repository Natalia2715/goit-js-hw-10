import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries.js';
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const list = document.querySelector(".country-list");
const input = document.querySelector("#search-box");
const countryInfo = document.querySelector(".country-info");
function getNameInput(event) {
    event.preventDefault();
    console.log(event.target.value);
    if (event.target.value !== "") {fetchCountries(event.target.value.trim()).then(countries => {
        if (countries.length > 10) {
            list.innerHTML = "";
            countryInfo.innerHTML = "";
            Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
        }
        else if (countries.length >= 2 && countries.length < 10) { countryInfo.innerHTML = ""; renderCountryList(countries); }
        else { list.innerHTML = "";  renderCountryInfo(countries)}
        
        
    }).catch(error => {
        Notiflix.Notify.failure("Oops, there is no country with that name");
    console.log(error)
    });}
    
    else {
        countryInfo.innerHTML = "";
        list.innerHTML = "";
        return;
    } 
}

input.addEventListener("input", debounce(getNameInput, DEBOUNCE_DELAY) );

        

function renderCountryList(countries) {
     const markup = countries
    .map((country) => {
        return `<li>
         <p class="list-item"><span>
          <img width="50px" height="30px"  src="${country.flags.svg}">
                    </span> ${country.name.official}</p>
          </li>`;
    })
    .join("");
    list.innerHTML = markup;
    }

function renderCountryInfo(countries) {
    
    const info = countries.map((country) => {
    
        return `<h1 class="country_name">
      <span>
          <img width="80px" height="40px"  src="${country.flags.svg}">
                    </span> ${country.name.official}
                  </h1>
    <p class="country_data"> <span class="country_data--title">Capital: </span> ${country.capital}</p>
    <p class="country_data"> <span class="country_data--title">Population: </span> ${country.population} </p>
    <p class="country_data"> <span class="country_data--title">Languages: </span> ${Object.values(country.languages)}</p>`;
    })
    .join("");
    countryInfo.innerHTML = info;
}