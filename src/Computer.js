import _ from "lodash";

const Computer = (() => {
  let lastHitIndex = false;
  let consecutiveHits = 0;
  let modifier = 0;      // Index of next target relative to last successful hit.
  let targetIndex = 0;
  let tracking = false;  // On a successful hit, the AI will try surrounding squares.
  
  const computerTurn = () => {
    const target = findTarget();
    
    if (!target || target.dataset.hit === "true") {
      computerTurn();
    } else {
      target.click();
      if (target.classList.contains("hit")) {
        lastHitIndex = targetIndex;
        consecutiveHits += tracking ? 2 : 1; // If the AI is tracking a target and scores a successful second hit,
        tracking = true;                     // it counts as a consecutive hit regardless of previous unsuccessful  
      } else {                               // attempts. This way, the modifier is retained and it will keep 
        consecutiveHits = 0;                 // attacking in the same direction.
      }
    }
  };
  
  const findTarget = () => {
    const targets = document.querySelectorAll(".player");
    if (lastHitIndex > 0 && validNeighbours(targets)) {
      if (consecutiveHits > 1 && _.inRange(targetIndex, 10, 90)) { // AI will keep attacking in same direction if 
        targetIndex += modifier;                                   // consecutive hits are achieved...
      } else {
        modifier = _.sample(validNeighbours(targets));             // ... Otherwise, try a random, valid neighbouring square
        targetIndex = lastHitIndex + modifier;                     // and remember the modifier.
      }
    } else {
      targetIndex = Math.floor(Math.random() * 100);               // Pick a random square if there are no valid neighbours.
    }
    return targets[targetIndex];
  };

  const validNeighbours = (targets) => {
    const neighbours = [-10, 10, -1, 1];
    let validNeighbours = neighbours.filter((i) =>
      targets[lastHitIndex + i] &&
      targets[lastHitIndex + i].dataset.hit === "false"
    );
    if (_.isEmpty(validNeighbours)) { // If there are no attackable neighbours, start from scratch.
      lastHitIndex = false;
      tracking = false;
      validNeighbours = false;
    }
    return validNeighbours;
  };

  return { computerTurn };
})();

export default Computer;
