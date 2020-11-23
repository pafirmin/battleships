import GameBoard from "./components/GameBoard";
import ShipYard from "./components/ShipYard";
import StartBtn from "./components/StartButton";
import computer from "./Computer"
import { useEffect, useState } from "react";

function App() {
  const [currentPlayer, setCurrentPlayer] = useState("player");
  const switchPlayer = () => {
    setCurrentPlayer(currentPlayer === "player" ? "computer" : "player");
  };

  useEffect(() => {
    if (currentPlayer === "computer") {
      setTimeout(() => computer.takeTurn(), 500);
    }
  }, [currentPlayer]);

  const [gameStarted, setGameStarted] = useState(false);
  const startGame = () => {
    if (boardReady && !gameWon) {
      setGameStarted(true);
    } else if (gameWon) {
      refresh()
    }
  };

  const [boardReady, setBoardReady] = useState(false);
  useEffect(() => {
    if (boardReady) {
      setText("START GAME");
      setBtnClass("blink");
      document.getElementById('ships-instruct').style.display = 'none'
    }
  }, [boardReady]);

  const [btnClass, setBtnClass] = useState("");
  const [text, setText] = useState("DEPLOY YOUR FLEET");
  useEffect(() => {
    if (gameStarted) {
      setText("COMMENCE ATTACK!");
      setBtnClass("");
    }
  }, [gameStarted]);

  const [gameWon, setGameWon] = useState(false);
  useEffect(() => {
    if (gameWon) {
      setGameStarted(false)
      setText(currentPlayer === 'player' ? 'YOU WIN!' : 'COMPUTER WINS')
      setBtnClass("winMsg")
    }
  }, [gameWon, currentPlayer])

  const refresh = () => {
    window.location.reload();
  }

  return (
    <div className="App">
      <header><h1>BATTLESHIPS</h1></header>
      <div className="boards-container">
        <GameBoard
          player="player"
          switchPlayer={switchPlayer}
          currentPlayer={currentPlayer}
          gameStarted={gameStarted}
          setBoardReady={setBoardReady}
          setGameWon={setGameWon}
        />
        <StartBtn startGame={startGame} text={text} btnClass={btnClass} />
        <GameBoard
          player="computer"
          switchPlayer={switchPlayer}
          currentPlayer={currentPlayer}
          gameStarted={gameStarted}
          setBoardReady={setBoardReady}
          setGameWon={setGameWon}
        />
      </div>
      <ShipYard />
    </div>
  );
}

export default App;
