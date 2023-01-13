'use strict';
import tabs from './modules/tabs';
import calc from './modules/calc';
import cards from './modules/cards';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';
import timer from './modules/timer';
import {showModalWindow} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
    // Появление модал окна после некоторого времени (таймер)
    const modalTimer = setTimeout(() => showModalWindow('.modal', modalTimer), 50000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active'); //вызов ф-й
    calc(); //вызов ф-й
    cards(); //вызов ф-й
    forms('form', modalTimer); //вызов ф-й
    modal('[data-modal]', '.modal', modalTimer); //вызов ф-й
    slider({
        container: '.offer__slider', 
        slide: '.offer__slide', 
        nextArrow: '.offer__slider-next', 
        prevArrow: '.offer__slider-prev', 
        totalCounter: '#total', 
        currentCounter: '#current', 
        wrapper: '.offer__slider-wrapper', 
        field: '.offer__slider-inner' 
    }); //вызов ф-й
    timer('.timer', '2023-12-12'); //вызов ф-й
});