import React, { useState, useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
const AddPlayerComponent = () => {
    const [playerName, setPlayerName] = useState("");
    const [playerData, setPlayerData] = useContext(PlayerContext);

    const addData = (e) => {
        e.preventDefault();
        setPlayerData((prevPlayerData) => [
            ...prevPlayerData,
            { name: playerName, key: Math.floor(Math.random() * 2000) },
        ]);
        setPlayerName("");
    };
    const addPlayer = (e) => {
        e.preventDefault();
        setPlayerName(e.target.value);
    };
    return (
        <div className="PlayerContainer">
            <form onSubmit={addData}>
                <input
                    className="PlayerField"
                    type="text"
                    value={playerName}
                    onChange={addPlayer}
                    placeholder="Player Name"
                />
                <button disabled={playerName === ""} className="PlayerBtn">
                    Add Player
            </button>
            </form>
        </div>
    );
};

export default AddPlayerComponent;
