// Задание 5
// получим поле ввода, кнопки и область для вывода сообщений
const input = document.querySelector('#input');
const sendButton = document.querySelector('#send');
const geoButton = document.querySelector('#geo');
const notice = document.querySelector('.notice');
const output = document.querySelector('.chat-output');

// создадим новое подключение
let websoket;

// функция выводит сообщения от сервера или уведомления об ошибках на экран
// принимает сообщение, класс, применяемый к тексту сообщения, блок, где нужно вывести сообщение
function writeOnScreen(message, style, node) {
  let text = document.createElement('p');
  text.innerHTML = `<span>${message}</span>`;
  text.classList.add(style);
  node.appendChild(text);
}

// функция показывает сообщение об ошибке при запрете определения местоположения
const error = () => {
  notice.innerHTML = '';
  writeOnScreen('Не удалось определить местоположение!', 'warning', notice);
};

// функция обрабатывает полученные координаты
const success = (position) => {
  const { coords } = position;
  // формируем ссылку с полученными координатами
  const link = `https://www.openstreetmap.org/#map=18/${coords.latitude}/${coords.longitude}`;
  // создаем сообщение
  const message = `<a target="_blanc" href="${link}">Геолокация</a>`;
  // отправляем сообщение и выводим на экран
  websocket.send(message);
  writeOnScreen(message, 'request', output);
  // получим результат запроса от эхо-сервера
  websocket.onmessage = function (event) {
    // ответ выведем в консоль
    console.log(event.data);
    // ответ в чате скрываем, используя класс hidden
    writeOnScreen(event.data, 'hidden', output);
  };
};

// при загрузке страницы установим соединение с эхо-сервером
document.addEventListener('DOMContentLoaded', () => {
  websocket = new WebSocket('wss://echo-ws-service.herokuapp.com/');
  // выведем сообщение об успешном соединении
  websocket.onopen = function (event) {
    writeOnScreen('Соединение установлено', 'connect', notice);
  };
  // выведем сообщение, если соединение не установилось
  websocket.onerror = function (event) {
    writeOnScreen('Сбой соединения', 'warning', notice);
  };
});

// длбавляем обработчик на кнопку отправки сообщений
sendButton.addEventListener('click', () => {
  // если поле ввода пустое, предупреждаем
  if (!input.value) {
    notice.innerHTML = '';
    writeOnScreen('Введите текст сообщения!', 'warning', notice);
  } else {
    // очищаем уведомления об ошибках
    notice.innerHTML = '';
    // отправляем сообщение на эхо-сервер с текстом из поля ввода
    const message = input.value;
    websocket.send(message);
    // выводим сообщение в блоке вывода
    writeOnScreen(message, 'request', output);
    // обрабатываем получение сообения от сервера, выводим на экран
    websocket.onmessage = function (event) {
      writeOnScreen(event.data, 'response', output);
    };
  }
});

// ставим обработчик на кнопку геолокации
geoButton.addEventListener('click', () => {
  // очищаем блок уведомлений
  notice.innerHTML = '';
  // запрашиваем и обрабатываем координаты
  navigator.geolocation.getCurrentPosition(success, error);
});
