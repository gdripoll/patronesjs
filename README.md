# Instalar

```bash
npm install
```

Renombrar los archivos:
- public/classes.example.js => public/classes.js
- public/main.example.js    => public/main.js

# Correr

Si tenemos nodejs instalado:
```bash
npm run dev
```

Si no lo tenemos instalado:
- Abrímos el archivo public/index.html con un browser.


# Apuntes

// the coding train
// high score documentary
// https://refactoring.guru/es
// contactarse por mail a oclesnd@globalhitss.com
// gang of four design patterns >? gamma helm johson vlissides


# Desarrollo
(no tengo acentos en la maquina que estoy escribiendo)

Todo esta publico en https://github.com/gdripoll/patronesjs
## Curso (`master` en el repo)
  
### ```class.sujetos.js```
- Clase SubejoAbstracto
- Clases para tres tipos de nave( Navegrande, NaveChica, Palito ), en ```class.sujetos.js```. Todas heredan de SujetoAbstracto
- Clase para Equipo. Hereda de SujetoAbstracto

### ```class.movimientos.js```
- Clase moveCommon con movimiento lineal en X e Y
- Clase moveHorizontal con movimiento solo en las X
- Clase moveVertical con movimiento solo en las Y
- Clase moveRandom con moviemiento aleatorio cada 1 segundo en rangos de 10-100 predefinidos. Movimiento comun, X, Y, quieto

### ```class.parcas.js```
- Clase ParcaObserver para mensajeria cuando muere la nave
- Clase CapitanObserver mata a todos los componentes del equipo de la nave asociada.
- Class EquipoObserver chequea la cantidad de equipos. Si la cantidad es menor a dos dispar la pantala GameOverScreen.

### ```class.armas.js```
- Class Bala, hereda de SujetoAbstracto
- Class RandomGun (strategy) dispara dos veces por segunto en una direccion ramdom
- Class DummyGun (strategy) no dispara, necesario para implementar naves o props que no disparen
- Class SniperGun (strategy) dispara dos veces por segundo en la direccion del "target". Este se define como el objeto del otro equipo mas cercano al tirador

**KNOWN BUG**: El `SniperGun` le esta tirando no solo a las naves del otro equipo, sino tambien a las balas.
**POSIBLE SOLUCION**: Deberiamos tener un juego de entidades distinto para todos aquellos `props` que no son targets; o bien un indicador de `combatiente` para que cualquier algoritmo de AI no confunda las paredes con los enemigos.

### ```utils.js```
- Funciones de random genericas, random para X acotado al tamano del canvas e Y acotado al tamano del canvas.
- Funciones de drag y release para ver coordenadas dentro del canvas en el h1 del titulo. Facilita reconocer las naves por su posicion
- Funcion de presed que dispara 4 balas random desde el centro de la pantalla.
- Funcion de pantalla GameOVer que elimina todos los objetos, limpia la pantalla y pone el cartel de GAME OVER.

**NOTA**: A la pantalla de GameOver no le agregue fonts ni mas diseno porque no podia mandar binarios (ttf)
