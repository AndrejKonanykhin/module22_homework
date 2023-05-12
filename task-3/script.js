// Задание 3
// получим кнопку
const button = document.querySelector('.click-me');

// получим div для вывода результата
const output = document.querySelector('#resultHTML');

// получим элемент для вывода разрешения экрана
const screen = document.querySelector('.screen');

// получим элемент для вывода координат
const place = document.querySelector('.place');

// функция, выводящая текст об ошибке
const error = () => {
  place.innerHTML = `<p>Невозможно получить ваше местоположение</p>`;
};

const success = (position) => {
  const { coords } = position;
  place.innerHTML = `<p>Ваше местоположение: широта - ${coords.latitude}°, долгота - ${coords.longitude}°</p>`;
};

const getUserScreenSize = () => {
  screen.innerHTML = `<p>Размеры вашего экрана: ${window.screen.width} х ${window.screen.height} пикселей</p>`;
};

// обработаем клик по кнопке
button.addEventListener('click', () => {
  // покажем наш блок вывода
  output.classList.add('visible');
  // выведем информацию об экране
  getUserScreenSize()
  // выведем информацию о местоположении
  navigator.geolocation.getCurrentPosition(success, error);
});
