import React, { useEffect, useState } from 'react';
import { Ship } from './Ship';
import GridSquare from './GridSquare';
import _ from 'lodash';

const GameBoard = () => {
  const [ships, setShips] = useState([Ship([[1, 1], [1, 2], [1, 3]])]);

  useEffect(() => {
    console.log(ships)
    if (ships.every(ship => ship.isSunk() === true)) {
      console.log('winner');
    }
  }, [ships])

  const placeShip = (coords, data) => {
    const coordArr = []
    for (let i = 0; i < data; i++) {
      coordArr.push([coords[0], coords[1] + i])
    }
    addShip(coordArr)
  }

  const addShip = (coords) => {
    const arr = [...ships];
    arr.push(Ship(coords));
    setShips(arr);
  }

  const isShip = (coords) => {
    return ships.some(ship => ship.coords.some(coord => _.isEqual(coord, coords)));
  }

  const findShip = (coords) => {
    for (const ship of ships) {
      if (ship.coords.includes(coords)) {
         return ship
      } 
    }
  }

  const recieveHit = (coords) => {
    const ship = findShip(coords);
    const index = ship.coords.indexOf(coords);
    ship.coords[index] = 'x';
    const arr = [...ships];
    setShips(arr);
  }

  const createGrid = () => {
    let children = []
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        children.push(
          <GridSquare recieveHit={recieveHit} coords={[i, j]} isShip={isShip([i, j])} placeShip={placeShip}/>)
      }
    }
    return children
  }

  return (
    <div className="game-board">
      {createGrid()}
      <button onClick={()=> addShip([[5, 5], [5, 6], [5, 7]])}>Click</button>
    </div>
  )
}

export default GameBoard 
