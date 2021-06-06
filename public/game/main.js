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
  props1 = []

  // ---PROPS------------------------
  p = new Muro(70, 75, 8, 250, new MoveDummy(), new DummyGun(equipo1)); props1.push(p)
  p = new Muro(330, 75, 8, 250, new MoveDummy(), new DummyGun(equipo1)); props1.push(p)
  p = new Muro(130, 100, 150, 8, new MoveDummy(), new DummyGun(equipo1)); props1.push(p)
  p = new Muro(130, 300, 150, 8, new MoveDummy(), new DummyGun(equipo1)); props1.push(p)
  p = new Muro(190, 200, 25, 25, new MoveDummy(), new DummyGun(equipo1)); props1.push(p)

  props = new Equipo(props1, "blue")
  entidades.push(props)

  // ---EQUIPO1----------------------
  for (var i = 0; i < 2; i++) {
    n = new NaveGrande(getRandomX(), getRandomY(), new MoveHorizontal(), new SniperGun(equipo1, equipo2));
    n.subscribir(parca);
    equipo1.push(n);
  }
  for (var i = 0; i < 4; i++) {
    n = new NaveChica(getRandomX(), getRandomY(), new MoveRandom(), new SniperGun(equipo1, equipo2));
    n.subscribir(parca);
    equipo1.push(n);
  }
  for (var i = 0; i < 10; i++) {
    n = new Palito(getRandomX(), getRandomY(), new MoveCommon(), new DummyGun(equipo1));
    n.subscribir(parca);
    equipo1.push(n);
  }
  e1 = new Equipo(equipo1, "green");
  e1.subscribir(gameOver)
  entidades.push(e1);
  // pCap1 = new CapitanObserver(equipo1);
  // equipo1[0].subscribir(pCap1);

  // ---EQUIPO2----------------------
  for (var i = 0; i < 2; i++) {
    n = new NaveGrande(getRandomX(), getRandomY(), new MoveHorizontal(), new SniperGun(equipo2, equipo1));
    n.subscribir(parca);
    equipo2.push(n);
  }
  for (var i = 0; i < 4; i++) {
    n = new NaveChica(getRandomX(), getRandomY(), new MoveRandom(), new SniperGun(equipo2, equipo1));
    n.subscribir(parca);
    equipo2.push(n);
  }
  for (var i = 0; i < 10; i++) {
    n = new Palito(getRandomX(), getRandomY(), new MoveCommon(), new DummyGun(equipo2));
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

  // background(220);
  background(0);

  // PRUEBA DE PUNTOS DE CIRCULO
  // origen = { x: 200, y: 200 }
  // radio = 100
  // puntos = getCircleBoundingPoints(origen.x, origen.y, radio)
  // strokeWeight(1)
  // circle(origen.x, origen.y, radio * 2);
  // push()
  // strokeWeight(4)
  // stroke("red");
  // point(origen.x, origen.y)
  // stroke("blue");
  // for (var p in puntos) point(puntos[p].x, puntos[p].y)
  // pop()



  // CICLO DEL JUEGO
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

