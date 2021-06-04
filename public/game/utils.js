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
  entidades = []
  background(220);
  textAlign(CENTER, CENTER);
  textSize(50);
  text('GAME OVER', 200, 200);
}