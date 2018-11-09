const BREEDS_URL = 'https://dog.ceo/api/breeds/list/all';
const RANDOM_BREED = "https://dog.ceo/api/breeds/image/random";
const select = document.querySelector('.breeds');
const imgTag = document.querySelector('.imgTag');
const logoTag = document.querySelector('.dogLogo');

function init() {
    // Load breeds into drop-down list
    loadDropDownList();
    loadDogPicture(RANDOM_BREED);
    select.addEventListener("change", function(event) {
        const breedURL = `https://dog.ceo/api/breed/${event.target.value}/images/random`;
       
        loadDogPicture(breedURL);
        
    });
    imgTag.addEventListener("load", function(event) {
        showPicture();
        
    })
}
function loadDropDownList() {
    fetch(BREEDS_URL).then(function(response) {
        return response.json();
    }).then(function(data) {
        let breedsObj = data.message;
        const breeds = Object.keys(breedsObj);
        for(let i = 0; i < breeds.length; i++) {
            let option = document.createElement('option');
            option.value = breeds[i];
            option.innerText = breeds[i].substr(0,1).toUpperCase() +  breeds[i].substr(1);
            select.appendChild(option);
        }
    });
}
function loadDogPicture(url) {
    showLogo();
    fetch(url).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data);
        let imgURL = data.message;
        imgTag.src = imgURL;

    });
    
}
function showLogo() {
    imgTag.classList.add('hide');
    logoTag.classList.remove('hide');
}
function showPicture() {
    logoTag.classList.add('hide');
    imgTag.classList.remove('hide');
}

init();