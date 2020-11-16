import React, { useEffect, useState } from 'react'

const GridSquare = (props) => {
  const { coords, recieveHit, isShip, placeShip} = props
  const [style, setStyle] = useState('clear')
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    if (isShip) {
      setStyle('ship')
    }
  })

  const handleClick = () => {
    if (!clicked) {
      console.log(coords)
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
      setStyle('miss')
    }
  }

  const allowDrop = (e) => {
    e.preventDefault();
  }

  const drop = (e) => {
    e.preventDefault();
    var data = e.dataTransfer.getData("text");
    placeShip(coords, data);
  }


  return (
    <div
      onClick={() => handleClick()}
      className={`grid-square ${style}`}
      onDrop={(e) => drop(e)}
      onDragOver={(e) => allowDrop(e)}
    >

    </div>
  )
}

export default GridSquare
