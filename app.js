const main = document.querySelector('main');
const breedSelect = document.querySelector('.breed-list');
const breedImg = document.querySelector('.main-image');
const loader = document.querySelector('.loading-dog');

const BREED_LIST_URL = 'https://dog.ceo/api/breeds/list/all';
const RANDOM_BREED_IMG_URL = 'https://dog.ceo/api/breeds/image/random';

async function init() {
  addBreedList();
  addRandomImg();

  breedSelect.addEventListener('change', handleBreedChange);

  //   When Image loads, show the image and hide the spinner
  breedImg.addEventListener('load', function () {
    // adding image and removing loader
    breedImg.classList.add('show');
    loader.classList.remove('show');
  });
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

async function addRandomImg() {
  try {
    const response = await axios.get(RANDOM_BREED_IMG_URL);
    const randBreedImgUrl = response.data.message;

    breedImg.src = randBreedImgUrl;
  } catch (error) {
    console.error(error);
  }
}

async function handleBreedChange(e) {
  // removing image and adding loader
  breedImg.classList.remove('show');
  loader.classList.add('show');

  const breed = e.target.value;
  const IMG_BY_BREED_URL = `https://dog.ceo/api/breed/${breed}/images/random`;
  try {
    const response = await axios.get(IMG_BY_BREED_URL);
    const breedImgUrl = response.data.message;

    breedImg.src = breedImgUrl;
  } catch (error) {
    console.error(error);
  }
}

init();
