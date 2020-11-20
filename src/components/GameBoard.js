import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import Ship from './Ship';
import GridSquare from './GridSquare';
import comp from '../Computer'

const GameBoard = (props) => {
  const { gameStarted, setBoardReady, player } = props
  const [ships, setShips] = useState([]);

  useEffect(() => {
    if (gameStarted && player === 'computer') {
      addRandomShips()
    }
  }, [gameStarted])

  useEffect(() => {
    if (ships.length && ships.every(ship => ship.isSunk())) {
      console.log('winner');
    }
  }, [ships, gameStarted])

  useEffect(() => {
    if (props.currentPlayer === 'computer' && player === 'player')
      setTimeout(() => comp.computerTurn(), 500)
  })

  useEffect(() => {
    ships.length === 10 && setBoardReady(true)
  }, [ships, setBoardReady])

  const placeShip = (coords, data) => {
    const shipData = JSON.parse(data)
    const coordArr = getCoordArray(coords, shipData)

    if (validateShip(coordArr)) {
      addShip(coordArr)
      document.getElementById(shipData.id).remove()
    }
  }

  const getCoordArray = ([a, b], shipData) => {
    const coordArr = []

    if (shipData.rotated) {
      for (let i = 0; i < shipData.size; i++) {
        coordArr.push([a, b + (i - shipData.offsetX)]);
      }
    } else {
      for (let i = 0; i < shipData.size; i++) {
        coordArr.push([a + (i - shipData.offsetY), b]);
      }
    }
    return coordArr;
  }

  const addRandomShips = () => {
    const shipSizes = [6, 4, 4, 3, 3, 3, 2, 2, 2, 2]
    let shipArr = []

    shipSizes.forEach((size) => {
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
    return coordArr.every(([a, b]) =>
      _.inRange(a, 0, 10) &&
      _.inRange(b, 0, 10) &&
      !isShip([a, b], shipArr))
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
    ship.hit()

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
            currentPlayer={props.currentPlayer}
          />)
      }
    }
    return children
  }

  return (
    <div className="game-board">
      {createGrid()}
    </div>
  )
}

export default GameBoard 
