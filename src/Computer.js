import _ from 'lodash'

const Computer = (() => {
  let lastHitIndex = 0;
  let consecutiveHits = 0
  let modifier = 0
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
        tracking = true
      } else {
        consecutiveHits = 0;
      }
    }
  }

  const findTarget = () => {
    const targets = document.querySelectorAll('.player');

    if (lastHitIndex && checkNeighbours(targets)) {
      if (consecutiveHits > 1 && _.inRange(index, 10, 90)) {
        index += modifier
      } else {
        index = lastHitIndex + getModifier();
      }
    } else {
      index = Math.floor(Math.random() * 100);
    }
    return targets[index];
  }

  const checkNeighbours = (targets) => {
    const neighbours = {
      up: targets[lastHitIndex - 10],
      down: targets[lastHitIndex + 10],
      left: targets[lastHitIndex - 1],
      right: targets[lastHitIndex + 1]
    }
    const noValidNeighbours =
      Object.values(neighbours).every((square) =>
        !square || square.dataset.hit === 'true')

    if (noValidNeighbours) {
      lastHitIndex = 0;
      tracking = false
      return false;
    } else {
      return true
    }
  }

  const getModifier = () => {
    let choice = Math.floor(Math.random() * 4)

    if (_.inRange(index, 10, 90)) {
      switch (choice) {
        case 0:
          modifier = -10;
          break;
        case 1:
          modifier = 10;
          break;
        case 2:
          modifier = 1;
          break;
        default:
          modifier = -1;
      }
    } else if (_.inRange(index, 0, 10)) {
      modifier = choice > 1 ? 1 : 10;
    } else if (_.inRange(index, 89, 100)) {
      modifier = choice < 2 ? -1 : -10;
    }
    return modifier;
  }

  return { computerTurn }
})();

export default Computer;
