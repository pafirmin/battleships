const Ship = (coordsArr) => {
  const coords = coordsArr;
  let hitPoints = coordsArr.length;

  const hit = () => { hitPoints-- }   
  const isSunk = () => { return hitPoints === 0 };

  return { hit, isSunk, coords }
}

export default Ship