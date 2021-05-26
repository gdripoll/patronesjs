// CONSTANTS
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;

// --------------------------------------------
function getRandom(min, max) {
  return Math.floor(Math.random() * max) + min;
}
// --------------------------------------------
class ParcaObserver {
  constructor() {
    console.log("ParcaObserver:constructor")
  }
  murio(sujeto) {
    // console.log("ParcaObserver:murio -- ", parseInt(sujeto.posicion.x), parseInt(sujeto.posicion.y))
    MensajesGeneral.agregar("MUERTE en [" + parseInt(sujeto.posicion.x) + "," + parseInt(sujeto.posicion.y) + "]", 60)
  }
  murioEquipo(sujeto) {
    // console.log("ParcaObserver:murioEquipo -- ", sujeto)
    MensajesGeneral.agregar("MUERTE del Team -- " + sujeto.color, 120)
  }
  murioCapitan(team) {
    console.log("ParcaObserver:murioEquipo -- ", team)
    MensajesGeneral.agregar("MUERTE del Capitan -- " + team.color, 120)
    team.killTeam()
  }
}
// --------------------------------------------
// BASE
// --------------------------------------------
class SujetoAbstracto {
  constructor(x, y) {
    this.posicion = V(
      x || getRandom(5, CANVAS_WIDTH),
      y || getRandom(5, CANVAS_HEIGHT)
    );
    this.velocidad = V(getRandom(-2, 2), getRandom(-2, 2));
    this.vida = 100;
    this.observers = []
  }
  // movimiento
  mover() {
    this.posicion.x += this.velocidad.x;
    this.posicion.y += this.velocidad.y;
  }
  // draw
  tick() {
    this.rebotar();
    this.mover();
    this.dibujar();
  }
  // manejo de vidas
  getVida() {
    return this.vida;
  }
  sacarVida(valor) {
    this.vida -= valor;
    if (this.vida <= 0) {
      for (var i = 0; i < this.observers.length; i++) this.observers[i].murio(this)
    }
  }
  // OBSERVER
  subscribir(subscriptor) {
    this.observers.push(subscriptor);
  }
  desuscribir(subscriptor) {
    // TODO
  }
}
// NAVES
// --------------------------------------------
class NaveChica extends SujetoAbstracto {
  constructor(x, y) {
    super(x, y, 15);
    this.diametro = 15;
    this.radio = this.diametro / 2;
    this.velocidad = V(2, 3);
  }
  rebotar() {
    if (this.posicion.x <= this.radio) {
      this.velocidad.x *= -1;
      this.posicion.x = this.radio;
    }
    if (this.posicion.x >= CANVAS_WIDTH - this.radio) {
      this.velocidad.x *= -1;
      this.posicion.x = CANVAS_WIDTH - this.radio;
    }
    if (this.posicion.y <= this.radio) {
      this.velocidad.y *= -1;
      this.posicion.y = this.radio;
    }
    if (this.posicion.y >= CANVAS_HEIGHT - this.radio) {
      this.velocidad.y *= -1;
      this.posicion.y = CANVAS_HEIGHT - this.radio;
    }
  }
  chocar(otro) {
    // chica 100 a grande 20
    // chica 100 a chica 100
    // chica 20  a palito 100
    return otro.chocarNaveChica(this);
  }
  chocarNaveChica(otro) {
    const sumaRadios = this.radio + otro.radio;
    const dist = distancia(this.posicion, otro.posicion);
    if (dist < sumaRadios) {
      this.velocidad.mult(-1);
      otro.velocidad.mult(-1);
      this.sacarVida(100);
      otro.sacarVida(100);
    }
  }
  chocarNaveGrande(otro) {
    const sumaRadios = this.radio + otro.radio;
    const dist = distancia(this.posicion, otro.posicion);
    if (dist < sumaRadios) {
      this.velocidad.mult(-1);
      otro.velocidad.mult(-1);
      this.sacarVida(100);
      otro.sacarVida(20);
    }
  }
  chocarPalito(otro) {
    if (
      distancia(this.posicion, otro.posicion) < this.radio ||
      distancia(this.posicion, otro.getBottom()) < this.radio ||
      distancia(this.posicion, otro.getMiddle()) < this.radio
    ) {
      this.velocidad.mult(-1);
      otro.velocidad.mult(-1);
      this.sacarVida(20);
      otro.sacarVida(100);
    }
  }
  dibujar() {
    circle(this.posicion.x, this.posicion.y, this.diametro);
  }
}
class NaveGrande extends SujetoAbstracto {
  constructor(x, y) {
    super(x, y, 30);
    this.diametro = 30;
    this.radio = this.diametro / 2;
    this.velocidad = V(2, 1);
  }
  rebotar() {
    if (this.posicion.x <= this.radio) {
      this.velocidad.x *= -1;
      this.posicion.x = this.radio;
    }
    if (this.posicion.x >= CANVAS_WIDTH - this.radio) {
      this.velocidad.x *= -1;
      this.posicion.x = CANVAS_WIDTH - this.radio;
    }
    if (this.posicion.y <= this.radio) {
      this.velocidad.y *= -1;
      this.posicion.y = this.radio;
    }
    if (this.posicion.y >= CANVAS_HEIGHT - this.radio) {
      this.velocidad.y *= -1;
      this.posicion.y = CANVAS_HEIGHT - this.radio;
    }
  }
  dibujar() {
    circle(this.posicion.x, this.posicion.y, this.diametro);
  }
  chocar(otro) {
    // grande 100 a grande 100
    // grande 20  a chica 100
    // grande 10  a palito 100
    return otro.chocarNaveGrande(this);
  }
  chocarNaveChica(otro) {
    const sumaRadios = this.radio + otro.radio;
    const dist = distancia(this.posicion, otro.posicion);
    if (dist < sumaRadios) {
      this.velocidad.mult(-1);
      otro.velocidad.mult(-1);
      this.sacarVida(20);
      otro.sacarVida(100);
    }
  }
  chocarNaveGrande(otro) {
    const sumaRadios = this.radio + otro.radio;
    const dist = distancia(this.posicion, otro.posicion);
    if (dist <= sumaRadios) {
      this.velocidad.mult(-1);
      otro.velocidad.mult(-1);
      this.sacarVida(100);
      otro.sacarVida(100);
    }
  }
  chocarPalito(otro) {
    if (
      distancia(this.posicion, otro.posicion) < this.radio ||
      distancia(this.posicion, otro.getBottom()) < this.radio ||
      distancia(this.posicion, otro.getMiddle()) < this.radio
    ) {
      this.velocidad.mult(-1);
      otro.velocidad.mult(-1);
      this.sacarVida(10);
      otro.sacarVida(100);
    }
  }
}
class Palito extends SujetoAbstracto {
  constructor(x, y, color) {
    super(x, y);
    this.velocidad = V(4, 4);
    this.alto = 20;
  }
  getBottom() {
    return V(this.posicion.x, this.posicion.y + this.alto);
  }
  getMiddle() {
    return V(this.posicion.x, this.posicion.y + this.alto / 2);
  }
  // pantalla
  rebotar() {
    if (this.posicion.x <= 0 || this.posicion.x > CANVAS_WIDTH) {
      this.velocidad.x *= -1;
    }
    if (this.posicion.y <= 0 || this.posicion.y > CANVAS_HEIGHT - this.alto) {
      this.velocidad.y *= -1;
    }
  }
  // draw
  dibujar() {
    // stroke(this.color.r, this.color.g, this.color.b)
    line(
      this.posicion.x,
      this.posicion.y,
      this.posicion.x,
      this.posicion.y + this.alto
    );
  }
  // bump
  // palito 100 a grande 10
  // palito 100 a chica 20
  // palito 100 a palito 100
  chocar(otro) {
    return otro.chocarPalito(this);
  }
  chocarPalito(otro) {
    var palTop = otro.posicion;
    var palBot = otro.getBottom();
    var d = distancia(this.posicion, otro.posicion);
    if (Math.abs(this.posicion.x - otro.posicion.x) <= 2 && d < this.alto) {
      this.velocidad.mult(-1);
      otro.velocidad.mult(-1);
      this.sacarVida(100);
      otro.sacarVida(100);
    }
  }
  chocarNaveChica(otro) {
    if (
      distancia(this.posicion, otro.posicion) < otro.radio ||
      distancia(this.getMiddle(), otro.posicion) < otro.radio ||
      distancia(this.getBottom(), otro.posicion) < otro.radio
    ) {
      this.velocidad.mult(-1);
      otro.velocidad.mult(-1);
      this.sacarVida(100);
      otro.sacarVida(20);
    }
  }
  chocarNaveGrande(otro) {
    if (
      distancia(this.posicion, otro.posicion) < otro.radio ||
      distancia(this.getMiddle(), otro.posicion) < otro.radio ||
      distancia(this.getBottom(), otro.posicion) < otro.radio
    ) {
      this.velocidad.mult(-1);
      otro.velocidad.mult(-1);
      this.sacarVida(100);
      otro.sacarVida(10);
    }
  }
}
// --------------------------------------------
class Equipo extends SujetoAbstracto {
  constructor(gr, ch, pa, color) {
    super(0, 0)
    this.cantGr = gr;
    this.cantCh = ch;
    this.cantPa = pa;
    this.color = color;
    this.captains = []
    this.army = [];
    for (var i = 0; i < this.cantGr; i++) this.army.push(new NaveGrande());
    this.captains.push(this.army[0])
    for (var i = 0; i < this.cantCh; i++) this.army.push(new NaveChica());
    for (var i = 0; i < this.cantPa; i++) this.army.push(new Palito());
  }
  tick() {
    push()
    stroke(this.color);
    fill(this.color);
    for (var i = 0; i < this.army.length; i++) this.army[i].tick();
    pop()
  }
  // CHOCAR
  chocarNaveGrande(otro) {
    for (var m = 0; m < this.army.length; m++) {
      this.army[m].chocar(otro)
    }
  }
  chocarNaveChica(otro) {
    for (var m = 0; m < this.army.length; m++) {
      this.army[m].chocar(otro)
    }
  }
  chocarPalito(otro) {
    for (var m = 0; m < this.army.length; m++) {
      this.army[m].chocar(otro)
    }
  }
  chocar(otro) {
    for (var m = 0; m < this.army.length; m++) {
      this.army[m].chocar(otro)
    }
  }
  getVida() {
    for (var i = 0; i < this.army.length; i++) {
      if (this.army[i].getVida() <= 0) {
        this.army.splice(i--, 1);
      }
    }
    for (var i = 0; i < this.captains.length; i++) {
      if (this.captains[i].vida <= 0) {
        for (var i = 0; i < this.observers.length; i++) this.observers[i].murioCapitan(this)
      }
    }
    if (this.army.length == 0) {
      for (var i = 0; i < this.observers.length; i++) this.observers[i].murioEquipo(this)
    }
    return this.army.length;
  }
  killTeam() {
    for (var i = 0; i < this.army.length; i++) {
      this.army[i].sacarVida(100)
    }
  }
}
