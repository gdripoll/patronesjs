let entidades = []; // global

colores = ["#C00", "#0C0", "#00C"];

function setup() {
  createCanvas(400, 400);

  entidades.push(new NaveChica())
  entidades.push(new NaveChica())
  entidades.push(new NaveChica())
  entidades.push(new NaveChica())
  for (var i = 0; i < 2; i++) {
    entidades.push(new Equipo(2, 4, 10, colores[i]));
  }
  entidades.push(new NaveChica())
  entidades.push(new NaveChica())
  entidades.push(new NaveGrande())
  entidades.push(new Palito())

  // for (var i = 0; i < 25; i++) {
  //   entidades.push(new NaveChica())
  //   entidades.push(new NaveGrande())
  //   entidades.push(new Palito())
  // }
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
}
