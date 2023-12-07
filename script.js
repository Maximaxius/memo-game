const arrImgDef = ['img/1card.png', 'img/2card.png', 'img/3card.png', 'img/4card.png', 'img/5card.png', 'img/6card.png', 'img/7card.png', 'img/8card.png']
const arrImgLang = ['img/lang/1.png', 'img/lang/2.png', 'img/lang/3.png', 'img/lang/4.png', 'img/lang/5.png', 'img/lang/6.png', 'img/lang/7.png', 'img/lang/8.png']

function createGame() {
  let board = document.createElement('section')
  board.classList.add('mem-game')

  const form = document.getElementById("level");
  let num = form.elements["complexity"].value / 2;
  const choseImg = document.getElementById("image");

  for (let i = 0; i < num; i++) {
    for (let j = 0; j < 2; j++) {
      let card = document.createElement('div')
      card.classList.add('mem-card')
      card.id = i;

      let front = document.createElement('img')
      switch (choseImg.elements["img"].value) {
        case "arrImgDef":
          front.src = arrImgDef[i];
          break;
        case "arrImgLang":
          front.src = arrImgLang[i];            
          break;
      }
      front.classList.add('front-face')

      let back = document.createElement('img')
      back.src = (`img/back.jpg`);
      back.classList.add('back-face')

      card.appendChild(front);
      card.appendChild(back);

      board.appendChild(card)
    }
  }
  document.body.appendChild(board)
  let start = document.getElementById('start');
  start.style.display = 'none';

  let radio = document.getElementById('level');
  radio.style.display = 'none';
  
  let image = document.getElementById('image');
  image.style.display = 'none';

  let playWithMove = document.getElementById('playWithMove');
  playWithMove.style.display = 'none';

  let time = document.createElement('div')
  time.id = ('time')
  document.body.appendChild(time)
  setInterval(timer, 1000);
  

  let countMoves = 0;
  let move = document.createElement('div');
  move.id = ('moves');
  if (playWithMoveInp.checked) {
    var moveOut = num + num;
    move.innerText = `осталось ходов ${moveOut} `
  }
  else move.innerText = `ходов сделано ${countMoves} `
  document.body.appendChild(move);

  const cards = document.querySelectorAll('.mem-card');

  let flipedCard = false;
  let lockBoard = false;
  let firstCard, secondCard;

  function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!flipedCard) {
      flipedCard = true;
      firstCard = this;
      return;
    }

    secondCard = this;      
    lockBoard = true;

    checkEquality();
    checkMoves();
    checkFinish();
  }

  function checkEquality() {
    let isMatch = firstCard.id === secondCard.id;
    isMatch ? disableCards() : unflipedCards();
  }

  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
  }

  function unflipedCards() {
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      resetBoard();
    }, 1000);
  }

  function resetBoard() {
    flipedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
  }

  (function randPos() {
    cards.forEach(card => {
      let ramdomPos = Math.ceil(Math.random() * form.elements["complexity"].value);
      card.style.order = ramdomPos;
    });
  })();

  cards.forEach(card => card.addEventListener('click', flipCard));

  function checkFinish() {
    let size = cards.length
    for (let i = 0; i < cards.length; i++) {
      if (cards[i].classList == "mem-card flip")
        size--;
    }
    if (size == 0) {
      setTimeout(() => {
        alert(`Вы выйграли за ${time.innerText} и сделали ${countMoves} ходов`);
        location.reload()
      }, 1100);
    }
  }

  function checkMoves() {
    countMoves++;
    if (playWithMoveInp.checked) {
      moveOut--;
      move.innerText = `осталось ходов ${moveOut}`;
      if (moveOut == 0) {
        setTimeout(() => {
          alert(`Вы проиграли ваши ходы закончились :(`);
          location.reload()
        }, 1100);
      }
    }
    else move.innerText = `ходов сделано ${countMoves}`;

  }
}


start.addEventListener("click", function () {
  createGame();
})


var sec = 0;
var min = 0;

function timer() {
  sec++;
  if (sec == 60) {
    sec = 0;
    min++;
  }
  time.innerText = `${min}:${sec}`
}


let bodyNow = document.body;
let changeTheme = document.getElementById("changeTheme")

function darkLight() {
  if (bodyNow.className != "theme-dark") {
    bodyNow.className = "theme-dark";
    changeTheme.innerHTML = "Включить светлую тему";
  }
  else {
    bodyNow.className = "theme-light";
    changeTheme.innerHTML = "Включить тёмную тему";
  }
  localStorage.setItem("theme", bodyNow.className);
}

document.addEventListener("DOMContentLoaded", () => {
  let savedTheme = localStorage.getItem("theme");
  bodyNow.className = savedTheme;
})