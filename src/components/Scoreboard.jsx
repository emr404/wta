import { useContext } from "react";
import AddPlayerComponent from "./AddPlayerComponent";
import ScoreboardComponent from "./ScoreboardComponent";
import { PlayerContext } from "../context/PlayerContext";

const Scoreboard = () => {
  const [playerData] = useContext(PlayerContext);

  return (
    <div className="ScoreboardContainer">
      <div className="ScoreboardHeader">
        <div className="ScoreboardTitleRow">
          <h2 className="ScoreboardTitle">Scoreboard</h2>
        </div>
        <AddPlayerComponent />
        <div className="ScoreboardDescription">
          <h3>Players</h3> <h3>Points</h3>
        </div>
      </div>
      {playerData.length === 0 ? (
        <h3 className="EmptyPlaceholder">You have no players yet :(</h3>
      ) : (
        playerData.map((player) => (
          <ScoreboardComponent key={player.id} name={player.name} />
        ))
      )}
    </div>
  );
};

export default Scoreboard;
