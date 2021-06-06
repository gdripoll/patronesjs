// ------------------------------------------------------
// SCREEN MANAGER
// ------------------------------------------------------
class ScreenManager {
  constructor() {
    this.screens = {};
    this.current = "";
  }
  add(screen) {
    this.screens[screen.name] = screen;
  }
  jumpTo(name) {
    console.log("ScreenManager:jumpTo -- ", name);
    this.current = name;
    this.screens[name].setup();
  }
  draw() {
    this.screens[this.current].draw();
  }
  // MOUSE EVENTS
  mousePressed() {
    return this.screens[this.current].mousePressed();
  }
  mouseDragged() {
    return this.screens[this.current].mouseDragged();
  }
  mouseReleased() {
    return this.screens[this.current].mouseReleased();
  }
  mouseClicked() {
    return this.screens[this.current].mouseClicked();
  }
}
// ------------------------------------------------------
// SCREENS
// ------------------------------------------------------
class ScreenAbstract {
  constructor(name, mensajes) {
    this.name = name;
    this.mensajes = mensajes;
  }
  setup() {
    entidades = [];
  }
  draw() {
    throw new Error("must be implemented.");
  }
  // MOUSE EVENTS
  mousePressed() {
    return false;
  }
  mouseDragged() {
    // posicion del mouse
    document.querySelector("h1").innerHTML = "[" + parseInt(mouseX) + "," + parseInt(mouseY) + "]";
    return false;
  }
  mouseReleased() {
    // posicion del mouse
    document.querySelector("h1").innerHTML = "Patrones de diseño";
    return false;
  }
  mouseClicked() {
    return false;
  }
}

class ScreenMatch extends ScreenAbstract {
  constructor(name, mensajes, layout) {
    super(name, mensajes);
    this.layout = layout;
  }
  setup() {
    super.setup();
    // ---OBSERVERS--------------------
    let parca = new ParcaObserver();
    // ---EQUIPOS----------------------
    let equipo1 = [];
    let equipo2 = [];
    entidades.push(this.layout.getWalls());
    // ---EQUIPO1----------------------
    for (var i = 0; i < 2; i++) {
      const n = new NaveGrande(getRandomX(), getRandomY(), new MoveHorizontal(), new SniperGun(equipo1, equipo2));
      n.subscribir(parca);
      equipo1.push(n);
    }
    for (var i = 0; i < 4; i++) {
      const n = new NaveChica(getRandomX(), getRandomY(), new MoveRandom(), new SniperGun(equipo1, equipo2));
      n.subscribir(parca);
      equipo1.push(n);
    }
    for (var i = 0; i < 10; i++) {
      const n = new Palito(getRandomX(), getRandomY(), new MoveCommon(), new DummyGun(equipo1));
      n.subscribir(parca);
      equipo1.push(n);
    }
    let e1 = new Equipo(equipo1, "green");
    entidades.push(e1);
    // pCap1 = new CapitanObserver(equipo1);
    // equipo1[0].subscribir(pCap1);

    // ---EQUIPO2----------------------
    for (var i = 0; i < 2; i++) {
      const n = new NaveGrande(getRandomX(), getRandomY(), new MoveHorizontal(), new SniperGun(equipo2, equipo1));
      n.subscribir(parca);
      equipo2.push(n);
    }
    for (var i = 0; i < 4; i++) {
      const n = new NaveChica(getRandomX(), getRandomY(), new MoveRandom(), new SniperGun(equipo2, equipo1));
      n.subscribir(parca);
      equipo2.push(n);
    }
    for (var i = 0; i < 10; i++) {
      const n = new Palito(getRandomX(), getRandomY(), new MoveCommon(), new DummyGun(equipo2));
      n.subscribir(parca);
      equipo2.push(n);
    }
    const e2 = new Equipo(equipo2, "red");
    entidades.push(e2);
    // pCap2 = new CapitanObserver(equipo2);
    // equipo2[0].subscribir(pCap2);
    MensajesGeneral.agregar("READY PLAYERS!", 120);
    this.cantPlayers = entidades.length - 1;
  }
  draw() {
    // CICLO DEL JUEGO
    background(0);
    if (entidades.length < this.cantPlayers) {
      MensajesGeneral.agregar("Partido terminado!", 60);
      ScrManager.jumpTo("gameover");
    }
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
    MensajesGeneral.mostrar();
  }
  // ESPECIFICAS
  buildProps() {
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
    return new Equipo(props, "blue");
  }
}
class ScreenPointsTest extends ScreenAbstract {
  constructor(name, mensajes) {
    super(name, mensajes);
  }
  setup() {
    super.setup();
  }
  draw() {
    // PRUEBA DE PUNTOS DE CIRCULO
    background(255);
    const origen = { x: width / 2, y: height / 2 };
    const radio = 200;
    const cantidad = 32;
    const puntos = getCircleBoundingPoints(origen.x, origen.y, radio, cantidad);
    strokeWeight(1);
    circle(origen.x, origen.y, radio * 2);
    push();
    strokeWeight(4);
    stroke("red");
    point(origen.x, origen.y);
    push();
    noStroke();
    textAlign(CENTER, CENTER);
    text(cantidad + " puntos.", origen.x, origen.y - 50);
    pop();
    stroke("blue");
    for (var p in puntos) point(puntos[p].x, puntos[p].y);
    pop();
  }
}
class ScreenGameOver extends ScreenAbstract {
  constructor(name, mensajes, layout) {
    super(name, mensajes, layout);
  }
  setup() {
    super.setup();
    background(0);
  }
  draw() {
    fill(random(0, 255), random(0, 255), random(0, 255), random(0, 255));
    noStroke();
    circle(random(0, width), random(0, height), random(15, 25));
    // cartel
    fill(255);
    stroke(255);
    textAlign(CENTER, CENTER);
    textSize(100);
    text("GAME", width / 2, height / 3);
    text("OVER", width / 2, (height / 3) * 2);
  }
}
class ScreenStart extends ScreenAbstract {
  constructor(name, mensajes, layout) {
    super(name, mensajes, layout);
  }
  setup() {
    super.setup();
    background(0);
    let b1 = new Button(uX(30), uY(30), uX(50), uY(12), "-= Start =-", 50, color(255), color(0, 0, 255, 180));
    b1.onClick = () => {
      ScrManager.jumpTo("match");
    };
    entidades.push(b1);
    let b2 = new Button(uX(30), uY(45), uX(50), uY(12), "* Demo círculo *", 50, color(255), color(0, 0, 255, 180));
    b2.onClick = () => {
      ScrManager.jumpTo("points");
    };
    entidades.push(b2);
  }
  draw() {
    push();
    fill(random(0, 255), random(0, 255), random(0, 255), random(0, 255));
    noStroke();
    circle(random(0, width), random(0, height), random(15, 25));
    pop();

    // draw
    for (let i = 0; i < entidades.length; i++) entidades[i].tick();
  }
  mouseClicked() {
    for (let i = 0; i < entidades.length; i++) if (entidades[i].click) entidades[i].click();
  }
}

class Componente {
  constructor(x, y, ancho, alto) {
    this.posicion = V(x, y);
    this.ancho = ancho;
    this.alto = alto;
    this.onClick = () => {
      console.log(x + "," + y + ": onClick not implemented.");
    };
  }
  tick() {
    this.draw();
  }
  draw() {
    throw new Error("Must be implemented");
  }
  click() {
    if (isPointInsideRect(mouseX, mouseY, this.posicion.x, this.posicion.y, this.ancho, this.alto)) {
      this.onClick();
    }
  }
}
class Button extends Componente {
  constructor(x, y, ancho, alto, texto, size = 15, color, bgColor) {
    super(x, y, ancho, alto);
    this.size = size;
    this.texto = texto;
    this.color = color;
    this.bgColor = bgColor;
  }
  draw() {
    push();
    fill(this.bgColor);
    stroke(this.bgColor);
    rect(this.posicion.x, this.posicion.y, this.ancho, this.alto);
    fill(this.color);
    stroke(this.color);
    textAlign(CENTER, CENTER);
    textSize(this.size);
    text(this.texto, this.posicion.x, this.posicion.y, this.ancho, this.alto);
    pop();
  }
}
