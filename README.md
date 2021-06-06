# Instrucciones

## Instalar

```bash
npm install
```

Renombrar los archivos:

- public/classes.example.js => public/classes.js
- public/main.example.js => public/main.js

## Correr

Si tenemos nodejs instalado:

```bash
npm run dev
```

Si no lo tenemos instalado:

- Abrímos el archivo public/index.html con un browser.

---

# Recomendaciones

- _The coding train_ -- Tutorial P5 Youtube
- _High score_ -- documental Netflix
- https://refactoring.guru/es -- Sitio recomentado
- _Gang of four: design patterns_ (?) gamma helm johson vlissides -- libro de patrones

---

# Desarrollo

Todo esta púublico en https://github.com/gdripoll/patronesjs

## Branch `curso`

### `class.sujetos.js`

- Clase SubejoAbstracto
- Clases para tres tipos de nave( Navegrande, NaveChica, Palito ), en `class.sujetos.js`. Todas heredan de SujetoAbstracto
- Clase para Equipo. Hereda de SujetoAbstracto

### `class.movimientos.js`

- Clase moveCommon con movimiento lineal en X e Y
- Clase moveHorizontal con movimiento sólo en las X
- Clase moveVertical con movimiento sólo en las Y
- Clase moveRandom con movimiento aleatorio cada 1 segundo en rangos de 10-100 predefinidos. Movimiento comun, X, Y, quieto

### `class.parcas.js`

- Clase ParcaObserver para mensajeria cuando muere la nave
- Clase CapitanObserver mata a todos los componentes del equipo de la nave asociada.
- Class EquipoObserver chequea la cantidad de equipos. Si la cantidad es menor a dos dispara la pantala GameOverScreen.

### `class.armas.js`

- Class Bala, hereda de SujetoAbstracto
- Class RandomGun (strategy) dispara dos veces por segundo en una dirección ramdom.
- Class DummyGun (strategy) no dispara, necesario para implementar naves o props que no disparen.
- Class SniperGun (strategy) dispara dos veces por segundo en la direccion del "target". Este se define como el objeto del otro equipo más cercano al tirador.

**KNOWN BUG**: El `SniperGun` le esta tirando no sólo a las naves del otro equipo, sino tambien a las balas.
**POSIBLE SOLUCION**: Deberíamos tener un juego de entidades distinto para todos aquellos `props` que no son targets; o bien un indicador de `combatiente` para que cualquier algoritmo de AI no confunda las paredes con los enemigos.

### `utils.js`

- Funciones de random genéricas, random para X acotado al tamano del canvas e Y acotado al tamano del canvas.
- Funciones de drag y release para ver coordenadas dentro del canvas en el h1 del titulo. Facilita reconocer las naves por su posición.
- Función de presed que dispara 4 balas random desde el centro de la pantalla.
- Función de pantalla GameOVer que elimina todos los objetos, limpia la pantalla y pone el cartel de GAME OVER.

**NOTA**: A la pantalla de GameOver no le agregué fonts ni mas diseno porque no podia mandar binarios (ttf)

## Branch `extra`

- Se agregó clase Muro de tipo SujetoAbstracto, que implementa un rectángulo de posición y tamaño definible. Los muros no se mueven, pero si quitan 2 de vida a las naves con cada contacto. Se desarrollo los calculos para detectar choques para para naves redondas con 8 puntos de contacto, pero con el mismo algoritmo se podrían generar y chequear n puntos.
- `getCircleBoundingPoints` Dejé comentada la versión básica de la detección en 8 puntos (en `utils.js`) que armé en base a las funciones que se proveyeron en el curso, pero luego opté por buscar las fórmulas reales con sin/cos en internet e implementé una versión que recibe por parámetro la cantidad de puntos a generar.
- `isPointInsideRect` recibe un punto y la info de un rectángulo (x,y,ancho,alto) y define si el punto está dentro del cuadrado. Esta función la armé sin mirar internet.

## Branch `develop`

- Agregué una clase `ScreenManager` (`class.pantalla.js`) que maneja un array de pantallas de tipo `ScreenAbstract`. Tiene la capacidad de jumpTo a cualquiera de las pantalla y dibujar una u otra.
- Se implemento el `ScreenManager` en el setup y loop principal para permitir desde cualquier lugar poder saltar a otra pantalla con `ScrManager.jumpTo('gameover')`
