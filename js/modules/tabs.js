function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    // 1. TABS

    // 1) Создаем переменные с которыми будем работать
    let tabs = document.querySelectorAll(tabsSelector), //непосредственно сами табы
    tabsContent = document.querySelectorAll(tabsContentSelector), // переключаемый контент
    tabsParent = document.querySelector(tabsParentSelector); // родитель табов
    // Функция для скрытия ненужных элементов
    function hideTabContent() {
    tabsContent.forEach(item => { //перебор элементов
        item.classList.add('hide'); 
        item.classList.remove('show', 'fade');
    });
    // Убираем класс активности с таба
    tabs.forEach(item => {
        item.classList.remove(activeClass);
    });
    }

    // Функция для показа элементов
    function showTabContent(i = 0) { // ставим 0 по умолчанию, чтобы вначале был 1-й таб
    tabsContent[i].classList.add('show', 'fade'); //i - индекс массива
    tabsContent[i].classList.remove('hide');

    tabs[i].classList.add(activeClass); // доб-е класса активности
    }
    hideTabContent(); // вызов функций
    showTabContent();

    // Обработчик событий клика
    tabsParent.addEventListener('click', (e) => { 
    if (e.target && e.target.classList.contains(tabsSelector.slice(1))) { //делегирование события, клик по табу. slice применяется для удаления точки в начале, т.к. добавляем класс, а не селектор
        tabs.forEach((item, i) => { //перебор, передача 2-х элементов (item - каждый таб кот-й перебираем, i - номер элемента по порядку который перебираем) 
            if (e.target == item){ // если e.target, тот элемент, на который мы кликнули совпадает с элементом, который перебираем в цикле forEach, то вызываем ф-ии ниже 
                hideTabContent();
                showTabContent(i); //i - номер того элемента, кот-й в этом условии совпал               
            }
        });         
    }
    }); //т.е кликнули на 3 таб, начинается перебор элементов и третий таб, это тот таб на который кликнул пользователь
}
export default tabs;