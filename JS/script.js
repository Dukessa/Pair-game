window.addEventListener('DOMContentLoaded', () => {

  const BUTTON_START = document.getElementById('form__btn-start');
  const BUTTON_STANDART = document.querySelector('.start-cleaner');
  const BUTTON_FINISH = document.getElementById('form__btn-finish');
  const INPUT_H = document.getElementById('input-h');
  const INPUT_V = document.getElementById('input-v');
  const FORM_BOX = document.querySelector('.form');
  const PCT = document.querySelectorAll('.pct');
  const TIMER = document.querySelector('.timer');

  let containerCards;
  let boxCard;
  let card;
  let i;
  let a;
  let x;
  let second;

  let arr = [];
  let copiArr = [];
  let resultArr = [];

  function timer(s) {
    TIMER.innerHTML = (s);
    second = setInterval( () => {
      if (TIMER.innerHTML > 0) {
        x = Number(TIMER.innerHTML) - 1;
        console.log(x);
        TIMER.innerHTML = x;
      }
    if (TIMER.innerHTML == 0) {
      document.querySelector('.box-button_finish').classList.add('box-button-js');
      document.querySelector('.timer-over').classList.add('title-color-js');
      document.querySelector('.game-over').classList.remove('title-color-js');
      clearInterval(second);
      TIMER.innerHTML = 60;
    }
    if (document.querySelectorAll('.form-js').length === 1) {
      clearInterval(second);
      TIMER.innerHTML = 60;
    }
    if (document.querySelectorAll('.box-button-js').length === 1) {
      clearInterval(second);
      TIMER.innerHTML = 60;
    }
  }, 1000);
  };

  function choiceForm() {
    FORM_BOX.classList.add('form-js');
    PCT.forEach((e) => {
      e.addEventListener('click', function buttonClick() {
        if (document.querySelectorAll('.pct-js').length < 1) {
          e.classList.add('pct-js');
          x = document.querySelector('.pct-js').classList[1];
        } else {
          PCT.forEach((e) => {
            e.classList.remove('pct-js');
          });
        }
      });
    });
  };

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; --i) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    };
  };

  function standart() {
    for (a = 8; a > 0; --a) {
      arr.push(a);
      copiArr.push(a);
      resultArr = arr.concat(copiArr);
      shuffle(resultArr);
    };

    for (i = 16; i > 0; --i) {
      x = 'standart';
      createCards();
    };
    game();
  };

  function createCards() {
    containerCards = document.getElementById('container-cards');
    boxCard = document.createElement('div');
    card = document.createElement('button');

    boxCard.classList.add('box__card');
    card.classList.add('card');
    card.classList.add(''+ x +'');

    boxCard.textContent = resultArr[i - 1];

    containerCards.append(boxCard);
    boxCard.append(card);
  };

  BUTTON_STANDART.addEventListener('click', () => {
    FORM_BOX.classList.remove('form-js');
    timer(60);
  });

  BUTTON_START.addEventListener('click', () => {
    if (INPUT_H.value >= 2 && INPUT_H.value <= 10 && INPUT_H.value !== '' && INPUT_V.value >= 2 && INPUT_V.value <= 10 && INPUT_V.value !== '') {
      PCT.forEach((e) => {
        e.classList.remove('pct-js');
      });
      timer(60);
      arr.length = 0;
      copiArr.length = 0;
      resultArr.length = 0;
      let remuveCards = document.querySelectorAll('.box__card');
      remuveCards.forEach(e => e.remove());

      let horizontal = INPUT_H.value;
      let vertical = INPUT_V.value;

      i = horizontal * vertical;
      a = i / 2;

      if ((Math.floor(i / 2)) !== (i / 2)) {
        alert('Нечетное количество карточек. Исправь!');
        INPUT_H.value = '';
        INPUT_V.value = '';
        PCT.forEach((e) => {
          e.classList.remove('pct-js');
        });
        standart();
        return;
      }

      for (; a > 0; --a) {
        arr.push(a);
        copiArr.push(a);
        resultArr = arr.concat(copiArr);
        shuffle(resultArr);
      }

      while (i > 0) {
        createCards();
        --i;
      }
      game();

      containerCards.style['grid-template-columns'] = 'repeat(' + horizontal + ', minmax(15px, 90px))';
      containerCards.style['grid-template-rows'] = 'repeat(' + vertical + ', minmax(15px, 90px))';
      FORM_BOX.classList.remove('form-js');

    } else if (INPUT_H.value < 2 || INPUT_V.value < 2) {
      alert('Карточек должно быть больше.');
      INPUT_H.value = '';
      INPUT_V.value = '';
      PCT.forEach((e) => {
        e.classList.remove('pct-js');
      });

    } else if (INPUT_H.value > 10 || INPUT_V.value > 10) {
      alert('Карточек должно быть меньше.');
      INPUT_H.value = '';
      INPUT_V.value = '';
      PCT.forEach((e) => {
        e.classList.remove('pct-js');
      });
    };
  });

  BUTTON_FINISH.addEventListener('click', () => {
    FORM_BOX.classList.add('form-js');
    PCT.forEach((e) => {
      e.classList.remove('pct-js');
    });
    arr.length = 0;
    copiArr.length = 0;
    resultArr.length = 0
    INPUT_H.value = '';
    INPUT_V.value = '';
    let remuveCards = document.querySelectorAll('.box__card');
    remuveCards.forEach(e => e.remove());

    standart();
    containerCards.style['grid-template-columns'] = 'repeat(4, minmax(15px, 90px))';
    containerCards.style['grid-template-rows'] = 'repeat(4, minmax(15px, 90px))';
    document.querySelector('.box-button_finish').classList.remove('box-button-js');
    document.querySelector('.game-over').classList.remove('title-color-js');
  });

  function game() {
    let cards = document.querySelectorAll('.card');
    let arrTest = [];

    cards.forEach((e) => {
      e.addEventListener('click', () => {
        e.classList.add('card-js');

        if (document.querySelectorAll('.card').length === document.querySelectorAll('.card-js').length) {
          document.querySelector('.box-button_finish').classList.add('box-button-js');
          document.querySelector('.game-over').classList.add('title-color-js');
        }

        if (arrTest.length < 2) {
          let boxCard = e.closest('.box__card');
          arrTest.push(boxCard.textContent);
          e.id = arrTest.length - 1;
          e.disabled = true;

          if (arrTest.length == 2 && arrTest[0] !== arrTest[1]) {
            setTimeout(() => {
              document.getElementById(0).classList.remove('card-js');
              document.getElementById(0).disabled = false;
              document.getElementById(1).classList.remove('card-js');
              document.getElementById(1).disabled = false;
              cards.forEach((element) => {
                element.removeAttribute('id');
              });
            }, 300);

            arrTest.length = 0;

          } else if (arrTest[0] == arrTest[1]) {
            cards.forEach((element) => {
              element.removeAttribute('id');
            });
            arrTest.length = 0;
          };
        };
      });
    });
  };
  standart();
  choiceForm();
});
