import { createSliceSelector } from "./createSliceSelector";

type SliceSelectors<State> = {
  [K in keyof State as 
    K extends string ? `select${Capitalize<K>}` : never
  ]-?: (sliceState: State) => State[K];
}

export const createStateSelectors = <State, K extends keyof State>
  (keys: K[]): SliceSelectors<Pick<State, K>> => {
    type SliceSelector = (sliceState: State) => State[K];

    const data = keys.reduce<Record<string, SliceSelector>>((target, key) => {
      if (typeof key !== 'string') {
        return target;
      }
      const prefixedKey = `select${key[0].toUpperCase()}${key.slice(1)}`;
      const reducer: SliceSelector = createSliceSelector(key as K);
      target[prefixedKey] = reducer
      return target;
    }, {});

    return data as SliceSelectors<Pick<State, K>>;
  }