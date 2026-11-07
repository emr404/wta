import { useState, useContext, useRef } from "react";
import { PlayerContext } from "../context/PlayerContext";
const AddPlayerComponent = () => {
  const [playerName, setPlayerName] = useState("");
  const nextPlayerId = useRef(0);
  const [, setPlayerData] = useContext(PlayerContext);

  const addData = (e) => {
    e.preventDefault();
    const player = { name: playerName, id: nextPlayerId.current++ };
    setPlayerData((prevPlayerData) => [...prevPlayerData, player]);
    setPlayerName("");
  };
  const addPlayer = (e) => {
    setPlayerName(e.target.value);
  };
  return (
    <div className="PlayerContainer">
      <form onSubmit={addData}>
        <label htmlFor="player-name">
          <span className="VisuallyHidden">Player name</span>
          <input
            id="player-name"
            className="PlayerField"
            type="text"
            value={playerName}
            onChange={addPlayer}
            placeholder="Player Name"
          />
        </label>
        <button disabled={playerName === ""} className="PlayerBtn">
          Add Player
        </button>
      </form>
    </div>
  );
};

export default AddPlayerComponent;
