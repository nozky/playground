'use strict';

const winner = document.querySelector(".winner");
const img = document.querySelector(".image");
const words = document.querySelector(".words");
const txtWord = document.querySelector(".txt-word");
const btnGuess = document.querySelector(".btn-guess");
const btnReveal = document.querySelector(".btn-reveal")
const lblGameOver = document.querySelector('.game-over');

// global variable
let missed=0;
let secretWord;
let arrayLength = 178187;
let winStat = false;



// Im not sure if this really help dealing CORS. 
let requestOptions = {
  method: 'GET',
  redirect: 'follow',
  credentials: 'same-origin',
  Headers: { "content-type": "text/plain;charset=UTF-8" }
};


btnGuess.addEventListener('click', () => {
  guess();
})

btnReveal.addEventListener('click', ()=> {
  reveal();
})



// fuctions
const getWord = async ()=>{
  const response = await fetch('https://random-word-api.herokuapp.com/all', requestOptions );
  const data = await response.json();
  secretWord = data[Math.floor(Math.random() * 178187 + 1)]
  alert('READY!')
  gameStart();
}


// display letters and replay elemant with *
const gameStart = ()=> {
  [...secretWord].map( letter => {
    let newEl = document.createElement('h3');
    newEl.innerText = "*";
    words.appendChild(newEl)
  })
}


// finding out if letter exist.
const guess = ()=>{
  let isFound = false;

  [...secretWord].forEach( (el, index) => {
    if (el == txtWord.value){
      changeChar(el,index);
      isFound=true;
    }
    // check game stat
    console.log(secretWord)
    isWin();
    gameOver();
  })
 
  // Check if letter exist
  if (!isFound){
    missed = missed + 1;
    changeImage();
  }
  
}

// change element value by index
const changeChar = (el, index)=>{
  words.children.item(index).innerHTML = el;
}


// change image
const changeImage = ()=>{
  
  switch (missed){
    case 1:
      img.src ="../images/Pix1.jpg";
      break;

    case 2:
      img.src ="../images/Pix2.jpg";
      break;

    case 3:
      img.src ="../images/Pix3.jpg";
      break;
    
    case 4:
      img.src ="../images/Pix4.jpg";
      break;
    
    case 5:
      img.src ="../images/Pix5.jpg";
      break;

    case 6:
    img.src ="../images/Pix6.jpg";
        
  }

  
}

// check if winning
const isWin = ()=>{
  console.log('checking.. is winning');
  let count = 0;
  
  [...secretWord].forEach((el,index) => {
    if(words.children.item(index).innerHTML === "*"){
      count = count + 1;
    }
  })

  console.log(count)
  if(count <= 0){
    console.log("Yahooo i won!");
    winner.classList.add('visible');
  }
}

// check if the game is over
const gameOver = ()=> {
  if(missed>=5){
    lblGameOver.classList.add('show');
    document.querySelector('.guess-container button').disabled = true;
  }
}

// reveal the letters
const reveal = ()=> {
  [...secretWord].forEach( (el, index) => {
      changeChar(el,index);     
    })
}


// get new word everytime you refresh
getWord();