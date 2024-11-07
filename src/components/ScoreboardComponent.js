import React, { useContext, useState } from "react";
import { PlayerContext } from "../context/PlayerContext";
import "../scss/style.scss";
const ScoreboardComponent = ({ name }) => {
    const [playerData] = useContext(PlayerContext);
    const [realPoint, setRealPoint] = useState(0);
    const changeScore = (e) => {
        e.preventDefault();
        e.target.value === "+"
            ? setRealPoint((prevState) => prevState + 1)
            : setRealPoint((prevState) => prevState - 1);

        console.log(playerData);
    };

    return (
        <div>
            <ol>
                <li>
                    <h4 className="PlayerName">{name} </h4>
                    <div className="ScoreBtnContainer">
                        <button
                            className="MinusBtn"
                            value="-"
                            disabled={realPoint === 0}
                            onClick={changeScore}>
                            -
                        </button>
                        <h4>{realPoint}</h4>
                        <button className="AddBtn" value="+" onClick={changeScore}>
                            +
                        </button>
                    </div>
                </li>
            </ol>
        </div>
    );
};

export default ScoreboardComponent;
