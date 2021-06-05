// UTILS
// --------------------------------------------
function getRandom(min, max) {
  return Math.floor(Math.random() * max) + min;
}
function getRandomX() {
  return getRandom(0, CANVAS_WIDTH);
}
function getRandomY() {
  return getRandom(0, CANVAS_HEIGHT);
}

// FUNCIONES DE GEOMETRIA
// -------------------------------------
function getCircleBoundingPoints(x, y, radio, cant = 8) {
  results = []
  // x=x_origin+radio*(cos(deg*(pi/108)))
  // y=y_origin+radio*(sin(deg*(pi/108)))
  degARad = Math.PI / 180
  pasoAngulo = 360 / cant
  for (var ang = 0; ang < 360; ang += pasoAngulo) {
    const radian = ang * degARad
    const newX = x + (radio * Math.cos(radian))
    const newY = y + (radio * Math.sin(radian))
    results.push(V(newX, newY))
  }
  //rectos -- funcion original de 8 a fuerza bruta
  // results.push(V(x, y - radio)) // up
  // results.push(V(x + radio, y)) // right
  // results.push(V(x, y + radio)) // bottom
  // results.push(V(x - radio, y)) // left
  //45
  // results.push(V(x, y).add(V(1, 1).normalize().mult(radio)))
  // results.push(V(x, y).add(V(1, -1).normalize().mult(radio)))
  // results.push(V(x, y).add(V(-1, 1).normalize().mult(radio)))
  // results.push(V(x, y).add(V(-1, -1).normalize().mult(radio)))
  return results
}
function isPointInsideRect(px, py, rx, ry, ancho, largo) {
  return ((px >= rx && px <= rx + ancho) && (py >= ry && py <= ry + largo))
}

// FUNCIONES VARIAS DE PRUEBA
// -------------------------------------
function mousePressed() {
  let bala = new Bala(200, 200, p5.Vector.random2D())
  entidades.push(bala)
  bala = new Bala(200, 210, p5.Vector.random2D())
  entidades.push(bala)
  bala = new Bala(210, 210, p5.Vector.random2D())
  entidades.push(bala)
  bala = new Bala(210, 200, p5.Vector.random2D())
  entidades.push(bala)
}
function mouseDragged() { // posicion del mouse
  document.querySelector(".px-3 h1").innerHTML = "[" + mouseX + "," + mouseY + "]"
  return false;
}
function mouseReleased() {// posicion del mouse
  document.querySelector(".px-3 h1").innerHTML = "Patrones de diseño"
}


// PANTALLAS EXTRA
// -------------------------------------
function GameOverScreen() {
  // console.log("GAME OVER ------------------------")
  // entidades = [] // no puedo...
  background(220);
  textAlign(CENTER, CENTER);
  textSize(50);
  text('GAME OVER', 200, 200);
}