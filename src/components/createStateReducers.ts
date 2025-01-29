import type { CaseReducer, CreateSliceOptions, PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit"
import { createSliceReducer } from "./createSliceReducer"

type Reducers<State, CR extends SliceCaseReducers<State>> = 
  CreateSliceOptions<State, CR>['reducers']

type CaseReducers<State> = {
  [K in keyof State as 
    K extends string ? `set${Capitalize<K>}` : never
  ]-?: CaseReducer<State, PayloadAction<State[K]>> 
}

export const createStateReducers = <State, K extends keyof State>
  (keys: K[]): CaseReducers<Pick<State, K>> => {
    type SliceReducer = CaseReducer<State, PayloadAction<State[K]>>;

    const data: unknown = keys.reduce<Record<string, SliceReducer>>((target, key) => {
      if (typeof key !== 'string') {
        return target;
      }
      const prefixedKey = `set${key[0].toUpperCase()}${key.slice(1)}`;
      const reducer: SliceReducer = createSliceReducer(key as K);
      target[prefixedKey] = reducer
      return target;
    }, {});

    return data as CaseReducers<Pick<State, K>>;
  }
