import { useState, useEffect, useContext } from "react";
import accentData from "../resources/AccentData";
import { PlayerContext } from "../context/PlayerContext";

const GameComponent = () => {
  const [out, setOut] = useState("");
  const [quote, setQuote] = useState("");
  const [timer, setTimer] = useState();
  const [difficulty, setDifficulty] = useState("easy");
  const [playerData] = useContext(PlayerContext);

  useEffect(() => {
    if (!quote) {
      return;
    }

    let remaining = 15;
    const timerId = setInterval(() => {
      if (remaining === 0) {
        clearInterval(timerId);
        alert("Time Over!");
      } else {
        remaining -= 1;
        setTimer(remaining);
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [quote]);

  const accentDifficulty = (e) => {
    e.preventDefault();
    const btnValue = e.currentTarget.value;
    setDifficulty(btnValue);
  };

  const generateQuote = (e) => {
    e.preventDefault();
    const randomAccent =
      accentData[difficulty][
        Math.floor(Math.random() * accentData[difficulty].length)
      ];
    setOut(randomAccent);

    fetch("https://dummyjson.com/quotes/random")
      .then((response) => response.json())
      .then((data) => {
        setQuote(data.quote);
      })
      .catch((error) => {
        console.error("Error fetching quote:", error);
        setQuote("Failed to fetch quote. Please try again.");
      });
  };

  return (
    <div className="GameContainer">
      <div className="DifficultyContainer">
        <h3>Select Difficulty</h3>
        <div className="DifficultyOptions">
          <button
            className="Easy"
            value="easy"
            aria-pressed={difficulty === "easy"}
            onClick={accentDifficulty}
          >
            <span className="LevelBars" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            Easy
          </button>
          <button
            className="Medium"
            value="medium"
            aria-pressed={difficulty === "medium"}
            onClick={accentDifficulty}
          >
            <span className="LevelBars" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            Medium
          </button>
          <button
            className="Hard"
            value="hard"
            aria-pressed={difficulty === "hard"}
            onClick={accentDifficulty}
          >
            <span className="LevelBars" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            Hard
          </button>
        </div>
        <p className="CurrentLevel">
          Current Level: <span className="Difficulty">{difficulty}</span>
        </p>
      </div>
      <div
        className={`AccentContainer${quote !== "" ? " HasRound" : ""}${timer !== undefined && timer <= 5 ? " TimeLow" : ""}`}
      >
        <div className="CardTopline">
          <div
            className="Timer"
            style={{ "--timer-progress": `${((timer ?? 15) / 15) * 360}deg` }}
            aria-label={
              timer === undefined
                ? "Timer not started"
                : `${timer} seconds remaining`
            }
          >
            <p>{timer}</p>
            {timer === undefined && (
              <span className="TimerInitial" aria-hidden="true">
                15
              </span>
            )}
            <span className="TimerUnit" aria-hidden="true">
              sec
            </span>
          </div>
        </div>
        <p className="QuoteText">{quote === "" ? "Quote" : quote}</p>
        <div className="AccentReveal">
          <p className="Accent">{out === "" ? "? ? ?" : out + " Accent"}</p>
        </div>
      </div>
      <div className="GenerateBtnContainer">
        <button
          className="GenerateBtn"
          disabled={timer > 0 || playerData.length < 1}
          onClick={generateQuote}
          value={difficulty}
        >
          <span aria-hidden="true">↻</span> Generate
        </button>
      </div>
    </div>
  );
};

export default GameComponent;
