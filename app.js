'use strict';

// Global Variable

let voteNumb = 25;
let busMall = [];

let checkArr = [];

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
new Bus('tauntaun');
new Bus('unicorn');
new Bus('water-can');
new Bus('wine-glass');

//Helper Functions

function getRandomIndex() {
  return Math.floor(Math.random() * busMall.length);
}
function renderImgs() {
  while(checkArr.length < 6){
    let num = getRandomIndex();
    if(!checkArr.includes(num)){
      checkArr.push(num);
    }
  }

  // let busOneIndex = getRandomIndex();
  // let busTwoIndex = getRandomIndex();
  // let busThreeIndex = getRandomIndex();

  // while (busOneIndex === busTwoIndex) {
  //   busTwoIndex = getRandomIndex();
  // }
  // while (busTwoIndex === busThreeIndex) {
  //   busThreeIndex = getRandomIndex();
  // }
  // while (busThreeIndex === busOneIndex) {
  //   busOneIndex = getRandomIndex();
  // }

let busOneIndex = checkArr.shift();
let busTwoIndex = checkArr.shift();
let busThreeIndex = checkArr.shift();

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
  //my charts
}
function renderChart() {


  let name = [];
  let votes = [];
  let views = [];

  for (let i = 0; i < busMall.length; i++) {

    name.push(busMall[i].name);
    votes.push(busMall[i].votes);
    views.push(busMall[i].views);
  }
  let ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: name,
      datasets: [{
        label: '# of Votes',
        data: votes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1
      },
      {
        label: '# of Views',
        data: views,
        backgroundColor: [
          'rgba(155, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(155, 99, 132, 1)',
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

function handleShowResults() {
  if (voteNumb === 0) {
    renderChart();
    for (let i = 0; i < busMall.length; i++) {
      let liElement = document.createElement('li');
      liElement.textContent = `${busMall[i].name} was shown ${busMall[i].views} times and voted for ${busMall[i].votes} times.`;
      resultsList.appendChild(liElement);
    }
  }
}

imgContainer.addEventListener('click', handleClick);
showResultsBtn.addEventListener('click', handleShowResults);