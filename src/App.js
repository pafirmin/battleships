import GameBoard from "./components/GameBoard";
import ShipYard from "./components/ShipYard";
import StartBtn from "./components/StartButton";
import { useEffect, useState } from "react";

function App() {
  const [currentPlayer, setCurrentPlayer] = useState("player");
  const switchPlayer = () => {
    setCurrentPlayer(currentPlayer === "player" ? "computer" : "player");
  };

  const [gameStarted, setGameStarted] = useState(false);
  const startGame = () => {
    const shipYard = document.getElementById("shipYard");
    if (!shipYard.hasChildNodes()) {
      setGameStarted(true);
    }
  };

  const [btnClass, setBtnClass] = useState("");
  const [text, setText] = useState("DEPLOY YOUR FLEET");
  useEffect(() => {
    if (gameStarted) {
      setText("COMMENCE!");
      setBtnClass("");
    }
  }, [gameStarted]);

  const [boardReady, setBoardReady] = useState(false);
  useEffect(() => {
    if (boardReady) {
      setText("START GAME");
      setBtnClass("blink");
      document.getElementById('ships-instruct').style.display = 'none'
    }
  }, [boardReady]);

  return (
    <div className="App">
      <div className="boards-container">
        <GameBoard
          player="player"
          switchPlayer={switchPlayer}
          currentPlayer={currentPlayer}
          gameStarted={gameStarted}
          setBoardReady={setBoardReady}
        />
        <StartBtn startGame={startGame} text={text} btnClass={btnClass} />
        <GameBoard
          player="computer"
          switchPlayer={switchPlayer}
          currentPlayer={currentPlayer}
          gameStarted={gameStarted}
          setBoardReady={setBoardReady}
        />
      </div>
      <ShipYard />
    </div>
  );
}

export default App;
