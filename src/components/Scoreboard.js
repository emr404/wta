import React, { useContext } from "react";
import ScoreboardComponent from "./ScoreboardComponent";
import { PlayerContext } from "../context/PlayerContext";
import "../scss/style.scss";

const Scoreboard = () => {
        // eslint-disable-next-line no-unused-vars
    const [playerData, setPlayerData] = useContext(PlayerContext);

    return (
        <div className="ScoreboardContainer">
            <div className="ScoreboardHeader">
                <h2 className="ScoreboardTitle">Scoreboard</h2>
                <div className="ScoreboardDescription">
                    <h3>Players</h3> <h3>Points</h3>
                </div>
            </div>
            {playerData.length === 0 ? (
                <h3 className='EmptyPlaceholder'>
                    You have no players yet :(
                </h3>
            ) : (
                playerData.map((player) => <ScoreboardComponent {...player} />)
            )}
            { }
        </div>
    );
};

export default Scoreboard;
