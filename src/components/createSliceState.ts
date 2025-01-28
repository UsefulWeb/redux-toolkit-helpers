import { createStateReducers } from "./createStateReducers";
import { createStateSelectors } from "./createStateSelectors";

export const createSliceState = <State extends object, K extends keyof State>
  (
    initialState: State, 
    keys: K[] = Object.keys(initialState) as K[]
  ) => ({
    initialState,
    reducers: createStateReducers<State, K>(keys),
    selectors: createStateSelectors<State, K>(keys)
  });