import { useState } from 'react'
import './App.css'

function Personaje({ nombre, vida, ataque, atacar }) {
  return (
    <div>
      <h1>{nombre}</h1>
      <p>Vida: {vida}</p>
      <p>Ataque: {ataque}</p>

      <button onClick={atacar} disabled={vida === 0}>
        {vida === 0 ? "Derrotado" : "Atacar"}
      </button>
    </div>
  )
}

function App() {

  const [personajes, setPersonajes] = useState([
    { nombre: "Guerrero", vida: 100, ataque: 20, mensaje: "" },
    { nombre: "Mago", vida: 80, ataque: 15, mensaje: "" },
    { nombre: "Arquero", vida: 90, ataque: 25, mensaje: "" },
    { nombre: "Ladron", vida: 70, ataque: 30, mensaje: "" }
  ])

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