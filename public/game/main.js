// Juevo en JS
// Main File
// profesor: oclesnd@globalhitss.com

// CONSTANTS
let MensajesGeneral = {};
const ScrManager = new ScreenManager();

let entidades = []; // global

function setup() {
  createCanvas(windowWidth - 20, windowHeight);
  MensajesGeneral = new Mensajes(width - 10, 10);

  ScrManager.add(new ScreenMatch("match", MensajesGeneral, new LayoutBasico("blue")));
  ScrManager.add(new ScreenPointsTest("points", MensajesGeneral));
  ScrManager.add(new ScreenGameOver("gameover", MensajesGeneral));
  ScrManager.add(new ScreenStart("start", MensajesGeneral));
  ScrManager.jumpTo("start");
}

function draw() {
  ScrManager.draw();
}

// FUNCIONES VARIAS DE PRUEBA
// -------------------------------------
function mousePressed() {
  return ScrManager.mousePressed();
}
function mouseDragged() {
  return ScrManager.mouseDragged();
}
function mouseReleased() {
  return ScrManager.mouseReleased();
}
function mouseClicked() {
  return ScrManager.mouseClicked();
}
