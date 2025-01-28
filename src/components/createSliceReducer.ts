import type { CaseReducer, Draft, PayloadAction } from "@reduxjs/toolkit";

export const createSliceReducer = <State, K extends keyof State>(
  name: K, 
  onSet?: CaseReducer<State, PayloadAction<State[K]>>
): CaseReducer<State, PayloadAction<State[K]>> => 
  (state: Draft<State>, action: PayloadAction<State[K]>) => {
      const { payload } = action;
      if (!onSet) {
          return {
              ...state,
              [name]: payload,
          };
      }
      return {
        ...state,
        ...onSet(state, action)
      }
  };