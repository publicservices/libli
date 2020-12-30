import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Reputation from "./Reputation";
import { ClientContext, client } from "./ClientContext";
import { PlayerContext, player } from "./PlayerContext";

const reputation = new Reputation();
reputation.loadWeights(window.localStorage, client);

ReactDOM.render(
    <React.StrictMode>
        <ClientContext.Provider
            value={{
                client: client,
                reputation: reputation,
            }}
        >
	    <PlayerContext.Provider
		value={{
                    player: player
		}}
            >
		<App client={client} player={player}/>
	    </PlayerContext.Provider>
        </ClientContext.Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
