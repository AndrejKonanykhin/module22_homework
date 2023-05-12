// Задание 4
// получим кнопку
const button = document.querySelector('.click-me');

// получим div для вывода данных
const output = document.querySelector('.result');

// функция показывает сообщение об ошибке при запрете определения местоположения
const error = () => {
  output.classList.add('visible');
  output.innerHTML = `<p>Невозможно получить ваше местоположение</p>`;
}

// функция обрабатывает полученные координаты и отправляет запрос временной зоны/времени по этим координатам
const success = async (position) => {
  const coords = position.coords;
      const requestResult = await useRequest(coords);
      // используем async/await для запроса, иначе функция getTimeZone() 
      // отработает, не дождавшись получения координат и выведется пустой результат
      getTimeZone(requestResult);
}

// функция отправки запроса даты/времени возвращает объект локальной даты/времени  
const useRequest = (obj) => {
  // получаем данные координат из геолокации
  const latitude = obj.latitude;
  const longitude = obj.longitude;
  // и подставляем их в запрос
  return (
    fetch(
      `https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat=${latitude}&long=${longitude}`
    )
      // получаем и обрабатываем json
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        return json;
      })
      .catch(() => {
        // в случае ошибки запроса, выводим сообщение об ошибке
        output.classList.add('visible');
        output.innerHTML = `
        <p class="warning">
        Ошибка запроса
        </p>
        `;
      })
  );
};

// функция, которая обрабатывает объект из запроса даты/времени и показывает результат
const getTimeZone = (data) => {
  // очищаем блок вывода данных
  output.innerHTML = '';
  // получаем и выводим данные из объекта
  const timezone = data.timezone;
  const localDate = data.date_time_txt;
  output.classList.add('visible');
  output.innerHTML = `<p>Временная зона: ${timezone}, местные дата и время: ${localDate}</p>`;
};

// добавляем обработчик на кнопку
button.addEventListener('click', () => {
  // если есть доступ к геолокации
  if ('geolocation' in navigator) {
    // запрашиваем данные геолокации 
    navigator.geolocation.getCurrentPosition(success, error);
    // если геолокация недоступна показываем сообщение об ошибке
  } else {
    output.classList.add('visible');
    output.innerHTML = `<p>Geolocation не поддерживается вашим браузером</p>`;
  }
});
