import React, { useEffect, useState } from "react";
import _ from "lodash";
import Ship from "./Ship";
import GridSquare from "./GridSquare";

const GameBoard = (props) => {
  const { gameStarted, setBoardReady, setGameWon, player } = props;
  const [ships, setShips] = useState([]);

  useEffect(() => {
    if (gameStarted && player === "computer") {
      addRandomShips();
    }
  }, [gameStarted]);

  useEffect(() => {
    if (ships.length && ships.every((ship) => ship.isSunk())) {
      setGameWon(true);
    }
  }, [ships, gameStarted, setGameWon]);

  useEffect(() => {
    ships.length === 10 && setBoardReady(true);
  }, [ships, setBoardReady]);

  const placeShip = (coords, data) => {
    const shipData = JSON.parse(data);
    const coordArr = getCoordArray(coords, shipData);

    if (validateShip(coordArr)) {
      addShip(coordArr, shipData.rotated);
      document.getElementById(shipData.id).remove();
    }
  };

  const getCoordArray = ([x, y], shipData) => {
    const coordArr = [];

    if (shipData.rotated) {
      for (let i = 0; i < shipData.size; i++) {
        coordArr.push([x + (i - shipData.offsetX), y]);
      }
    } else {
      for (let i = 0; i < shipData.size; i++) {
        coordArr.push([x, y + (i - shipData.offsetY)]);
      }
    }
    return coordArr;
  };

  const addRandomShips = () => {
    const shipSizes = [6, 4, 4, 3, 3, 3, 2, 2, 2, 2];
    let shipArr = [];

    shipSizes.forEach((size) => {
      let coordArr = generateShip(size);
      while (!validateShip(coordArr, shipArr)) {
        coordArr = generateShip(size);
      }
      shipArr.push(Ship(coordArr));
    });
    setShips(shipArr);
  };

  const generateShip = (size) => {
    const rotated = Math.random() > 0.5;
    const startingCoord = [
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
    ];
    const shipData = {
      size: size,
      offsetX: 0,
      offsetY: 0,
      rotated: rotated,
    };
    const coordArray = getCoordArray(startingCoord, shipData);

    return coordArray;
  };

  const validateShip = (coordArr, shipArr = ships) => {
    return coordArr.every(
      ([x, y]) =>
        _.inRange(x, 0, 10) && _.inRange(y, 0, 10) && !isShip([x, y], shipArr)
    );
  };

  const addShip = (coordArr, rotation) => {
    const ship = Ship(coordArr, rotation);
    setShips((currentState) => {
      return [...currentState, ship];
    });
  };

  const isShip = (coords, shipArr = ships) => {
    return shipArr.some((ship) =>
      ship.coords.some((coord) => _.isEqual(coord, coords))
    );
  };

  const findShip = (coords) => {
    for (const ship of ships) {
      if (ship.coords.some((coord) => _.isEqual(coord, coords))) {
        return ship;
      }
    }
  };

  const recieveHit = (coords) => {
    const ship = findShip(coords);
    ship.hit();

    const arr = [...ships];
    setShips(arr);
  };

  const createGrid = () => {
    let children = [];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        children.push(
          <GridSquare
            recieveHit={recieveHit}
            coords={[j, i]}
            isShip={isShip([j, i])}
            ship={findShip([j, i])}
            placeShip={placeShip}
            player={props.player}
            switchPlayer={props.switchPlayer}
            currentPlayer={props.currentPlayer}
            gameStarted={props.gameStarted}
          />
        );
      }
    }
    return children;
  };

  return (
    <div className={`game-board ${props.player}-board`}>{createGrid()}</div>
  );
};

export default GameBoard;
