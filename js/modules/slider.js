function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    //6. Слайдер
    const prevBtn = document.querySelector(prevArrow),
    nextBtn = document.querySelector(nextArrow),
    slides = document.querySelectorAll(slide),
    total = document.querySelector(totalCounter),
    current = document.querySelector(currentCounter),
    slidesWrapper = document.querySelector(wrapper),
    slidesField = document.querySelector(field),
    width = window.getComputedStyle(slidesWrapper).width, //получаем ширину
    slider = document.querySelector(container);

    let slideIndex = 1;
    let offset = 0; //отступ

    slidesField.style.width = 100 * slides.length + `%`; //ставим ширину в 400%
    slidesField.style.display = 'flex';
    slidesField.style.transition = '.5s all';
    slidesWrapper.style.overflow = 'hidden'; //скрытие остальных слайдов

    // показ общего кол-ва слайдов
    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length;
    }
    //Ф-я добавления 0
    function addZeroInCurrent () {
        if (slideIndex < 10) { // добавление нуля
        current.textContent = `0${slideIndex}`;
        } else {
        current.textContent = slideIndex;
        }
    }
    //Выделение активной точки
    function activeDot () {
        dotsArray.forEach(dot => dot.style.opacity ='.5'); //назначение всем точкам прозрачности .5
        dotsArray[slideIndex - 1].style.opacity = 1; //
    }

    addZeroInCurrent ();

    slides.forEach(slide => { //для ширину каждого слайда приравниваем к ширине wrapper
    slide.style.width = width;
    });

    //создание точек
    slider.style.position = 'relative';
    const dots = document.createElement('ol');
    const dotsArray = []; //для трансформации dots из псевдомассива в массив

    dots.classList.add('carousel-indicators');
    dots.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;   
    `;
    slider.append(dots);

    for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1); //к каждой точке устанавливаем имя атрибута и его значение (i+1). Итог data-slide-to="1" и т.д.
    dot.classList.add('dot');
    dot.style.cssText = `
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;
        `;
    if (i == 0) { //
        dot.style.opacity = '1';
    }
        dots.append(dot);
        dotsArray.push(dot); //в массив добавляем точку
    }
    //Удаление 'px' в расчете ширины
    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }   

    nextBtn.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) { //последний слайд
        offset = 0; // первый слайд
        } else {
        offset += deleteNotDigits(width); //переключение слайдов вправо
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) { // изменение цифры в слайдах
        slideIndex = 1;
        } else {
        slideIndex++; // slideIndex + 1
        }

        addZeroInCurrent ();
        activeDot ();
    });

    prevBtn.addEventListener('click', () => {
        if (offset == 0) { //первый слайд
        offset = deleteNotDigits(width) * (slides.length - 1); //последний слайд
        } else {
        offset -= deleteNotDigits(width); //переключений слайдов влево
        }

        slidesField.style.transform = `translateX(-${offset}px)`; //перелистывание

        if (slideIndex == 1) { // изменение цифры в меньшую сторону
        slideIndex = slides.length;
        } else {
        slideIndex--;
        }

        addZeroInCurrent ();
        activeDot ();
    });

    dotsArray.forEach(dot => {
    dot.addEventListener('click',  (e) => {
        const slideTo = e.target.getAttribute('data-slide-to');
        slideIndex = slideTo;
        offset = deleteNotDigits(width) * (slideTo - 1);
        slidesField.style.transform = `translateX(-${offset}px)`;
        addZeroInCurrent ();
        activeDot ();
    });
    });
    //слайдер другой вариант
    // showSlides(slideIndex); //инициализация ф-ии, для хорошего вида слайдера (без других слайдов)
    
    // // ф-я показа слайдов
    //     function showSlides(n) {
    //         if (n > slides.length) { // для возврата в начало слайдера
    //             slideIndex = 1;
    //         }
    //         if (n < 1) {
    //             slideIndex = slides.length; // ддя возврата в конец слайдов
    //         }    
    //         slides.forEach(slide => slide.style.display = 'none'); //все слайды изначально скрыть
    //         slides[slideIndex - 1].style.display = 'block'; // показать нужный слайд (по умолчанию первый)
    //         // показ текущего номера слайда
    //         addZeroInCurrent ();  
    //     }
    //     //перелистывания
    //     function plusSlides(n) {
    //         showSlides(slideIndex += n);
    //     }
    //     //переоистывание
    //     prevBtn.addEventListener('click', () => {
    //         plusSlides(-1);
    //     });
    //     nextBtn.addEventListener('click', () => {
    //         plusSlides(1);
    //     });
}
export default slider;