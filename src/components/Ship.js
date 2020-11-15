const Ship = (coordsArr) => {
  const coords = coordsArr;
  const size = coordsArr.length;

  const hit = (i) => {
    coords[i] = 'x';
  }

  const isSunk = () => coords.every(coord => coord === 'x')

  return { size, hit, isSunk, coords }
}

export { Ship }