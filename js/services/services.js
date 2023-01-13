//Ф-я для отправки данных на сервер
const postData = async (url, data) => {//url сервера, data-отправляемые данные
    const res = await fetch(url, { //код ожидает выполнения fetch(благодаря await). Fetch возращает промис
        method: 'POST', // метод
        headers: { // заголовки
            'Content-type': 'application/json'
    },
        body: data
    });
    return await res.json(); //преобразование данных в json, код ожидает выполнения fetch(благодаря await)
};

//Ф-я GET-запроса
const getResourсe = async (url) => { //url сервера, из кот-го получаем дату
    const res = await fetch(url);
    if (!res.ok) { // если  запрос не ок
        throw new Error(`Could not fetch ${url}, status; ${res.status}`); // то в консоль выбросим(throw) созданную нами ошибку(new Error) с текстом внутри 'Could not fetch...'
    }
    return await res.json(); //преобразование данных в json, код ожидает выполнения fetch(благодаря await)
};


export {postData};
export {getResourсe};