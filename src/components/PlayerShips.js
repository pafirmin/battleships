import React from 'react'

const PlayerShips = (props) => {

  let rotated = false

  function drag(e) {
    const data =
      JSON.stringify({
        size: e.target.dataset.size,
        offsetY: Math.floor(
          (e.clientY - e.target.getBoundingClientRect().top) / 50),
        offsetX: Math.floor(
          (e.clientX - e.target.getBoundingClientRect().left) / 50),
        rotated: rotated,
        id: props.shipId
      });
    e.dataTransfer.setData('text', data);
  }

  const handleClick = (e) => {
    if (!rotated) {
      e.target.parentNode.style.transform = 'rotate(90deg)'
    } else {
      e.target.parentNode.style.transform = ''
    }
    rotated = !rotated
  }

  const createShip = () => {
    let children = []
    for (let i = 0; i < props.size; i++) {
      children.push(
        <div className="grid-square"></div>
      )
    }
    return children
  }

  return (
    <div>
      <div className="player-ship ship"
        id={props.shipId}
        draggable="true"
        data-size={props.size}
        onDragStart={(e) => drag(e)}
        onClick={(e) => handleClick(e)}
      >
        {createShip()}
      </div>
    </div>
  )
}

export default PlayerShips
