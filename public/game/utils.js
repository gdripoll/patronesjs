// UTILS
// --------------------------------------------
// function getRandom(min, max) {
//   return Math.floor(Math.random() * max) + min;
// }
function getRandomX() {
  return random(0, width);
}
function getRandomY() {
  return random(0, height);
}

// FUNCIONES DE GEOMETRIA
// -------------------------------------
function getCircleBoundingPoints(x, y, radio, cant = 8) {
  results = [];
  // x=x_origin+radio*(cos(deg*(pi/108)))
  // y=y_origin+radio*(sin(deg*(pi/108)))
  degARad = Math.PI / 180;
  pasoAngulo = 360 / cant;
  for (var ang = 0; ang < 360; ang += pasoAngulo) {
    const radian = ang * degARad;
    const newX = x + radio * Math.cos(radian);
    const newY = y + radio * Math.sin(radian);
    results.push(V(newX, newY));
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
  return results;
}
function isPointInsideRect(px, py, rx, ry, ancho, largo) {
  const res = px >= rx && px <= rx + ancho && py >= ry && py <= ry + largo;
  // console.log(res, px, py, rx, ry, ancho, largo)
  return res;
}

function uX(cant) {
  return (width / 100) * cant;
}
function uY(cant) {
  return (height / 100) * cant;
}
