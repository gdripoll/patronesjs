// Juevo en JS
// Main File
// profesor: oclesnd@globalhitss.com

// CONSTANTS
let MensajesGeneral = {};
const ScrManager = new ScreenManager();

let entidades = []; // global

function setup() {
  createCanvas(windowWidth, windowHeight);
  MensajesGeneral = new Mensajes(width - 150, 10);

  ScrManager.add(new ScreenMatch("match", MensajesGeneral, new LayoutBasico("blue")));
  ScrManager.add(new ScreenPointsTest("points", MensajesGeneral, new LayoutVacio()));
  ScrManager.add(new ScreenGameOver("gameover", MensajesGeneral, new LayoutVacio()));
  ScrManager.jumpTo("match");
}

function draw() {
  ScrManager.draw();
}
