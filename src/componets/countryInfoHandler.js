import { error } from "@pnotify/core";
import { success } from "@pnotify/core";
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/Material.css';
import '@pnotify/core/dist/PNotify.css';
import _ from 'lodash';
import templateCountryList from '../templates/countryListTemplate.hbs';
import countryInfo from '../templates/countryInfo.hbs';

const countryListRef = document.querySelector('.list-country-js');
const countryInformationRef = document.querySelector('.country-information');
let inputSearchInfo = document.querySelector('.search-info-country-js');

const searchCountryHandle = () => {
  let name = inputSearchInfo.value.trim();

  if(name !== '') {
    fetch(`https://restcountries.eu/rest/v2/name/${name}`)
      .then(response => response.json())
      .then(response => {

        if(response.length >= 2 && response.length <= 10) {
          countryListRef.innerHTML = templateCountryList(response);
          countryListRef.style.visibility = 'visible';
          countryInformationRef.style.visibility = 'hidden';
          countryInformationRef.innerHTML = '';
          success({
            title: 'Success!',
            text: 'That thing that you were trying to do worked.',
            delay: 1000
          });
          } else if (response.length > 10) {
            error({
              text: 'Too many matches found. Please enter a more specific query!',
              delay: 1000,
            });
          }

        if (response.length === 1) {
          countryInformationRef.innerHTML = countryInfo(response);
          countryInformationRef.style.visibility = 'visible';
          countryListRef.style.visibility = 'hidden';
          countryListRef.innerHTML = '';
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
};

inputSearchInfo.addEventListener('input',
  _.debounce(searchCountryHandle, 500, {
}));
