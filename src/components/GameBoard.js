import React, { useEffect, useState } from 'react';
import { Ship } from './Ship';
import GridSquare from './GridSquare';
import _ from 'lodash';

const GameBoard = (props) => {
  const [ships, setShips] = useState([]);

  useEffect(() => {
    if (ships.every(ship => ship.isSunk() === true)) {
      console.log('winner');
    }
  }, [ships])



  const placeShip = (coords, data) => {
    const shipData = JSON.parse(data)
    const coordArr = getCoordArray(coords, shipData)

    if (validateShip(coordArr)) {
      addShip(coordArr)
      document.getElementById(shipData.id).remove()
    }
  }

  const getCoordArray = (coords, obj) => {
    const coordArr = []

    if (obj.rotated) {
      for (let i = 0; i < obj.size; i++) {
        coordArr.push([coords[0], coords[1] + i - obj.offsetX]);
      }
    } else {
      for (let i = 0; i < obj.size; i++) {
        coordArr.push([coords[0] + i - obj.offsetY, coords[1]]);
      }
    }
    return coordArr;
  }

  const addRandomShips = () => {
    const shipSizes = [6, 4, 4, 3, 3, 3, 2, 2, 2, 2]
    let shipArr = []
    
    shipSizes.map((size) => {
      let coordArr = generateShip(size)
      while (!validateShip(coordArr, shipArr)) {
        coordArr = generateShip(size)
      }
      shipArr.push(Ship(coordArr))
      
    })
    setShips(shipArr)
  }

  const generateShip = (size) => {
    const rotated = Math.random() > .5 ? true : false
    const startingCoord = [
      Math.floor(Math.random() * 10), 
      Math.floor(Math.random() * 10)
    ]
    const shipData = {
      size: size,
      offsetX: 0,
      offsetY: 0,
      rotated: rotated,
    }
    const coordArray = getCoordArray(startingCoord, shipData)

    return coordArray
  }

  const addShip = (coordArr) => {
    const ship = Ship(coordArr);
    setShips((currentState) => {
      return [...currentState, ship]
    });
  }

  const isShip = (coords, shipArr = ships) => {
    return shipArr.some(
      ship => ship.coords.some(coord => _.isEqual(coord, coords)));
  }

  const validateShip = (coordArr, shipArr = ships) => {
    if (
      !coordArr.some(coord => isShip(coord, shipArr)) &&
      !coordArr.some(coord => coord[0] > 9 || coord[1] > 9)
    ) {
      return true
    }
  }

  const findShip = (coords) => {
    for (const ship of ships) {
      if (ship.coords.some(coord => _.isEqual(coord, coords))) {
        return ship
      }
    }
  }

  const recieveHit = (coords) => {
    const ship = findShip(coords);
    for (let i = 0; i < ship.coords.length; i++) {
      if (_.isEqual(ship.coords[i], coords)) {
        ship.coords[i] = 'x'
      }
    }
    const arr = [...ships];
    setShips(arr);
  }

  const createGrid = () => {
    let children = []
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        children.push(
          <GridSquare
            recieveHit={recieveHit}
            coords={[i, j]}
            isShip={isShip([i, j])}
            placeShip={placeShip}
            player={props.player}
            switchPlayer={props.switchPlayer}
          />)
      }
    }
    return children
  }

  return (
    <div className="game-board">
      {createGrid()}
      <button onClick={addRandomShips}>click</button>
    </div>
  )
}

export default GameBoard 
