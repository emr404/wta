import React from 'react'
import { PlayerProvider } from "./context/PlayerContext";
import AddPlayerComponent from "./components/AddPlayerComponent";
import GameComponent from "./components/GameComponent";
import Scoreboard from "./components/Scoreboard";
import "./scss/style.scss";

const App = () => {
  return (
    <div>
      <PlayerProvider>
            <div className='MainGameContainer' >
                <div>
                      <AddPlayerComponent />
                      <GameComponent />
                </div>
                
                <div className='MainScoreboardContainer'>
                    <Scoreboard />
                </div>
            </div>
      </PlayerProvider>
    </div>
  )
}

export default App
