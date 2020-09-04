import React from 'react'
import { PlayerProvider } from "./context/PlayerContext";
import AddPlayerComponent from "./components/AddPlayerComponent";
import GameComponent from "./components/GameComponent";

const App = () => {
  return (
    <div>
      <PlayerProvider>
            <AddPlayerComponent />
            <GameComponent />
      </PlayerProvider>
    </div>
  )
}

export default App
