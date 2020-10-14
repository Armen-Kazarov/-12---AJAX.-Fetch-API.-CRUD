import { error } from "@pnotify/core";
import { success } from "@pnotify/core";
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/Material.css';
import '@pnotify/core/dist/PNotify.css';
import _ from 'lodash';
import templateCountryList from '../templates/countryListTemplate.hbs';
import countryInfo from '../templates/countryInfo.hbs';

const countryInfoElemRef = {
  countryListRef: document.querySelector('.list-country-js'),
  countryInformationRef: document.querySelector('.country-information'),
  inputSearchInfo: document.querySelector('.search-info-country-js'),
};

const searchCountryHandle = () => {
  let name = countryInfoElemRef.inputSearchInfo.value.trim();

  if(name !== '') {
    fetch(`https://restcountries.eu/rest/v2/name/${name}`)
      .then(response => response.json())
      .then(response => {

        if(response.length >= 2 && response.length <= 10) {
          countryInfoElemRef.countryListRef.innerHTML = templateCountryList(response);
          countryInfoElemRef.countryListRef.style.visibility = 'visible';
          countryInfoElemRef.countryInformationRef.style.visibility = 'hidden';
          countryInfoElemRef.countryInformationRef.innerHTML = '';
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
          countryInfoElemRef.countryInformationRef.innerHTML = countryInfo(response);
          countryInfoElemRef.countryInformationRef.style.visibility = 'visible';
          countryInfoElemRef.countryListRef.style.visibility = 'hidden';
          countryInfoElemRef.countryListRef.innerHTML = '';
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
};

countryInfoElemRef.inputSearchInfo.addEventListener('input',
  _.debounce(searchCountryHandle, 500, {
}));
