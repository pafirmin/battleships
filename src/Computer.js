import _ from 'lodash'

const Computer = (() => {
  const targets = document.querySelectorAll('.player');
  let lastHitIndex = 0;
  let consecutiveHits = 0;
  let modifier = 0;
  let index = 0;
  let tracking = false;

  const computerTurn = () => {
    const target = findTarget();

    if (!target || target.dataset.hit === 'true') {
      computerTurn();
    } else {
      target.click();
      if (target.classList.contains('hit')) {
        lastHitIndex = index;
        consecutiveHits += tracking ? 2 : 1;
        tracking = true;
      } else {
        consecutiveHits = 0;
      }
    }
  }

  const findTarget = () => {

    if (lastHitIndex >= 0 && validNeighbours()) {
      if (consecutiveHits > 1 && _.inRange(index, 10, 90)) {
        index += modifier;
      } else {
        index = lastHitIndex + getModifier();
      }
    } else {
      index = Math.floor(Math.random() * 100);
    }
    return targets[index];
  }

  const validNeighbours = () => {
    const neighbours = [-10, 10, -1, 1]
    const validNeighbours =
      neighbours.filter((mod) =>
        targets[lastHitIndex + mod] && targets[lastHitIndex + mod].dataset.hit === 'false');

    if (_.isEmpty(validNeighbours)) {
      lastHitIndex = 0;
      tracking = false
      return false;
    } else {
      return validNeighbours
    }
  }

  const getModifier = () => {
    modifier = _.sample(validNeighbours())
    return modifier
  }

  return { computerTurn }
})();

export default Computer;
