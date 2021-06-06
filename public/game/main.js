// Juevo en JS
// Main File
// profesor: oclesnd@globalhitss.com

// CONSTANTS
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;
const MensajesGeneral = new Mensajes(300, 10);
let entidades = []; // global

const ScrManager = new ScreenManager();

function setup() {
  createCanvas(400, 400);
  ScrManager.add(new ScreenMatch("match", MensajesGeneral));
  ScrManager.add(new ScreenPointsTest("points", MensajesGeneral));
  ScrManager.add(new ScreenGameOver("gameover", MensajesGeneral));
  ScrManager.jumpTo("gameover");
}

function draw() {
  ScrManager.draw();
}
