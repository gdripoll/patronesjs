/**
 * Simulamos la existencia de una caja de ahorro para distintas personas.
 * 
 * Contexto:
 *    Pepe    - Trabajador, sin mucho dinero pero lleno de deudas para pagar
 *    Juanito - Vendedor de cosas ilegales
 *    Natalia - Comerciante de un local de decoración
 * 
 * Consigna:
 *    Por distintos motivos hay distintos actores que necesitan estar al tanto
 *    del movimiento de dinero de algunas personas. A continuación la lista de
 *    personas que necesitan enterarse de los movimientos y su logica.
 * 
 *      - AFIP: Necesita estar al tanto de todos los depositos de dinero
 *        de todas las personas porque con eso calcula los impuestos de cada uno.
 *      - Agencia anti corrupción: El gobierno esta intentando atrapar a todos aquellos
 *        con actividades ilícitas por lo cual todos los depositos de mas de 50mil son
 *        considerados sospechosos.
 *      - Tarjeta de Credito: detecto que Natalia tiene muchas deudas y necesita saber
 *        cuando deposita plata para intimarla para que pague.
 *      - Jefe Mafia: Juanito vendio muchas cosas ilegales pero no le esta pagando
 *        a su jefe. El jefe muy enojado quiere saber cuando deposita plata asi lo
 *        "visita" y recupera algo de su plata.
 * 
 * 
 * Cada uno de estos actores necesitan saber cuando depositan plata. No todos quieren
 * saber lo que hacen todas las personas. La AFIP querra saber sobre todas las personas,
 * pero el Jefe Mafia no le interesa otra persona más allá de Juanito.
 * 
 * Notar que en el caso de Juanito tiene que enterarse la AFIP, el jefe mafia y la agencia
 * anti corrupción. Pero en el caso de Natalia esta la AFIP, la agencia anti corrupción y
 * la tarjeta de credito.
 * Cada persona tendrá cantidad distinta y distintos actores que les interesen algunas personas
 * y otras no.
 * 
 * 
 * Tarea:
 *      Cada uno de estos actores tienen que escribir por consola la información que recibieron,
 *      por ejemplo.
 * 
 *          console.log("AFIP: Natalia deposito 750")
 *          console.log("Agencia anti corrupcion: Natalia deposito 750 y es menos de 50mil")
 *
 *          console.log("Agencia anti corrupcion: Juanito deposito 100000, es sospechoso!!!!")
 * 
 *      No se pueden agregar "ifs", tal vez alguno, pero deberían ser muy pocos.
 *      Pueden modificar la clase CajaDeAhorro pero con muy poco codigo y SIN ifs.
 *      Pueden crear una clase nueva por cada "interesado" (AFIP, tarjeta de credito, etc)
 * 
 * 
 * Para pensar:
 * ¿Y si queremos detectar cuando se hace un retiro de plata que no se puede lograr por falta de fondos?
 */

// -------------------------------------
// PATRON OBSERVER
// -------------------------------------

class Entidad {
    constructor(name) {
        this.name = name
    }
    deposito(cliente, monto) {
        this.say("deposito", cliente, monto)
    }
    retiro(cliente, monto) {
        this.say("retiro", cliente, monto)
    }
    saldo(cliente) {
        this.say("saldo", cliente, cliente.getSaldo())
    }
    say(operacion, cliente, monto) {
        console.log(this.name, " -- AVISO! ", operacion, cliente.getName(), monto)
    }
}

class Afip extends Entidad {
    constructor(name) {
        super(name)
    }
    deposito(cliente, monto) {
        this.say("deposito", cliente, monto)
    }
    retiro(cliente, monto) {
    }
    saldo(cliente) {
    }
}
class Aac extends Entidad {
    constructor(name) {
        super(name)
    }
    deposito(cliente, monto) {
        if (monto > 1000) {
            this.say("deposito mayor a 1000", cliente, monto)
        }
    }
    retiro(cliente, monto) {
    }
    saldo(cliente) {
    }
}
class Mafia extends Entidad {
    constructor(name) {
        super(name)
    }
    deposito(cliente, monto) {
    }
    retiro(cliente, monto) {
    }
    saldo(cliente) {
    }
}
class Visa extends Entidad {
    constructor(name) {
        super(name)
    }
    deposito(cliente, monto) {
    }
    retiro(cliente, monto) {
    }
    saldo(cliente) {
    }
}
// -------------------------------------

class Informes {
    constructor(entidades) {
        this.entidades = entidades
    }
    deposito(cliente, monto) {
        // console.log("INFORME: deposito", cliente.getName(), monto)
        this.entidades.forEach(ent => {
            ent.deposito(cliente, monto)
        });
        this.saldo(cliente)
    }
    retiro(cliente, monto) {
        // console.log("INFORME: retiro", cliente.getName(), monto)
        this.entidades.forEach(ent => {
            ent.retiro(cliente, monto)
        });
        this.saldo(cliente)
    }
    saldo(cliente) {
        // console.log("INFORME: saldo", cliente.getName(), cliente.getSaldo())
        this.entidades.forEach(ent => {
            ent.saldo(cliente)
        });
    }
}

// -------------------------------------

class CajaDeAhorro {
    constructor(nombre, plataInicial, informes) {
        this.nombre = nombre
        this.total = plataInicial
        this.informes = informes

    }
    getName() {
        return this.nombre;
    }
    getSaldo() {
        return this.total;
    }

    ponerPlata(plata) {
        this.total += plata
        this.informes.deposito(this, plata)
    }

    sacarPlata(plata) {
        if (this.total >= plata) {
            this.total -= plata
            return plata
        }
        return 0
    }
}

const AFIP = new Afip("afip")
const AAC = new Aac("aac")
const MAFIA = new Mafia("mafia")
const VISA = new Visa("visa")

const entidades = {
    "pepe": [AFIP, AAC, VISA],
    "juan": [AFIP, AAC, MAFIA],
    "natalia": [AAC, VISA],
}

const clientes = {
    pepe: new CajaDeAhorro('Pepe Ventilete', 100, new Informes(entidades['pepe'])),
    juanito: new CajaDeAhorro('Juan Garcalieri', 500, new Informes(entidades['juan'])),
    natalia: new CajaDeAhorro('Natalia Buenaventura', 250, new Informes(entidades['natalia'])),
}

// NO TOCAR !
// -------------------------------------

clientes.pepe.ponerPlata(100)
clientes.pepe.ponerPlata(40)
clientes.pepe.sacarPlata(200) // puede sacar
clientes.pepe.ponerPlata(10)
clientes.pepe.ponerPlata(300)
clientes.pepe.sacarPlata(1000) // la operacion falla


clientes.juanito.ponerPlata(100000)
clientes.juanito.ponerPlata(200000)
clientes.juanito.sacarPlata(300500) // puede sacar todo


clientes.natalia.ponerPlata(250)
clientes.natalia.ponerPlata(20)
clientes.natalia.sacarPlata(250)
clientes.natalia.ponerPlata(750)
clientes.natalia.ponerPlata(150)

