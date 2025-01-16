const robot = require('robotjs');

//Скрипт перебирает все возможные комбинции из переменной CHARACTERS

// !!! КОММЕНТ ДЛЯ САШИ: В 7 строчке все возможные символы для генерации ключей 
//если не достает символов, например нужен этот символ: "-", то введи его в строчку между кавычками: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя-'. 
const CHARACTERS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя';


//функция  helper должна быть генераторной (function*), тк в ней используется  yield.

function* generateKeysInRange(minLength, maxLength) {
    function* helper(prefix, length) {
        if (length === 0) {
            yield prefix;
        } else {
            for (let char of CHARACTERS) {
                yield* helper(prefix + char, length - 1);
            }
        }
    }

    for (let length = minLength; length <= maxLength; length++) {
        yield* helper('', length);
    }
}

function typePin(pin) {
    robot.typeString(pin.toString());
    robot.keyTap('enter'); // Нажимает Enter
}

async function start() {
    console.log("Наведи мышку на поле и сделай его активным. Есть 5 секунд...");
    await sleep(5000); // Задержка 5 секунд !!! КОММЕНТ ДЛЯ САШИ: Это не трогай. она дает время тебе найти поле

   

     const keys = generateKeysInRange(1, 6); //!!! КОММЕНТ ДЛЯ САШИ: Если нужно, чтобы генерировался пароль, начиная не с однозначного, а например, с четырехначного значения, то первую цифру меняем на 4. Вот так получится в итоге: const keys = generateKeysInRange(4, 6) 

    for (let key of keys) {
        console.log(`Ввожу ключ: ${key}`);

        // Кликаем, чтобы активировать поле ввода
        const { x, y } = robot.getMousePos();
        robot.moveMouse(x, y);
        robot.mouseClick();

        // Вводим ключ
        typePin(key);
        await sleep(500); // !!! КОММЕНТ ДЛЯ САШИ: это значение можно менять, это задержка между вводами в милисекундах. Не рекомендую ставить низкое значение, чтобы ОС успевала срабатывать
    }
    console.log("Процесс завершён. Все ключевые слова введены.");
}







function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

start();




//Генераторные функции и оператор yield* – это мощные инструменты в JavaScript, которые позволяют работать с последовательностями данных, создавая их "лениво", то есть по запросу, а не все сразу

// Как написать генераторную функцию?
// Используется ключевое слово function* (с звёздочкой).
// Значения возвращаются через оператор yield.
// Чтобы начать выполнение, нужно вызвать метод .next() на итераторе, который возвращается генератором.
// Пример простого генератора:

// javascript
// Копировать код
// function* myGenerator() {
//     yield 1; // возвращает 1
//     yield 2; // возвращает 2
//     yield 3; // возвращает 3
// }

// const gen = myGenerator();
// console.log(gen.next()); // { value: 1, done: false }
// console.log(gen.next()); // { value: 2, done: false }
// console.log(gen.next()); // { value: 3, done: false }
// console.log(gen.next()); // { value: undefined, done: true }

