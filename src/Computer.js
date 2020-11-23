import _ from "lodash";

const Computer = (() => {
  let isSearching = false;
  let lockedOn = false;
  let initialHit = 0;
  let lastHitIndex = 0;
  let consecutiveHits = 0;
  let modifier = 0;
  let targetIndex = 0;

  const computerTurn = () => {
    const target = findTarget();
    if (!target || target.dataset.clicked === "true") {
      computerTurn();
    } else {
      target.click();
    }
    if (target.classList.contains("ship")) {
      if (!consecutiveHits && !isSearching) { initialHit = targetIndex; }
      if (isSearching) { lockedOn = true }
      lastHitIndex = targetIndex;
      consecutiveHits++;
      setTimeout(() => computerTurn(), 500);
    } else if (lockedOn && consecutiveHits) {
      isSearching = false;
      consecutiveHits = 0;
    } else {
      lockedOn = false;
      consecutiveHits = 0 
    }
  };

  const findTarget = () => {
    const reverseMod = modifier - modifier * 2
    const targets = document.querySelectorAll(".player");
    const validNeighbours = getValidNeighbours(targets);
    const isSunk = (index) => targets[index].classList.contains("sunk");
    const isValid = (index) =>
      targets[index] && targets[index].dataset.clicked === "false";

    if (isSunk(initialHit)) { lockedOn = false }

    if (lockedOn) {
      if (isValid(targetIndex + modifier) && consecutiveHits) {
        targetIndex += modifier;
      } else if (isValid(initialHit + reverseMod)) {
        modifier = reverseMod;
        targetIndex = initialHit + modifier;
      } else {
        targetIndex = findRandomTarget()
      }
    } else {
      if (lastHitIndex && validNeighbours && !isSunk(lastHitIndex)) {
        isSearching = true;
        modifier = _.sample(validNeighbours);
        targetIndex = lastHitIndex + modifier;
      } else {
        targetIndex = findRandomTarget()
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

  const findRandomTarget = () => {
    lastHitIndex = consecutiveHits = isSearching = initialHit = lockedOn = 0;
    return Math.floor(Math.random() * 100);
  }

  return { computerTurn };
})();

export default Computer;
