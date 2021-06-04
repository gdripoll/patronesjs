
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
    strokeWeight(4)
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

// ARMAS
// -------------------------------
class RandomGun {
  constructor(entidades) {
    this.entidades = entidades
    this.loop = 0
  }
  disparar(shooter) {
    if (this.loop++ % 30 == 0) {
      let direccion = p5.Vector.random2D()
      direccion.mult(shooter.radio + 1)
      let bala = new Bala(shooter.posicion.x + direccion.x, shooter.posicion.y + direccion.y, direccion)
      this.entidades.push(bala)
    }
  }
}

// Sujetos que no disparan
class DummyGun {
  disparar() {

  }
}

class SniperGun {
  constructor(army, enemy) {
    this.army = army
    this.enemy = enemy
    this.loop = 0
  }
  disparar(shooter) {
    if (this.loop++ % 30 == 0 && this.enemy.length) {
      let direccion = this.findMeATarget(shooter) //p5.Vector.random2D()
      direccion.mult(shooter.radio + 1)
      let bala = new Bala(shooter.posicion.x + direccion.x, shooter.posicion.y + direccion.y, direccion)
      this.army.push(bala)
    }
  }
  // TODO: le tira a las balas del enemigo!!!
  findMeATarget(shooter) {
    var closest = 0
    var minDist = 9999
    for (var i = 0; i < this.enemy.length - 1; i++) {
      const dist = distancia(shooter.posicion, this.enemy[i].posicion)
      // console.log("dist>>", dist, minDist)
      if (dist < minDist) {
        minDist = dist
        closest = i
      }
    }

    // const aDondeVa = 
    var res1 = vectorDireccion(shooter.posicion, this.enemy[closest].posicion)
    var res2 = res1.normalize()
    // console.log({
    //   "from": shooter.posicion,
    //   "fromObj": shooter,
    //   "to": this.enemy[closest].posicion,
    //   "toObj": this.enemy[closest],
    //   "distancia": minDist,
    //   "closest": closest
    // })
    return res2
  }
}
