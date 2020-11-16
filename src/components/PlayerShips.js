import React from 'react'

const PlayerShips = () => {
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.dataset.size)
  }

  return (
    <div>
      <div className="player-ship" draggable="true" data-size="4" onDragStart={ (e) => drag(e) }>
        <div className="grid-square"></div>
        <div className="grid-square"></div>
        <div className="grid-square"></div>
        <div className="grid-square"></div>
      </div>
    </div>
  )
}

export default PlayerShips
