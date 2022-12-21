'use strict';
window.addEventListener('DOMContentLoaded', () => {

// 1. TABS
    // 1) Создаем переменные с которыми будем работать
let tabs = document.querySelectorAll('.tabheader__item'), //непосредственно сами табы
    tabsContent = document.querySelectorAll('.tabcontent'), // переключаемый контент
    tabsParent = document.querySelector('.tabheader__items'); // родитель табов
// Функция для скрытия ненужных элементов
function hideTabContent() {
    tabsContent.forEach(item => { //перебор элементов
        item.classList.add('hide'); 
        item.classList.remove('show', 'fade');
    });
    // Убираем класс активности с таба
    tabs.forEach(item => {
        item.classList.remove('tabheader__item_active');
    });
}

// Функция для показа элементов
function showTabContent(i = 0) { // ставим 0 по умолчанию, чтобы вначале был 1-й таб
    tabsContent[i].classList.add('show', 'fade'); //i - индекс массива
    tabsContent[i].classList.remove('hide');
    
    tabs[i].classList.add('tabheader__item_active'); // доб-е класса активности
    }
    hideTabContent(); // вызов функций
    showTabContent();

// Обработчик событий клика
    tabsParent.addEventListener('click', (e) => { 
    if (e.target && e.target.classList.contains('tabheader__item')) { //делегирование события, клик по табу
        tabs.forEach((item, i) => { //перебор, передача 2-х элементов (item - каждый таб кот-й перебираем, i - номер элемента по порядку который перебираем) 
            if (e.target == item){ // если e.target, тот элемент, на который мы кликнули совпадает с элементом, который перебираем в цикле forEach, то вызываем ф-ии ниже 
                hideTabContent();
                showTabContent(i); //i - номер того элемента, кот-й в этом условии совпал               
            }
        });         
    }
}); //т.е кликнули на 3 таб, начинается перебор элементов и третий таб, это тот таб на который кликнул пользователь

// 2. Timer
const deadline = '2022-12-31'; // дата дедлайна, кот-ю будет устанавливать админ сайта
// Ф-я вычисления дней, часов и т.д.
function getTimeRemaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date()), // вычитание миллисек от дедлайна тек. даты
        days = Math.floor(t / (1000 * 60 * 60 * 24)), // расчет кол-ва дней. Math.floor() - округление в меньш. сторону
        hours = Math.floor((t / (1000 * 60 * 60) % 24)), //вычисляем остаток часов с помощью %
        minutes = Math.floor((t / 1000 / 60) % 60), // аналогично выше
        seconds = Math.floor((t / 1000) % 60); // аналогично выше
        if(t <= 0) { // для того чтобы было 00:00 после окончания акции
            // days = 0;
            // hours = 0;
            // minutes = 0;
            // seconds = 0;
            
        }

       return { //возврат переменных наружу в виде объекта
        'total' : t, // общее кол-во мс, нужно в будущем чтобы недопустить отриц. значение (под это будет ф-я updateClock())
        'days' : days, // возврат наружу полученных значений
        'hours' : hours,
        'minutes' : minutes,
        'seconds' : seconds
       }; 
}
//Ф-я для добавления 0 перед 1 - 9
function getZero(num) { 
    if (num >=0 && num < 10) {
        return `0${num}`;
    } else {
        return num;
    }
}
// Ф-я устанавливающая таймер непосредственно на страницу
function setClock (selector, endtime) { //selector-глав. элемент, в будущ. это будет '.timer'
    const timer = document.querySelector(selector), // selector передали из аргумента ф-ии setClock 
          days = timer.querySelector('#days'), // вытягиваем id из страницы html
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timeInterval = setInterval(updateClock, 1000); // для обновления таймера каждую секунду, ф-я updateClock(), кот-ю записали ниже будет запускаться каждую 1000мс, т.е. 1 сек

          updateClock(); // вызов ф-ии пораньше, чтобы она запустилась быстрее. Не ждать 1000 сек. Ф-я инициализации

    // Ф-я обновляющая таймер каждую секунду      
    function updateClock() {
        const t = getTimeRemaining(endtime); //назначаем на t, объект, полученный в рез-те ф-ии getTimeRemaining(), endtime-дедлайн, кот-й будем передавать

        days.innerHTML = getZero(t.days); //помещаем в id ='days'(#days) с помощью innerHTML дни из объекта t, созданного выше 
        hours.innerHTML = getZero(t.hours); // аналогично вышему
        minutes.innerHTML = getZero(t.minutes); // исп-м getZero для добавления 0 перед 1-9
        seconds.innerHTML = getZero(t.seconds);

        if (t.total <= 0) {
            clearInterval(timeInterval); // если total меньше или равно нуля, стоп таймер с помощью clearInterval
        }
    }
}
setClock ('.timer', deadline); //вызов ф-ии

//3. Modal window
const btnContact = document.querySelectorAll('[data-modal]'),
      closeModalBtn = document.querySelector('[data-close]'),
      modalWindow = document.querySelector('.modal');
    
      
    //Ф-я показа модал окна
    function showModalWindow () {
        modalWindow.classList.toggle('show');
        document.body.style.overflow = 'hidden';//блокировка прокрутки
        clearInterval(modalTimer);//если пользователь нажал на связаться, то модал больше не появится
    }
    // Ф-я скрытия модал
    function closeModalWindow () {
        modalWindow.classList.toggle('show');
        document.body.style.overflow = '';// восстановление прокрутки, если пусто - браузер сам решит какое значение подставить
    }
    //Появление модал по клику на кнопки связаться
    btnContact.forEach(item => {
        item.addEventListener('click', showModalWindow);
      });

    //скрытие окна по закрытию модал окна по нажатию на пустую подложку
    modalWindow.addEventListener('click', (e) => {
        if(e.target === modalWindow) { // при нажатии на класс modal
            closeModalWindow();  
        }
    });

    // Закрытии модал окна при нажатии на крестик        
    closeModalBtn.addEventListener('click', closeModalWindow);
    
    // Закрытие модал окна при нажатии Esc
    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modalWindow.classList.contains('show')) {//если нажата кнопка Esc и модал окно открыто, то
            closeModalWindow();  
        }
    });
      
    // Появление модал окна после некоторого времени
    const modalTimer = setTimeout(showModalWindow, 15000);

    //Ф-я появления модалки после скрола до конца
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) { // если прокрученная часть + видимая часть >= полной прокрутке (т.е полному сайту), то покажи модалку
            showModalWindow();
            window.removeEventListener('scroll', showModalByScroll); // после срабатывания ф-ии - удаляем ее
        }
    }
    window.addEventListener('scroll', showModalByScroll); //{once:true} здесь не подходит, т.к. каждый скролл отменяет действие. Подходит для кликов
    
//4. Создание класса для карточек меню
class MenuCard {
    constructor (src, alt, title, descr, price, parentSelector) { 
        this.src = src; //ссылку на картинку
        this.alt = alt; //alt картинки
        this.title = title; //тайтл
        this.descr = descr; // описание
        this.price = price; //цена в гривнах
        this.parent = document.querySelector(parentSelector); //вытаскивание родителя элемента
        this.transfer = 36.77; // для конвертации доллара в гривны
        this.changeToUAH(); // вызов ф-ии для получения актуального price
    }
    changeToUAH() { // ф-я конвертации
        this.price = +Math.floor(this.price * this.transfer);
    }
    render() { // ф-я добавления на страницу
        const elementMenu = document.createElement('div'); //создание элемента с тегом div
        elementMenu.innerHTML = ` 
        <div class="menu__item">
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
        </div>`; //добавляемый код
        this.parent.append(elementMenu); //добавление ElementMenu в конец родителя parent
    }    
}
new MenuCard( // добавление карточек в меню
    "img/tabs/vegy.jpg",
    "fresh",
    'Меню "Фреш"',
    'Меню "Фреш" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    '10',
    '.menu .container'
).render(); //не забываем добавить метод render

new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    'Меню "Пальма"',
    'Меню "Пальма" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    '15',
    '.menu .container'
).render(); 

new MenuCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Диетическое"',
    'Меню "Диетическое" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    '20',
    '.menu .container'
).render(); 
      






});