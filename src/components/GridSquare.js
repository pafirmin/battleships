import React, { useEffect, useState } from 'react'

const GridSquare = (props) => {
  const { coords, recieveHit, isShip} = props
  const [style, setStyle] = useState('clear')
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    if (isShip) {
      setStyle('ship')
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
      setStyle('miss')
    }
  }

  return (
    <div
      onClick={() => handleClick()}
      className={`grid-square ${style}`}
    >

    </div>
  )
}

export default GridSquare
