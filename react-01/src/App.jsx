import { useState } from 'react'
import './App.css'

function Personaje({ nombre, vida, ataque, atacar }) {
  return (
    <div>
      <h1>{nombre}</h1>
      <p>Vida: {vida}</p>
      <p>Ataque: {ataque}</p>
      <p>{vida === 0 ? "Estado: Derrotado" : vida <= 30 ? "Estado: Herido" : "Estado: Activo"}</p>
      {vida === 0 && <p>Este personaje ha sido derrotado</p>}
      {vida <= 30 && vida > 0 && <p>Este personaje está herido</p>}
      {vida > 0 && vida <= 30 && <p>¡Cuidado! Le queda poca vida</p>}
      {vida > 30 && vida <= 100 && <p>El personaje está en buenas condiciones</p>}

      <button onClick={atacar} disabled={vida === 0}>
        {vida === 0 ? "Derrotado" : "Atacar"}
      </button>
    </div>
  )
}

function App() {

  const tareas = ["Estudiar React", "Practicar JavaScript", "Subir proyecto a GitHub", "Aprender componentes"]

  const [nombre, setNombre] = useState("")

  const [contador, setContador] = useState(0)

  const [personajes, setPersonajes] = useState([
    { nombre: "Guerrero", vida: 100, ataque: 20, mensaje: "" },
    { nombre: "Mago", vida: 80, ataque: 15, mensaje: "" },
    { nombre: "Arquero", vida: 90, ataque: 25, mensaje: "" },
    { nombre: "Ladron", vida: 70, ataque: 30, mensaje: "" }
  ])


  const personajesEjemplo = [
  { nombre: "Guerrero", vida: 100, ataque: 20 },
  { nombre: "Mago", vida: 80, ataque: 15 },
  { nombre: "Arquero", vida: 90, ataque: 25 }
]

  function atacarPersonaje(atacante, objetivo, damage) {
    setPersonajes(function (prevPersonajes) {
      return prevPersonajes.map(function (personaje) {
        if (personaje.nombre === objetivo) {
          if (personaje.vida === 0) {
            return personaje
          }
          const nuevaVida = Math.max(0, personaje.vida - damage)
          return {
            ...personaje,
            vida: nuevaVida,
            mensaje: nuevaVida === 0
              ? objetivo + " está derrotado"
              : atacante + " atacó a " + objetivo + ". Vida restante: " + nuevaVida
          }
        }
        return personaje
      })
    })
  }

  return (
    <>
      <p>Contador: {contador}</p>
      <button onClick={function () {
        setContador(function (valorAnterior) {
          return valorAnterior + 1
        })
      }}>
        Sumar
      </button>

      <button onClick={function () {
        setContador(function (valorAnterior) {
          if (valorAnterior <= 0) {
            return 0
          }
          return valorAnterior - 1
        })
      }}>
        Restar
      </button>

      <button onClick={function () {
        setContador(0)
      }}>
        Reiniciar
      </button>

      <h2>Escribe tu nombre</h2>

      <input
        type="text"
        value={nombre}
        onChange={function (evento) {
          setNombre(evento.target.value)
        }}
      />
      <p>{nombre === "" ? "Escribe tu nombre" : "Tu nombre es: " + nombre}</p>


      <h2>Mi componente</h2>
      <TarjetaPersonaje nombre="Guerrero" vida={100} ataque={20} />
      <TarjetaPersonaje nombre="Mago" vida={80} ataque={15} />

      <button onClick={function () {
        setNombre("")
      }}>
        Borrar nombre
      </button>

      <p>Caracteres: {nombre.length}</p>

      <h2>Mis tareas</h2>

      {tareas.map(function (tarea) {
        return <p key={tarea}>{tarea}</p>
      })}


      <h2>Personajes de prueba</h2>

      {personajesEjemplo.map(function (personaje) {
        return <p key={personaje.nombre}>{personaje.nombre}: Vida: {personaje.vida}, Ataque: {personaje.ataque}</p>
      })}

      <h2>Lista de personajes</h2>

      {personajes.map(function (personaje) { 
        let objetivo = ""

        if (personaje.nombre === "Guerrero") {
          objetivo = "Mago"
        } else if (personaje.nombre === "Mago") {
          objetivo = "Arquero"
        } else if (personaje.nombre === "Arquero") {
          objetivo = "Guerrero"
        } else if (personaje.nombre === "Ladron") {
          objetivo = "Guerrero"
        }
        return (
          <div key={personaje.nombre}>
            <Personaje
              nombre={personaje.nombre}
              vida={personaje.vida}
              ataque={personaje.ataque}
              atacar={() => atacarPersonaje(personaje.nombre, objetivo, personaje.ataque)}
            />
            <p>{personaje.mensaje}</p>
            <p>Objetivo: {objetivo}</p>
          </div>
        )
      })}
    </>
  )
}

export default App

function TarjetaPersonaje(props) {
  return (
    <div>
      <h3>{props.nombre}</h3>
      <p>Vida: {props.vida}</p>
      <p>Ataque: {props.ataque}</p>
    </div>
  )
}
