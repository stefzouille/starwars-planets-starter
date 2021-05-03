import { useState } from "react"
import Planet from "./Planet"

const Planets = () => {
  const [planets, setPlanets] = useState([])

  return (
    <>
      <div className="row">
        {planets.map((planet) => {
          return <Planet key={planet.name} planet={planet} />
        })}
      </div>
    </>
  )
}

export default Planets
