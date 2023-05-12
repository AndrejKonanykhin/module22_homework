// Задание 2
// получим кнопку
const button = document.querySelector('.click-me');

// получим divы с иконками
const btn_icon_1 = document.querySelector('.btn_icon_1');
const btn_icon_2 = document.querySelector('.btn_icon_2');

button.addEventListener('click', () => {
    btn_icon_1.classList.toggle('visible');
    btn_icon_2.classList.toggle('visible');
})