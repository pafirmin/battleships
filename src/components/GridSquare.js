import React, { useEffect, useState } from 'react'

const GridSquare = (props) => {
  const { coords, recieveHit, isShip, placeShip, player } = props
  const [style, setStyle] = useState('clear')
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    if (isShip) {
      setStyle(player === 'computer' ? 'clear' : 'ship')
    }
  })

  const handleClick = () => {
    if (!clicked) {
      setClicked(true)
      makeShot()
    } else {
      console.log('already clicked')
    }
  }

  const makeShot = () => {
    if (isShip) {
      recieveHit(coords);
      setStyle('hit');
    } else {
      setStyle('miss');
      props.switchPlayer()
    }
  }

  const allowDrop = (e) => {
    e.preventDefault();
  }

  const drop = (e) => {
    if (player === 'player') {
      e.preventDefault();
      var data = e.dataTransfer.getData("text");
      placeShip(coords, data);
    }
  }


  return (
    <div
      onClick={() => handleClick()}
      className={`grid-square ${style} ${player}`}
      onDrop={(e) => drop(e)}
      onDragOver={(e) => allowDrop(e)}
    >

    </div>
  )
}

export default GridSquare
