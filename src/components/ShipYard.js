import React from 'react'
import PlayerShip from './PlayerShips'

const ShipYard = () => {
  const fleet = [6, 4, 4, 3, 3, 3, 2, 2, 2, 2]

  return (
    <div className="ship-yard">
      {
        fleet.map((size, i) => {
          return <PlayerShip size={size} shipId={`ship-${i}`} />
        })
      }
    </div>
  )
}

export default ShipYard
