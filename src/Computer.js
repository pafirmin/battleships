

const computerTurn = () => {
  let targets = document.querySelectorAll('.player')
  let index = Math.floor(Math.random() * 100)
  const target = targets[index]

  if (
    target.classList.contains('miss') ||
    target.classList.contains('hit')
  ) {
    computerTurn()
  } else {
    target.click()
  }
}

export { computerTurn }
