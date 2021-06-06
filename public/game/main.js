// Juevo en JS
// Main File
// profesor: oclesnd@globalhitss.com

// CONSTANTS
const MensajesGeneral = new Mensajes(300, 10);
const ScrManager = new ScreenManager();

let entidades = []; // global

function setup() {
  createCanvas(windowWidth, windowHeight);

  ScrManager.add(new ScreenMatch("match", MensajesGeneral));
  ScrManager.add(new ScreenPointsTest("points", MensajesGeneral));
  ScrManager.add(new ScreenGameOver("gameover", MensajesGeneral));
  ScrManager.jumpTo("match");
}

function draw() {
  ScrManager.draw();
}
