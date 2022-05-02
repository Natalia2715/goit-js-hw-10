import './css/styles.css';
import { fetchCountries} from './fetchCountries.js';

const DEBOUNCE_DELAY = 300;
fetchCountries(peru).then(country => {console.log(country)}).catch(error => {
    console.log(error)
});
        

