const main = document.querySelector('main');
const breedSelect = document.querySelector('.breed-list');
const breedImg = document.querySelector('.main-image');
const loader = document.querySelector('.loading-dog');

const BREED_LIST_URL = 'https://dog.ceo/api/breeds/list/all';
const RANDOM_BREED_IMG_URL = 'https://dog.ceo/api/breeds/image/random';

function init() {
  // Breed list for the select
  addBreedList(BREED_LIST_URL);

  // Without any selection, a random img will be shown
  addRandomImg(RANDOM_BREED_IMG_URL);

  // When a breed is selected, hide the img, show the spinner, get the breed img, add it to the DOM.
  breedSelect.addEventListener('change', handleBreedChange);

  // When Image loads, show the image and hide the spinner/loader
  breedImg.addEventListener('load', handleBreedImgLoad);
}

async function addBreedList(url) {
  try {
    const response = await axios.get(url);
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

async function addRandomImg(url) {
  try {
    const response = await axios.get(url);
    const randBreedImgUrl = response.data.message;

    // This line doesn't add the image instantly
    breedImg.src = randBreedImgUrl;
  } catch (error) {
    console.error(error);
  }
}

async function handleBreedChange(e) {
  const breed = e.target.value;

  // For empty strings
  if (breed === '') return;

  const IMG_BY_BREED_URL = `https://dog.ceo/api/breed/${breed}/images/random`;

  // changing option should hide image and show the spinner/loader
  breedImg.classList.remove('show');
  loader.classList.add('show');

  try {
    const response = await axios.get(IMG_BY_BREED_URL);
    const breedImgUrl = response.data.message;

    // This line doesn't add the image instantly
    breedImg.src = breedImgUrl;
  } catch (error) {
    console.error(error);
  }
}

function handleBreedImgLoad() {
  // adding image and removing loader
  breedImg.classList.add('show');
  loader.classList.remove('show');
}

init();
