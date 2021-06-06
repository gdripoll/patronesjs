// MANEJADOR DE PANTALLAS

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
}

// PANTALLAS
class ScreenAbstract {
  constructor(name, mensajes) {
    this.name = name;
    this.mensajes = mensajes;
  }
  setup() {
    throw new Error("must be implemented.");
  }
  dras() {
    throw new Error("must be implemented.");
  }
}

class ScreenMatch extends ScreenAbstract {
  constructor(name, mensajes) {
    super(name, mensajes);
  }
  setup() {
    // ---OBSERVERS--------------------
    let parca = new ParcaObserver();
    let gameOver = new EquipoObserver(entidades);
    // ---EQUIPOS----------------------
    let equipo1 = [];
    let equipo2 = [];
    let props1 = [];
    // ---PROPS------------------------
    props1.push(
      new Muro(70, 75, 8, 250, new MoveDummy(), new DummyGun(equipo1))
    );
    props1.push(
      new Muro(330, 75, 8, 250, new MoveDummy(), new DummyGun(equipo1))
    );
    props1.push(
      new Muro(130, 100, 150, 8, new MoveDummy(), new DummyGun(equipo1))
    );
    props1.push(
      new Muro(130, 300, 150, 8, new MoveDummy(), new DummyGun(equipo1))
    );
    props1.push(
      new Muro(190, 200, 25, 25, new MoveDummy(), new DummyGun(equipo1))
    );
    let props = new Equipo(props1, "blue");
    entidades.push(props);

    // ---EQUIPO1----------------------
    for (var i = 0; i < 2; i++) {
      const n = new NaveGrande(
        getRandomX(),
        getRandomY(),
        new MoveHorizontal(),
        new SniperGun(equipo1, equipo2)
      );
      n.subscribir(parca);
      equipo1.push(n);
    }
    for (var i = 0; i < 4; i++) {
      const n = new NaveChica(
        getRandomX(),
        getRandomY(),
        new MoveRandom(),
        new SniperGun(equipo1, equipo2)
      );
      n.subscribir(parca);
      equipo1.push(n);
    }
    for (var i = 0; i < 10; i++) {
      const n = new Palito(
        getRandomX(),
        getRandomY(),
        new MoveCommon(),
        new DummyGun(equipo1)
      );
      n.subscribir(parca);
      equipo1.push(n);
    }
    let e1 = new Equipo(equipo1, "green");
    entidades.push(e1);
    // pCap1 = new CapitanObserver(equipo1);
    // equipo1[0].subscribir(pCap1);

    // ---EQUIPO2----------------------
    for (var i = 0; i < 2; i++) {
      const n = new NaveGrande(
        getRandomX(),
        getRandomY(),
        new MoveHorizontal(),
        new SniperGun(equipo2, equipo1)
      );
      n.subscribir(parca);
      equipo2.push(n);
    }
    for (var i = 0; i < 4; i++) {
      const n = new NaveChica(
        getRandomX(),
        getRandomY(),
        new MoveRandom(),
        new SniperGun(equipo2, equipo1)
      );
      n.subscribir(parca);
      equipo2.push(n);
    }
    for (var i = 0; i < 10; i++) {
      const n = new Palito(
        getRandomX(),
        getRandomY(),
        new MoveCommon(),
        new DummyGun(equipo2)
      );
      n.subscribir(parca);
      equipo2.push(n);
    }
    const e2 = new Equipo(equipo2, "red");
    e2.subscribir(gameOver);
    entidades.push(e2);
    // pCap2 = new CapitanObserver(equipo2);
    // equipo2[0].subscribir(pCap2);
    MensajesGeneral.agregar("READY PLAYERS!", 120);
  }
  draw() {
    // CICLO DEL JUEGO
    background(0);
    if (entidades.length < 3) {
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
}
class ScreenPointsTest extends ScreenAbstract {
  constructor(name, mensajes) {
    super(name, mensajes);
  }
  setup() {}
  draw() {
    // PRUEBA DE PUNTOS DE CIRCULO
    background(255);
    const origen = { x: 200, y: 200 };
    const radio = 100;
    const puntos = getCircleBoundingPoints(origen.x, origen.y, radio);
    strokeWeight(1);
    circle(origen.x, origen.y, radio * 2);
    push();
    strokeWeight(4);
    stroke("red");
    point(origen.x, origen.y);
    stroke("blue");
    for (var p in puntos) point(puntos[p].x, puntos[p].y);
    pop();
  }
}
class ScreenGameOver extends ScreenAbstract {
  constructor(name, mensajes) {
    super(name, mensajes);
  }
  setup() {}
  draw() {
    // background(220);
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
