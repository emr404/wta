import React from 'react'
import { PlayerProvider } from "./context/PlayerContext";
import AddPlayerComponent from "./components/AddPlayerComponent";
import GameComponent from "./components/GameComponent";
import Scoreboard from "./components/Scoreboard";

const App = () => {
  return (
    <div>
      <PlayerProvider>
            <AddPlayerComponent />
            <GameComponent />
            <Scoreboard />
      </PlayerProvider>
    </div>
  )
}

export default App
