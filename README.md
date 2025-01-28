# Redux Toolkit Helpers

Some useful functions against a boilerplate

## createSliceReducer

```js
createSlice({
  initialState: {
    name: 'George'
  },
  reducers: {
    setName: createSliceReducer('name')
  }
})
```

similar to

```js
createSlice({
  initialState: {
    name: 'George'
  },
  reducers: {
    setName: (state, action) => ({
      ...state,
      name: action.payload
    })
  }
})
```

## createSliceSelector

```js
createSlice({
  initialState: {
    name: 'George'
  },
  selectors: {
    selectName: createSliceReducer('name')
  }
})
```

similar to

```js
createSlice({
  initialState: {
    name: 'George'
  },
  selectors: {
    selectName: (state) => state.name
  }
})
```

## createSliceState

```js
createSlice({
  ...createSliceState(initialState, keys)
})
```

similar to

```js
createSlice({
  initialState: {
    name: 'George'
  },
  reducers: {
    setName: (state, action) => ({
      ...state,
      name: action.payload
    })
  },
  selectors: {
    selectName: (state) => state.name
  }
})
```

the `keys` argument points to all the keys in the state object