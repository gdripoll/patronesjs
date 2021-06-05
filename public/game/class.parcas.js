// PARCAS
// --------------------------------------------
class ParcaObserver {
  constructor() {
    // console.log("ParcaObserver:constructor");
  }
  murio(sujeto) {
    // console.log("ParcaObserver:murio -- ", parseInt(sujeto.posicion.x), parseInt(sujeto.posicion.y))
    MensajesGeneral.agregar(
      "MUERTE en [" +
      parseInt(sujeto.posicion.x) +
      "," +
      parseInt(sujeto.posicion.y) +
      "]",
      60
    );
  }
}
class CapitanObserver {
  constructor(army) {
    this.army = army;
  }
  murio(sujeto) {
    MensajesGeneral.agregar(
      "MUERTE en [" +
      parseInt(sujeto.posicion.x) +
      "," +
      parseInt(sujeto.posicion.y) +
      "]",
      60
    );
    for (var unit = 0; unit < this.army.length; unit++) {
      if (this.army[unit] != sujeto) this.army[unit].sacarVida(this.army[unit].getVida());
    }
  }
}

class EquipoObserver {
  constructor(equipos) {
    this.equipos = equipos
  }
  murio(equipo) { // murio un equipo
    // console.log(this.equipos.length)
    if (this.equipos.length < 3) {
      GameOverScreen()
    }
  }
}