let entidades = []; // global


// mueren todos
// mensaje del capitan
// cuando muere el capitan mueren todos

colores = ["#C00", "#0C0", "#00C", "#E00", "#0E0", "#00E", "#F00", "#0F0", "#00F", "#FFF"];
const MensajesGeneral = new Mensajes(300, 10)

function setup() {
  createCanvas(400, 400);

  parca = new ParcaObserver()

  for (var i = 0; i < 10; i++) {
    a = new NaveChica()
    a.subscribir(parca)
    entidades.push(a)
  }

  for (var i = 0; i < 2; i++) {
    eq = new Equipo(2, 4, 10, colores[i]);
    eq.subscribir(parca)
    entidades.push(eq);
  }

  for (var i = 0; i < 10; i++) {
    a = new NaveChica()
    a.subscribir(parca)
    entidades.push(a)
  }

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
