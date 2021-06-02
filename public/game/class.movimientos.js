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
  // movimiento
  mover(posicion, velocidad) {
    const dice = getRandom(0, 100);
    if (dice > 80) {
      return V(posicion.x + velocidad.x, posicion.y + velocidad.y);
    } else if (dice > 60) {
      return V(posicion.x, posicion.y + velocidad.y);
    } else if (dice > 40) {
      return V(posicion.x + velocidad.x, posicion.y);
    } else if (dice > 20) {
      return V(posicion.x + velocidad.y, posicion.y + velocidad.x);
    } else {
      return posicion;
    }
  }
}