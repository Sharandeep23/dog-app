const main = document.querySelector('main');
const loader = document.querySelector('.loading-dog');
const breedSelect = document.querySelector('.breed-list');

const BREED_LIST_URL = 'https://dog.ceo/api/breeds/list/all';
const RANDOM_BREED_IMG_URL = 'https://dog.ceo/api/breeds/image/random';

async function init() {
  addBreedList();
}

async function addBreedList() {
  try {
    const response = await axios.get(BREED_LIST_URL);
    const breedList = Object.keys(response.data.message);

    // First option
    let breedOptions = `<option value=''>--Please choose an option--</option>`;

    // Adding the rest of the options
    for (let breed of breedList) {
      breedOptions += `<option value='${breed}'>${breed}</option>`;
    }

    // Adding the options to the select element
    breedSelect.innerHTML = breedOptions;
  } catch (error) {
    console.error(error);
  }
}

init();
