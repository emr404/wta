import { PlayerProvider } from "./context/PlayerContext";
import GameComponent from "./components/GameComponent";
import Scoreboard from "./components/Scoreboard";
import "./scss/style.scss";

const App = () => {
  return (
    <PlayerProvider>
      <main className="AppShell">
        <h1>
          <svg className="GameLogo" viewBox="0 0 48 48" aria-hidden="true">
            <path d="M5 8h38v27H25L12 44v-9H5Z" fill="currentColor" />
            <path d="M15 16h7v10h-9v-6Zm14 0h7v10h-9v-6Z" fill="#ffffff" />
          </svg>
          <span className="TitleText">
            What's the <span>Accent?</span>
          </span>
        </h1>
        <div className="MainGameContainer">
          <section className="PlayArea" aria-label="Play a round">
            <GameComponent />
          </section>
          <aside
            className="MainScoreboardContainer"
            aria-label="Players and scores"
          >
            <Scoreboard />
          </aside>
        </div>
      </main>
    </PlayerProvider>
  );
};

export default App;
