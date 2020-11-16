  const computerTurn = () => {
    const targets = document.querySelectorAll('.player')
    const index = Math.floor(Math.random() * 100)
    
    setTimeout(()=>targets[index].click(), 500)
  }

  export { computerTurn }
