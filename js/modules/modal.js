//Ф-я показа модал окна
function showModalWindow (modalSelector, modalTimer) { //аргумент будет тянуться из script.js
    const modalWindow = document.querySelector(modalSelector);
    
    modalWindow.classList.add('show');
    modalWindow.classList.remove('hide');
    document.body.style.overflow = 'hidden';//блокировка прокрутки
    if (modalTimer) { //если есть modalTimer, то запускаем очистку таймера
        clearInterval(modalTimer);//если пользователь нажал на связаться, то модал больше не появится
    }
}
// Ф-я скрытия модал
function closeModalWindow (modalSelector) { //аргумент будет тянуться из script.js
    const modalWindow = document.querySelector(modalSelector);
    
    modalWindow.classList.add('hide');
    modalWindow.classList.remove('show');
    document.body.style.overflow = '';// восстановление прокрутки, если пусто - браузер сам решит какое значение подставить
    // modalDialog.classList.add('show');
    // modalDialog.classList.remove('hide');
}

function modal(triggerSelector, modalSelector, modalTimer) {
    //3. Modal window
    const btnContact = document.querySelectorAll(triggerSelector),
          modalWindow = document.querySelector(modalSelector);
        //   modalDialog = document.querySelector('.modal__dialog');

    //Появление модал по клику на кнопки связаться
    btnContact.forEach(item => {
    item.addEventListener('click', () => showModalWindow(modalSelector, modalTimer)); //стрелочная ф-я для обертки showModalWindow. 
    //Пояснение правильный вариант: item.addEventListener('click', showModalWindow); - без вызова ф-ии, т.к ф-я вызывается только после клика. Вариант showModalWindow(modalSelector)  не подойдет, т.к. ф-я сразу вызовется не дожидаясь клика. Поэтому обернули в стрелочную ф-ю
    });



    //скрытие окна по закрытию модал окна по нажатию на пустую подложку и крестик
    modalWindow.addEventListener('click', (e) => {
    if(e.target === modalWindow || e.target.getAttribute('data-close') == "") { // при нажатии на класс modal или крестик (делегирование). data-close равен пустой строке, т.к. туда ничего не помещаем (нажал на крестик" и должно быть правдивым. Поэтому мы используем сравнение, что если getAttribute() возвращает пустую строку и оно равняется пустой строке - будет true, ак как атрибут data-close в HTML документе сам по себе не имеет никакого значения и "равен" пустоте, то и возвращает такой метод при клике на него пустоту
        closeModalWindow(modalSelector);  
    }
    });

    
    // Закрытие модал окна при нажатии Esc
    document.addEventListener('keydown', (e) => {
    if (e.code === "Escape" && modalWindow.classList.contains('show')) {//если нажата кнопка Esc и модал окно открыто, то
        closeModalWindow(modalSelector);  
    }
    });



    //Ф-я появления модалки после скрола до конца
    function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) { // если прокрученная часть + видимая часть >= полной прокрутке (т.е полному сайту), то покажи модалку
        showModalWindow(modalSelector, modalTimer);
        window.removeEventListener('scroll', showModalByScroll); // после срабатывания ф-ии - удаляем ее
    }
    }
    window.addEventListener('scroll', showModalByScroll); //{once:true} здесь не подходит, т.к. каждый скролл отменяет действие. Подходит для кликов
}
export default modal;
export {closeModalWindow}; //экспорт ф-ии закрытия окна
export {showModalWindow}; //экспорт ф-ии открытия окна