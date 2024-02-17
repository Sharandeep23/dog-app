const main = document.querySelector('main');
const breedSelect = document.querySelector('.breed');
const img = document.querySelector('.main-image');
const loader = document.querySelector('.loading-dog');

const BREED_LIST_URL = 'https://dog.ceo/api/breeds/list/all';

function init() {
  // Breed list for the select
  populateSelect(BREED_LIST_URL);

  // When a breed is selected, hide the img, show the spinner, get the breed img, add it to the DOM.
  breedSelect.addEventListener('change', handleBreedChange);

  // When Image loads, show the image and hide the spinner/loader
  img.addEventListener('load', handleImgLoad);
}

async function populateSelect(url) {
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

async function handleBreedChange(e) {
  const breed = e.target.value;

  // For empty strings, ignore
  if (breed === '') return;

  const IMG_BY_BREED_URL = `https://dog.ceo/api/breed/${breed}/images/random`;

  // changing option should hide image and show the spinner/loader
  img.classList.remove('show');
  loader.classList.add('show');

  try {
    const response = await axios.get(IMG_BY_BREED_URL);
    const breedImgUrl = response.data.message;

    // This line doesn't add the image instantly
    img.src = breedImgUrl;
  } catch (error) {
    console.error(error);
  }
}

function handleImgLoad() {
  // adding image and removing loader
  img.classList.add('show');
  loader.classList.remove('show');
}

init();
