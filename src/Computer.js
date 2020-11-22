import _ from "lodash";

const Computer = (() => {
  let tracking = false;
  let found = false;
  let finishHimOff = false;
  let initialHit = false;
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
      if (!consecutiveHits) { initialHit = targetIndex; }
      if (tracking) { found = true; }
      lastHitIndex = targetIndex;
      consecutiveHits++;
      setTimeout(() => computerTurn(), 500);
    } else if (found && consecutiveHits > 1) {
      consecutiveHits = tracking = lastHitIndex = 0;
      finishHimOff = true;
      found = false;
    } else {
      consecutiveHits = found = false;
    }
  };

  const findTarget = () => {
    const targets = document.querySelectorAll(".player");
    const validNeighbours = getValidNeighbours(targets);
    const sunk = (index) => targets[index].classList.contains("sunk");
    const isValid = (index) =>
      targets[index] && targets[index].dataset.clicked === "false";

    if (sunk(targetIndex)) { found = false }
    if (found && isValid(targetIndex + modifier)) {
      targetIndex += modifier;
    } else if (lastHitIndex && validNeighbours && !found) {
      tracking = true;
      modifier = _.sample(validNeighbours);
      targetIndex = lastHitIndex + modifier;
    } else if (finishHimOff && !sunk(initialHit)) {
      modifier -= modifier * 2;
      found = true;
      targetIndex = initialHit + modifier;
      initialHit = lastHitIndex = finishHimOff = false;
    } else {
      lastHitIndex = finishHimOff = consecutiveHits = tracking = initialHit = found = false;
      targetIndex = Math.floor(Math.random() * 100);
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

  return { computerTurn };
})();

export default Computer;
