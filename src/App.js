import React from 'react'
import { PlayerProvider } from "./context/PlayerContext";
import AddPlayerComponent from "./components/AddPlayerComponent";
const App = () => {
  return (
    <div>
      <PlayerProvider>
            <AddPlayerComponent />
      </PlayerProvider>
    </div>
  )
}

export default App
