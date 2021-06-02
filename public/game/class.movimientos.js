// MOVIMIENTOS
// --------------------------------------------
class moveCommon {
  // movimiento
  mover(posicion, velocidad) {
    return V(posicion.x + velocidad.x, posicion.y + velocidad.y);
  }
}
class moveHorizontal {
  // movimiento
  mover(posicion, velocidad) {
    return V(posicion.x + velocidad.x, posicion.y);
  }
}
class moveVertical {
  // movimiento
  mover(posicion, velocidad) {
    return V(posicion.x, posicion.y + velocidad.y);
  }
}
class moveRandom {
  constructor() {
    this.loop = 0
    this.dice = 0
  }
  // movimiento
  mover(posicion, velocidad) {
    this.roll()
    if (this.dice > 80) {
      return V(posicion.x + velocidad.x, posicion.y + velocidad.y);
    } else if (this.dice > 70) {
      return V(posicion.x, posicion.y + velocidad.y);
    } else if (this.dice > 60) {
      return V(posicion.x + velocidad.x, posicion.y);
    } else if (this.dice > 30) {
      return V(posicion.x + velocidad.y, posicion.y + velocidad.x);
    } else {
      return posicion;
    }
  }
  roll() {
    if (this.loop++ % 60 == 0) {
      this.dice = getRandom(0, 100)
    }
  }

}