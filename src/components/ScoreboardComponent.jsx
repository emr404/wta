import { useState } from "react";
const ScoreboardComponent = ({ name }) => {
  const [realPoint, setRealPoint] = useState(0);
  const changeScore = (e) => {
    e.preventDefault();
    e.currentTarget.value === "+"
      ? setRealPoint((prevState) => prevState + 1)
      : setRealPoint((prevState) => prevState - 1);
  };

  return (
    <div>
      <ol>
        <li>
          <div className="PlayerIdentity">
            <span className="PlayerAvatar" aria-hidden="true">
              {name.slice(0, 1).toUpperCase()}
            </span>
            <h4 className="PlayerName">{name} </h4>
          </div>
          <div className="ScoreBtnContainer">
            <button
              className="MinusBtn"
              value="-"
              disabled={realPoint === 0}
              onClick={changeScore}
            >
              -
            </button>
            <h4
              className={`ScoreValue${realPoint > 0 ? " Scored" : ""}`}
              key={realPoint}
            >
              {realPoint}
            </h4>
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
