// Juevo en JS
// Main File
// profesor: oclesnd@globalhitss.com

// CONSTANTS
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;
const MensajesGeneral = new Mensajes(300, 10);
let entidades = []; // global



function setup() {
  createCanvas(400, 400);

  // ---OBSERVERS--------------------
  parca = new ParcaObserver();
  gameOver = new EquipoObserver(entidades)

  // ---EQUIPOS----------------------
  equipo1 = [];
  equipo2 = [];

  // ---EQUIPO1----------------------
  for (var i = 0; i < 1; i++) {
    n = new NaveGrande(getRandomX(), getRandomY(), new moveHorizontal(), new SniperGun(equipo1, equipo2));
    n.subscribir(parca);
    equipo1.push(n);
  }
  for (var i = 0; i < 4; i++) {
    n = new NaveChica(getRandomX(), getRandomY(), new moveRandom(), new SniperGun(equipo1, equipo2));
    n.subscribir(parca);
    equipo1.push(n);
  }
  for (var i = 0; i < 3; i++) {
    n = new Palito(getRandomX(), getRandomY(), new moveVertical(), new DummyGun(equipo1));
    n.subscribir(parca);
    equipo1.push(n);
  }
  e1 = new Equipo(equipo1, "blue");
  e1.subscribir(gameOver)
  entidades.push(e1);
  // pCap1 = new CapitanObserver(equipo1);
  // equipo1[0].subscribir(pCap1);

  // ---EQUIPO2----------------------
  for (var i = 0; i < 1; i++) {
    n = new NaveGrande(getRandomX(), getRandomY(), new moveHorizontal(), new SniperGun(equipo2, equipo1));
    n.subscribir(parca);
    equipo2.push(n);
  }
  for (var i = 0; i < 4; i++) {
    n = new NaveChica(getRandomX(), getRandomY(), new moveRandom(), new SniperGun(equipo2, equipo1));
    n.subscribir(parca);
    equipo2.push(n);
  }
  for (var i = 0; i < 3; i++) {
    n = new Palito(getRandomX(), getRandomY(), new moveVertical(), new DummyGun(equipo2));
    n.subscribir(parca);
    equipo2.push(n);
  }
  e2 = new Equipo(equipo2, "red");
  e2.subscribir(gameOver)
  entidades.push(e2);
  // pCap2 = new CapitanObserver(equipo2);
  // equipo2[0].subscribir(pCap2);

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

