const robot = require('robotjs');

const START_AT = 1000;
const END_AT = 10000;

function typePin(pin) {
    robot.typeString(pin.toString());
    robot.keyTap('enter'); // Нажимает Enter
}

async function start() {
    console.log("Наведи мышку на поле и сделай его активным. Есть 5 секунд...");
    await sleep(5000); // Задержка 5 секунд

    for (let pin = START_AT; pin <= END_AT; pin++) {
        console.log(`Ввожу PIN: ${pin}`);

        // Кликаем, чтобы активировать поле ввода
        const { x, y } = robot.getMousePos();
        robot.moveMouse(x, y);
        robot.mouseClick();

        // Вводим PIN
        typePin(pin);
        await sleep(1000); // Задержка между вводами
    }
    console.log("Процесс завершён. Все указанные PIN-коды введены.");
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

start();
