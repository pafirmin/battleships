import React, { useEffect, useState } from "react";

const GridSquare = (props) => {
  const { coords, recieveHit, isShip, placeShip, player, ship } = props;
  const [style, setStyle] = useState("clear");
  const [clicked, setClicked] = useState(false);
  const [icon, setIcon] = useState("");

  useEffect(() => {
    if (isShip && player === "player") {
      setStyle(ship.horizontal() ? "ship horizontal" : "ship");
    }
  }, [isShip, player, ship]);

  useEffect(() => {
    if (isShip && ship.isSunk()) {
      setStyle('sunk')
    }
  })

  const handleClick = () => {
    if (!clicked && props.currentPlayer !== player) {
      setClicked(true);
      makeShot();
    }
  };

  const makeShot = () => {
    if (isShip) {
      recieveHit(coords);
      setStyle("ship hit");
      setIcon(<i className="fas fa-crosshairs"></i>);
    } else {
      props.switchPlayer();
      setIcon(<i className="fas fa-times"></i>);
    }
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  const drop = (e) => {
    if (player === "player") {
      e.preventDefault();
      var data = e.dataTransfer.getData("text");
      placeShip(coords, data);
    }
  };

  return (
    <div
      onClick={() => handleClick()}
      className={`grid-square ${style} ${player}`}
      onDrop={(e) => drop(e)}
      onDragOver={(e) => allowDrop(e)}
      data-hit={clicked}
    >
      {icon}
    </div>
  );
};

export default GridSquare;
