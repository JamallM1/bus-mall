'use strict';

// Global Variable

let voteNumb = 25;
let busMall = [];

//DOM References

let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');

let showResultsBtn = document.getElementById('show-results-btn');
let resultsList = document.getElementById('results-list');


//constructor

function Bus(name, fileExtension = 'jpeg') {
  this.name = name;
  this.views = 0;
  this.votes = 0;
  this.photo = `img/${name}.${fileExtension}`;

  busMall.push(this);

}

new Bus('bag');
new Bus('banana');
new Bus('bathroom');
new Bus('boots');
new Bus('breakfast');
new Bus('bubblegum');
new Bus('chair');
new Bus('cthulhu');
new Bus('dog-duck');
new Bus('dragon');
new Bus('pen');
new Bus('pet-sweep');
new Bus('scissors');
new Bus('shark');
new Bus('sweep', 'png');
new Bus('tauntaum');
new Bus('unicorn');
new Bus('water-can');
new Bus('wine-glass');

//Helper Functions

function getRandomIndex() {
  return Math.floor(Math.random() * busMall.length);
}
function renderImgs() {

  let busOneIndex = getRandomIndex();
  let busTwoIndex = getRandomIndex();
  let busThreeIndex = getRandomIndex();

  while (busOneIndex === busTwoIndex) {
    busTwoIndex = getRandomIndex();
  }
  while (busTwoIndex === busThreeIndex) {
    busThreeIndex = getRandomIndex();
  }
  while (busThreeIndex === busOneIndex) {
    busOneIndex = getRandomIndex();
  }

  imgOne.src = busMall[busOneIndex].photo;
  imgOne.alt = busMall[busOneIndex].name;
  busMall[busOneIndex].views++;

  imgTwo.src = busMall[busTwoIndex].photo;
  imgTwo.alt = busMall[busTwoIndex].name;
  busMall[busTwoIndex].views++;

  imgThree.src = busMall[busThreeIndex].photo;
  imgThree.alt = busMall[busThreeIndex].name;
  busMall[busThreeIndex].views++;

  if (voteNumb === 0) {
    imgContainer.removeEventListener('click', handleClick);
  }
}
renderImgs();



//Event Handlers
function handleClick(event) {
  voteNumb--;

  let imgClicked = event.target.alt;

  for (let i = 0; i < busMall.length; i++) {
    if (imgClicked === busMall[i].name) {
      busMall[i].votes++;
    }

  }
  renderImgs();
}
function handleShowResults() {
  if (voteNumb === 0) {
    for (let i = 0; i < busMall.length; i++) {
      let liElement = document.createElement('li');
      liElement.textContent = `${busMall[i].name} was shown ${busMall[i].views} times and voted for ${busMall[i].votes} times.`;
      resultsList.appendChild(liElement);
    }
  }
}

imgContainer.addEventListener('click', handleClick);
showResultsBtn.addEventListener('click', handleShowResults);
