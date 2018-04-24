const lang = {
  en: "qwertyuiop[]asdfghjkl;'zxcvbnm,./"
};

//Делаем из строки массив
const arr = lang.en.split('');

//Делаем объект клавиатурных строк
let keyboardRows = {top: [], middle: [], bottom: []};

//Проходимся циклом по массиву arr, и записываем
//букву в необходимою строку для клавиатуры
arr.forEach(function(element) {
  let Str1 = lang.en.slice(0,12);
  let Str2 = lang.en.slice(12,23);
  let Str3 = lang.en.slice(23,lang.en.length);
  keyboardRows.top = Str1.split('');
  keyboardRows.middle = Str2.split('');
  keyboardRows.bottom = Str3.split('');
});
console.log(keyboardRows)

//Массив звуков для клавиатуры
const keyboardNote = [
  {
    note: 'do',
      codes: [81, 221, 65, 90, 191, 32]
  },
  {
    note: 're',
    codes: [87, 219, 83, 222, 88, 190]
  },
  {
    note: 'mi',
    codes: [69, 80, 68, 186, 67, 188]
  },
  {
    note: 'fa',
    codes: [82, 79, 70, 76, 86, 77]
  },
  {
    note: 'sol',
    codes: [84, 73, 71, 75, 66, 78]
  },
  {
    note: 'la',
    codes: [89, 85, 72, 74]
  }
  ]

//Функция воспроизведения звука при нажатии
const playSound = note => {
  const audio = document.querySelector(`audio[data-note=${note}]`);
  audio.currentTime = 0;
  audio.play();
};

const html = document.querySelector("#keyboard-template").textContent.trim();
//Выбираем блок по id для вставки шаблона клавиатуры
const keyboard = document.querySelector('#block')

//Функция рендера клавиатуры
const render = (template, row, container) => {
  template = '<div class="slideThree">\
 <input type="checkbox" value="None" id="slideThree" name="check" checked />\
 <label for="slideThree"></label>\
 <span class="sound">Sound</span>\
 </div>\
  <div class="keyboard">\
 <%Object.keys(keyboardRows).map((index) =>{%>\
  <div>\
  <%keyboardRows[index].forEach((item) => { %>\
    <button class="btn"><%- item %></button>  <%})%>\
    </div> <%})%>\
    <button class="btn btn_space">SPACE</button>\
    </div>'; 
    const compile = _.template(template);
    const make = compile(keyboardRows)
    container.innerHTML = make; 
};
render(html, keyboardRows, keyboard);

//Выбираем все кнопки
const button = document.querySelectorAll('button');

//Вешаем слушателя на собитие keydown
window.addEventListener('keydown', function(event){
   let code = event.keyCode;
      //Подсветка кнопки
      for (let i = 0; i < button.length; i++) {
        if(event.key.toUpperCase() == button[i].innerText) {
          button[i].classList.add('active');
        } else if(event.key == ' '){
          button[button.length - 1].classList.add('active');
        }
      }
      //Воспроизведение звука
      for (let i = 0; i < keyboardNote.length; i++){
        keyboardNote[i].codes.filter(function (number) {
          if (number == code && document.querySelector('#slideThree').checked === true){
            playSound(keyboardNote[i].note)
          }
        })
      } 

  });

//Вешаем слушателя на событие keyup и снимаем класс подсветки
window.addEventListener('keyup', function(event){
    for(let i = 0; i < button.length; i++)
    button[i].classList.remove('active');
});

