import React, { useState, useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import "../scss/style.scss";
const AddPlayerComponent = () => {
    const [playerName, setPlayerName] = useState("");
        // eslint-disable-next-line no-unused-vars
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
                <label htmlFor="Player Name">
                    <input className="PlayerField" type="text" value={playerName} onChange={addPlayer} placeholder="Player Name" />
                </label>
                <button disabled={playerName === ""} className="PlayerBtn">Add Player</button>
            </form>
        </div>
    );
};

export default AddPlayerComponent;
