import GameBoard from './components/GameBoard'
import { useState, useEffect } from 'react'
import ShipYard from './components/ShipYard';

function App() {

  const [currentPlayer, setCurrentPlayer] = useState('player')

  const switchPlayer = () => {
    setCurrentPlayer(
      currentPlayer === 'player' ? 'computer' : 'player')
  }

  return (
    <div className="App">
      <div className="boards-container">
        <GameBoard player='player' switchPlayer={switchPlayer} currentPlayer={currentPlayer} />
        <GameBoard player='computer' switchPlayer={switchPlayer} currentPlayer={currentPlayer} />
      </div>
      <ShipYard />
    </div>
  );
}

export default App;
