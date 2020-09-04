import React, { createContext, useState } from "react";

export const PlayerContext = createContext();
export const PlayerProvider = ({ children }) => {
    const [playerData, setPlayerData] = useState([]);
    return (
        <div>
            <PlayerContext.Provider value={[playerData, setPlayerData]}>
                {children}
            </PlayerContext.Provider>
        </div>
    );
};
