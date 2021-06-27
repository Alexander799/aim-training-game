const SCREENS = document.querySelectorAll('.screen');
const TIMER = SCREENS[2].querySelector('#time');
const BOARD = SCREENS[2].querySelector('#board');
const LEVEL_SIZES = [[10, 33], [33, 56], [56, 80], [10, 80]];
let size = [];
let time = 0;
let showingScreenNow = 0;
let score = 0;

SCREENS[0].addEventListener('click', event => {
   if (event.target.classList.contains('start')) {
      event.preventDefault();
      nextScreen();
   }
});

SCREENS[1].addEventListener('click', event => {
   if (event.target.classList.contains('time-btn')) {
      time = parseInt(event.target.getAttribute('data-time'));
   }
   if (event.target.classList.contains('size-btn')) {
      size = LEVEL_SIZES[parseInt(event.target.getAttribute('data-size'))];
      nextScreen();
      startGame();
   }
});

BOARD.addEventListener('click', event => {
   if (event.target.classList.contains('circle')) {
      event.target.remove();
      createRandomCircle();
      score++;
   }
})

function nextScreen(nextScreen = true) {
   if (nextScreen) {
      SCREENS[showingScreenNow].classList.add('up');
      showingScreenNow++;
   } else {
      SCREENS.forEach(elem => {
         elem.classList.remove('up');
      });
      showingScreenNow = 0;
   }
}

function startGame() {
   const DELETE_INTERVAL = setInterval(() => {
      if (time === 0) {
         clearInterval(DELETE_INTERVAL);
         endGame();
      } else {
         timer();
      }
   }, 1000);
   createRandomCircle();
}

function timer() {
   let current = time--;
   if (current < 10) {
      current = `0${current}`;
   }
   showCorrectTime(current);
}

function showCorrectTime(value) {
   if (value <= 5) {
      TIMER.style.color = '#f00';
   } else {
      TIMER.style.color = '#fff';
   }
   TIMER.innerHTML = `00:${value}`;
}

function createRandomCircle() {
   const CIRCLE = document.createElement('div');
   CIRCLE.classList.add('circle');
   const { width, height } = BOARD.getBoundingClientRect();
   const SIZE = randomNumber(size[0], size[1]);
   const x = randomNumber(0, width - SIZE);
   const y = randomNumber(0, height - SIZE);
   CIRCLE.style.width = `${SIZE}px`;
   CIRCLE.style.height = `${SIZE}px`;
   CIRCLE.style.top = `${y}px`;
   CIRCLE.style.left = `${x}px`;
   CIRCLE.style.background = `radial-gradient(circle, #ffffff 0%, ${getHEXRandomColor()} 50%, #000000 95%)`;

   BOARD.append(CIRCLE);
}

function randomNumber(min, max) {
   return Math.round(Math.random() * (max - min) + min);
}

function endGame() {
   BOARD.innerHTML = `<h2>Ваш счет: ${score}</h2>`;
   setTimeout(() => {
      nextScreen(false);
      BOARD.querySelector('h2').remove();
   }, 2500);
   score = 0;
}

function getHEXRandomColor() {
   const HEX_NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
   let hexCod = '';
   for (let i = 0; i < 6; i++) {
      const INDEX = Math.floor(Math.random() * (HEX_NUMBERS.length - 1));
      hexCod += HEX_NUMBERS[INDEX];
   }
   return `#${hexCod}`;
}