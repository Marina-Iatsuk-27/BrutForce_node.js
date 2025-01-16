const robot = require("robotjs");

// Временная пауза
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Определение текущих координат мышки
function getMousePosition() {
    const mouse = robot.getMousePos();
    // console.log(`Координаты мышки: x=${mouse.x}, y=${mouse.y}`);
    return mouse;
}

// Ввод текста в активное поле
async function enterTextAtCoordinates(coords, text) {
    // console.log(`Вводим текст "${text}" в координаты x=${coords.x}, y=${coords.y}`);

    // Перемещаем мышку к инпуту
    robot.moveMouse(coords.x, coords.y);
    robot.mouseClick(); // Делаем инпут активным
    // console.log('Кликнули на поле ввода');
    
    await pause(500); // Ждем немного больше времени, чтобы поле точно стало активным

    // Вводим текст
    robot.typeString(text);  // Вводим всю строку сразу
    console.log(`Введен PIN "${text}" .`);

    // Нажимаем Enter
    // console.log('Нажимаем клавишу Enter');
    robot.keyTap('enter');
     console.log(`Нажали Enter.`);
}

// Основной процесс
async function main() {
    console.log("Наведи мышку на поле и сделай его активным. Есть 5 секунд...");
    await pause(5000); // Ждём 5 секунд, чтобы ты навела мышку на инпут

    // Получаем координаты мышки
    const inputCoords = getMousePosition();

    // Вводим цифры от 1000 до 10000
    for (let i = 1000; i <= 10000; i++) {
        // Вводим текущую цифру
        await enterTextAtCoordinates(inputCoords, i.toString());

        // Добавляем задержку между вводами, чтобы приложение успело обработать каждое значение
        await pause(500); // Это время можно регулировать в зависимости от реакции приложения
    }

    // Завершаем выполнение
    console.log('Процесс завершен.');
}

main().catch(console.error);
