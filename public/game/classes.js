





// BALAS
// --------------------------------------------
class Bala extends SujetoAbstracto {
  constructor(x, y, direction) {
    super(x, y, direction)
    this.direction = direction.copy().normalize()
    this.velocidad = this.direction.copy().mult(4)
  }
  mover() {
    this.posicion.add(this.velocidad)
  }
  rebotar() {
    if (this.posicion.x < 0 || this.posicion.x > CANVAS_WIDTH) {
      this.sacarVida(this.getVida())
    }
    if (this.posicion.y < 0 || this.posicion.y > CANVAS_HEIGHT) {
      this.sacarVida(this.getVida())
    }
  }
  dibujar() {
    push()
    strokeWeight(2)
    point(this.posicion.x, this.posicion.y)
    pop()
  }
  chocar(otro) {
    return otro.chocarBala(this)
  }
  chocarNaveGrande(otro) {
    return otro.chocarBala(this);
  }
  chocarNaveChica(otro) {
    return otro.chocarBala(this);
  }
  chocarPalito(otro) {
    return otro.chocarBala(this);
  }
  chocarBala(otro) {
    if (this.posicion.x == otro.posicion.y && this.posicion.y == otro.posicion.y) {
      this.sacarVida(this.getVida())
      otro.sacarVida(otro.getVida())
    }
  }
}
