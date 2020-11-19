import _ from 'lodash'

const computer = (() => {
  let lastHitIndex = 0;
  let consecutiveHits = 0
  let modifier = 0
  let index  = 0;
  
  const findTarget = () => {
    const targets = document.querySelectorAll('.player');
    if (lastHitIndex) {
      if (consecutiveHits > 1 && _.inRange(index, 10, 90)) {
        index += modifier
      } else {
        index += getModifier();
      }
    } else {
      index = Math.floor(Math.random() * 100);
    }
    return targets[index];
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
        case 3:
          modifier = -1;
      }
    } else if (_.inRange(index, 0, 10)){
      modifier = 1;
    } else if (_.inRange(index, 89, 100)){
      modifier = -1;
    }
    return modifier;
  }

  const computerTurn = () => {
    const target = findTarget();

    if (target.dataset.hit === 'true') {
      computerTurn();
    } else {
      console.log('hello')
      target.click();
      if (target.classList.contains('hit')) {
        lastHitIndex = index;
        consecutiveHits++;
      } else {
        consecutiveHits = 0;
        lastHitIndex = 0;
      }
    }
  }
  return { computerTurn }
})();

export default computer;
