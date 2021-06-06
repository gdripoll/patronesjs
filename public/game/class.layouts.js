// ------------------------------------------------------
// LAYOUTS
// ------------------------------------------------------
class LayoutAbstracto {
  constructor(color) {
    this.wallColor = color;
  }
  getWalls() {
    throw new Error("must be implemented.");
  }
}
class LayoutVacio extends LayoutAbstracto {
  constructor(color) {
    super(color);
  }
  getWalls() {
    return new Equipo([], this.wallColor);
  }
}
class LayoutBasico extends LayoutAbstracto {
  constructor(color) {
    super(color);
  }
  getWalls() {
    let props = [];
    const uX = width / 10;
    const uY = height / 10;
    const thick = 10;
    const gun = new DummyGun([]);
    const mover = new MoveDummy();
    // vert
    props.push(new Muro(2 * uX, 2 * uY, thick, 6 * uY, mover, gun));
    props.push(new Muro(8 * uX, 2 * uY, thick, 6 * uY, mover, gun));
    // horiz
    props.push(new Muro(3.5 * uX, 2 * uY, 3 * uX, thick, mover, gun));
    props.push(new Muro(3.5 * uX, 8 * uY, 3 * uX, thick, mover, gun));
    // center
    props.push(new Muro((width - 40) / 2, (height - 40) / 2, 40, 40, mover, gun));
    return new Equipo(props, this.wallColor);
  }
}
