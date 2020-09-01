import React, { useState, useReducer } from "react";
import GameContext from "./game.context";

import {
  gameReducer,
  CREATE_GAME,
} from "./game.reducer";

const useGame = (props: any) => {
  const [state, dispatch] = useReducer(gameReducer, { user: {} });

  const createGame = (product: any) => {
    console.log("createGame...");
    setTimeout(() => {
      dispatch({ type: CREATE_GAME, product: product });
    }, 400);
  };

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {props.children}
    </GameContext.Provider>
  );
};

export default useGame;
