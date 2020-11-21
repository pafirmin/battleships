const Ship = (coordsArr, rotation) => {
  const coords = coordsArr;
  const rotated = rotation
  let hitPoints = coordsArr.length;

  const hit = () => {
    hitPoints--;
  };
  const isSunk = () => {
    return hitPoints === 0;
  };

  const horizontal = () => {
    return rotated
  }

  return { hit, isSunk, coords, horizontal };
};

export default Ship;
