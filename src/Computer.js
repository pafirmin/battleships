import _ from "lodash";

const ComputerPlayer = (() => {
  let isSearching = false;
  let lockedOn = false;    
  let initialHit = false;
  let lastHitIndex = false;
  let consecutiveHits = false;
  let modifier = 0;
  let targetIndex = 0;

  const takeTurn = () => {
    const target = findTarget();
    target.click();

    if (target.classList.contains("ship")) {
      if (!consecutiveHits && !isSearching) {
        initialHit = targetIndex;
      }
      if (isSearching) {
        lockedOn = true           
      }
      lastHitIndex = targetIndex;
      consecutiveHits++;
      setTimeout(() => takeTurn(), 500);
    } else if (lockedOn && consecutiveHits) {
      isSearching = false;
      consecutiveHits = 0;
    } else {
      lockedOn = false;
      consecutiveHits = 0
    }
  };

  const findTarget = () => {
    const targets = document.querySelectorAll(".player");
    const validNeighbours = getValidNeighbours(targets);
    const reverseMod = modifier - modifier * 2
    const isSunk = (index) => targets[index].classList.contains("sunk");
    const isValid = (index) =>
      targets[index] && targets[index].dataset.clicked === "false";

    if (initialHit && isSunk(initialHit)) {
      lockedOn = false
    }
    if (lockedOn) {
      if (isValid(targetIndex + modifier) && consecutiveHits) { // If locked onto a ship, keep attacking in same direction until miss...
        targetIndex += modifier;
      } else if (isValid(initialHit + reverseMod)) { // ... If not sunk, on next turn attack in oposite direction from the initial hit. 
        modifier = reverseMod;
        targetIndex = initialHit + modifier;
      } else {
        targetIndex = findRandomTarget(targets)
      }
    } else {
      if (lastHitIndex && validNeighbours && !isSunk(lastHitIndex)) { 
        isSearching = true;                    // If a hit is scored, try random adjacent squares until the ship is found.
        modifier = _.sample(validNeighbours);
        targetIndex = lastHitIndex + modifier;
      } else {
        targetIndex = findRandomTarget(targets)
      }
    }
    return targets[targetIndex];
  };

  const getValidNeighbours = (targets) => {
    const neighbours = [-10, 10, -1, 1];
    let validNeighbours = neighbours.filter((i) =>
      targets[lastHitIndex + i] &&
      targets[lastHitIndex + i].dataset.clicked === "false"
    );
    if (_.isEmpty(validNeighbours)) {
      validNeighbours = false;
    }
    return validNeighbours;
  };

  const findRandomTarget = (targets) => {
    lastHitIndex = consecutiveHits = isSearching = initialHit = lockedOn = false;
    let target = _.sample(
      [...targets].filter(i => i.dataset.clicked === 'false'));

    return [...targets].indexOf(target);
  }

  return { takeTurn };
})();

export default ComputerPlayer;
