let entidades = []; // global

// oclesnd@globalhitss.com
// mail
// gang of four design patterns gamma helm johson vlissides
// mueren todos
// mensaje del capitan
// cuando muere el capitan mueren todos

// nave grande solo horizontal
// nave grande cada tanto cambia de direccion
// nave chica y grande se mueven distinto
// strategy?    callback me parece
// LUNES!!!
// the coding train
// high score documentary
// https://refactoring.guru/es

colores = ["blue", "red", "orange", "white"];
const MensajesGeneral = new Mensajes(300, 10);

function setup() {
  createCanvas(400, 400);

  parca = new ParcaObserver();
  moveH = new moveHorizontal();
  moveV = new moveVertical();
  moveR = new moveRandom();

  // ---EQUIPO1----------------------
  equipo1 = [];
  for (var i = 0; i < 2; i++) {
    n = new NaveGrande();
    n.setMover(moveH);
    equipo1.push(n);
  }
  for (var i = 0; i < 4; i++) {
    n = new NaveChica();
    n.setMover(moveR);
    equipo1.push(n);
  }
  for (var i = 0; i < 10; i++) {
    n = new Palito();
    n.setMover(moveV);
    equipo1.push(n);
  }
  e1 = new Equipo(equipo1, colores[0]);
  entidades.push(e1);
  pCap1 = new CapitanObserver(equipo1);
  equipo1[0].subscribir(pCap1);

  // ---EQUIPO2----------------------
  equipo2 = [];
  for (var i = 0; i < 2; i++) {
    n = new NaveGrande();
    n.setMover(moveH);
    equipo2.push(n);
  }
  for (var i = 0; i < 4; i++) {
    n = new NaveChica();
    n.setMover(moveR);
    equipo2.push(n);
  }
  for (var i = 0; i < 10; i++) {
    n = new Palito();
    n.setMover(moveV);
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
