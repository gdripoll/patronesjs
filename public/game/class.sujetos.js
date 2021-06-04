// NAVES
// --------------------------------------------
class SujetoAbstracto {
  constructor(x, y, mover, gun) {
    this.posicion = V(x, y)
    this.objMover = mover
    this.objGun = gun
    this.velocidad = V(getRandom(-2, 2), getRandom(-2, 2));
    this.vida = 100;
    this.observers = [];
  }
  // movimiento
  mover() {
    this.posicion = this.objMover.mover(this.posicion, this.velocidad);
    this.objGun.disparar(this)
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
      for (var i = 0; i < this.observers.length; i++)
        this.observers[i].murio(this);
    }
  }
  // OBSERVER
  subscribir(subscriptor) {
    this.observers.push(subscriptor);
  }
}
class NaveGrande extends SujetoAbstracto {
  constructor(x, y, mover, gun) {
    super(x, y, mover, gun);
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
  chocarBala(otro) {
    if (distancia(this.posicion, otro.posicion) < this.radio) {
      this.sacarVida(20)
      otro.sacarVida(otro.getVida())
    }
  }
}
class NaveChica extends SujetoAbstracto {
  constructor(x, y, mover, gun) {
    super(x, y, mover, gun);
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
  dibujar() {
    circle(this.posicion.x, this.posicion.y, this.diametro);
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
  chocarBala(otro) {
    if (distancia(this.posicion, otro.posicion) < this.radio) {
      this.sacarVida(20)
      otro.sacarVida(otro.getVida())
    }
  }
}
class Palito extends SujetoAbstracto {
  constructor(x, y, mover, gun) {
    super(x, y, mover, gun);
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
    const d = distancia(this.posicion, otro.posicion);
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
  chocarBala(otro) {
    // NOTA >
    // el parseInt sobre el X es imprescindible, porque la pocision de 
    // la bala llega con float, con lo cual es casi imposible que concuerde 
    // con el X del palito
    if (this.posicion.x == parseInt(otro.posicion.x) && (this.posicion.y < otro.posicion.y && this.getBottom().y >= otro.posicion.y)) {
      this.sacarVida(this.getVida())
      otro.sacarVida(otro.getVida())
    }
  }
}
// --------------------------------------------
class Equipo extends SujetoAbstracto {
  constructor(army, color) {
    super(0, 0);
    this.color = color;
    this.army = army;
    this.captains = [];
  }
  agregarCapitan(capitan) {
    this.captains.push(capitan);
  }
  tick() {
    push();
    stroke(this.color);
    fill(this.color);
    for (var i = 0; i < this.army.length; i++) this.army[i].tick();
    pop();
  }
  // CHOCAR
  chocarNaveGrande(otro) {
    for (var m = 0; m < this.army.length; m++) {
      this.army[m].chocar(otro);
    }
  }
  chocarNaveChica(otro) {
    for (var m = 0; m < this.army.length; m++) {
      this.army[m].chocar(otro);
    }
  }
  chocarPalito(otro) {
    for (var m = 0; m < this.army.length; m++) {
      this.army[m].chocar(otro);
    }
  }
  chocarBala(otro) {
    for (var m = 0; m < this.army.length; m++) {
      this.army[m].chocar(otro);
    }
  }
  chocar(otro) {
    for (var m = 0; m < this.army.length; m++) {
      this.army[m].chocar(otro);
    }
  }
  getVida() {
    for (var i = 0; i < this.army.length; i++) {
      if (this.army[i].getVida() <= 0) {
        this.army.splice(i--, 1);
      }
    }
    // if (this.army.length == 0) {
    //   for (var i = 0; i < this.observers.length; i++)
    //     this.observers[i].murioEquipo(this);
    // }
    return this.army.length;
  }
  // OBSERVER
  subscribir(subscriptor) {
    this.observers.push(subscriptor);
    for (var m = 0; m < this.army.length; m++) {
      this.army[m].subscribir(subscriptor);
    }
  }
}