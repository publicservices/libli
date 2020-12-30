import React from "react";
import Player from "./Player";

const player = new Player(window.localStorage);
const PlayerContext = React.createContext();

export { PlayerContext, player };
