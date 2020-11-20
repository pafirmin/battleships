import React from 'react'
import PlayerShip from './PlayerShips'

const ShipYard = () => {
  const fleet = [6, 4, 4, 3, 3, 3, 2, 2, 2, 2]

  return (
    <div>
      sfgdfgfgfg
      <div className="ship-yard" id="shipYard">
        {
          fleet.map((size, i) => {
            return <PlayerShip size={size} shipId={`ship-${i}`} key={i} />
          })
        }
      </div>
    </div>
  )
}

export default ShipYard
