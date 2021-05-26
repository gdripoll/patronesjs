let entidades = []; // global


// mueren todos
// mensaje del capitan
// cuando muere el capitan mueren todos

colores = ["blue", "red", "orange", "white"];
const MensajesGeneral = new Mensajes(300, 10)


// nave grande solo horizontal
// nave grande cada tanto cambia de direccion
// nave chica y grande se mueven distinto
// strategy?    callback me parece
// LUNES!!!


function setup() {
  createCanvas(400, 400);

  parca = new ParcaObserver()

  equipo1 = []
  for (var i = 0; i < 2; i++) equipo1.push(new NaveGrande());
  for (var i = 0; i < 4; i++) equipo1.push(new NaveChica());
  for (var i = 0; i < 10; i++) equipo1.push(new Palito());
  e1 = new Equipo(equipo1, colores[0])
  entidades.push(e1)
  pCap1 = new CapitanObserver(equipo1)
  equipo1[0].subscribir(pCap1)

  equipo2 = []
  for (var i = 0; i < 2; i++) equipo2.push(new NaveGrande());
  for (var i = 0; i < 4; i++) equipo2.push(new NaveChica());
  for (var i = 0; i < 10; i++) equipo2.push(new Palito());
  e2 = new Equipo(equipo2, colores[1])
  entidades.push(e2)
  pCap2 = new CapitanObserver(equipo2)
  equipo2[0].subscribir(pCap2)

  // for (var i = 0; i < 10; i++) {
  //   a = new NaveChica()
  //   a.subscribir(parca)
  //   entidades.push(a)
  // }

  for (var i = 0; i < 2; i++) {
    eq = new Equipo(2, 4, 10, colores[i]);
    eq.subscribir(parca)
    entidades.push(eq);
  }

  // for (var i = 0; i < 10; i++) {
  //   a = new NaveChica()
  //   a.subscribir(parca)
  //   entidades.push(a)
  // }

  MensajesGeneral.agregar("READY PLAYERS!", 120)
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
  MensajesGeneral.mostrar()
}
