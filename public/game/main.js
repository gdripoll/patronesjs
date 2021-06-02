// Juevo en JS
// Main File
// profesor: oclesnd@globalhitss.com

// CONSTANTS
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;

// --------------------------------------------
// UTILS
function getRandom(min, max) {
  return Math.floor(Math.random() * max) + min;
}
function getRandomX() {
  return getRandom(0, CANVAS_WIDTH);
}
function getRandomY() {
  return getRandom(0, CANVAS_HEIGHT);
}

let entidades = []; // global

colores = ["blue", "red", "orange", "white"];
const MensajesGeneral = new Mensajes(300, 10);

function setup() {
  createCanvas(400, 400);

  // ---AUXILIARES-------------------
  parca = new ParcaObserver();
  moveH = new moveHorizontal();
  moveV = new moveVertical();
  moveR = new moveRandom();

  // ---EQUIPO1----------------------
  equipo1 = [];
  for (var i = 0; i < 2; i++) {
    n = new NaveGrande(getRandomX(), getRandomY(), new moveHorizontal());
    n.subscribir(parca);
    equipo1.push(n);
  }
  for (var i = 0; i < 4; i++) {
    n = new NaveChica(getRandomX(), getRandomY(), new moveRandom());
    n.subscribir(parca);
    equipo1.push(n);
  }
  for (var i = 0; i < 3; i++) {
    n = new Palito(getRandomX(), getRandomY(), new moveVertical());
    n.subscribir(parca);
    equipo1.push(n);
  }
  e1 = new Equipo(equipo1, colores[0]);
  entidades.push(e1);
  pCap1 = new CapitanObserver(equipo1);
  equipo1[0].subscribir(pCap1);

  // ---EQUIPO2----------------------
  equipo2 = [];
  for (var i = 0; i < 2; i++) {
    n = new NaveGrande(getRandomX(), getRandomY(), new moveHorizontal());
    n.subscribir(parca);
    equipo2.push(n);
  }
  for (var i = 0; i < 4; i++) {
    n = new NaveChica(getRandomX(), getRandomY(), new moveRandom());
    n.subscribir(parca);
    equipo2.push(n);
  }
  for (var i = 0; i < 3; i++) {
    n = new Palito(getRandomX(), getRandomY(), new moveVertical());
    n.subscribir(parca);
    equipo2.push(n);
  }
  e2 = new Equipo(equipo2, colores[1]);
  entidades.push(e2);
  pCap2 = new CapitanObserver(equipo2);
  equipo2[0].subscribir(pCap2);

  MensajesGeneral.agregar("READY PLAYERS!", 120);
}

function draw() {
  background(220);

  // vida
  for (let i = 0; i < entidades.length; i++) {
    if (entidades[i].getVida() <= 0) {
      entidades.splice(i--, 1);
    }
  }
  // bump
  for (let i = 0; i < entidades.length; i++) {
    for (let j = i + 1; j < entidades.length; j++) {
      entidades[i].chocar(entidades[j]);
    }
  }
  // draw
  for (let i = 0; i < entidades.length; i++) entidades[i].tick();

  // mensajes
  MensajesGeneral.mostrar();
}

function mousePressed() {
  const bala = new Bala(200, 200, p5.Vector.random2D())
  entidades.push(bala)
}