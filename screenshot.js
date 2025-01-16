const screenshot = require("screenshot-desktop");
const fs = require("fs");

screenshot().then((img) => {
    fs.writeFileSync("screenshot.png", img);
    console.log("Снимок экрана сохранён как screenshot.png");
});
