function timer(id, deadline) { //id - селектор таймера
    // 2. Timer
    // Ф-я вычисления дней, часов и т.д.
    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()), // вычитание миллисек от дедлайна тек. даты
            days = Math.floor(t / (1000 * 60 * 60 * 24)), // расчет кол-ва дней. Math.floor() - округление в меньш. сторону
            hours = Math.floor((t / (1000 * 60 * 60) % 24)), //вычисляем остаток часов с помощью %
            minutes = Math.floor((t / 1000 / 60) % 60), // аналогично выше
            seconds = Math.floor((t / 1000) % 60); // аналогично выше
            if(t <= 0) { // для того чтобы было 00:00 после окончания акции
                days = 0;
                hours = 0;
                minutes = 0;
                seconds = 0;
                
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
    setClock (id, deadline); //вызов ф-ии

}
export default timer;