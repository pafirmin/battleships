import GameBoard from './components/GameBoard'
import { useState, useEffect } from 'react'
import ShipYard from './components/ShipYard';
import { computerTurn } from './Computer'

function App() {

  const [currentPlayer, setCurrentPlayer] = useState('player')

  const switchPlayer = () => {
    setCurrentPlayer(
      currentPlayer === 'player' ? 'computer' : 'player')
  }

  useEffect(() => {
    if (currentPlayer === 'computer')
    computerTurn()
  })

  console.log(currentPlayer)


  return (
    <div className="App">
      <div className="boards-container">
        <GameBoard player='player' switchPlayer={switchPlayer} />
        <GameBoard player='computer' switchPlayer={switchPlayer} />
      </div>
      <ShipYard />
    </div>
  );
}

export default App;
