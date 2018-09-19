import { applyMiddleware, compose, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createLogger } from 'redux-logger'
import promiseMiddleware from 'redux-promise-middleware'
import thunkMiddleware from 'redux-thunk'
import { IS_DEV } from '../config'

const exampleInitialState = {
  lastUpdate: 0,
  light: false,
  count: 0,
}

export const actionTypes = {
  ADD: 'ADD',
  TICK: 'TICK',
}

// REDUCERS
export const reducer = (state = exampleInitialState, action) => {
  switch (action.type) {
    case actionTypes.TICK:
      return {
        ...state,
        lastUpdate: action.ts,
        light: !!action.light,
      }
    case actionTypes.ADD:
      return {
        ...state,
        count: state.count + 1,
      }
    default:
      return state
  }
}

// ACTIONS
export const serverRenderClock = isServer => dispatch => {
  return dispatch({ type: actionTypes.TICK, light: !isServer, ts: Date.now() })
}

export const startClock = () => dispatch => {
  return setInterval(
    () => dispatch({ type: actionTypes.TICK, light: true, ts: Date.now() }),
    1000
  )
}

export const addCount = () => dispatch => {
  return dispatch({ type: actionTypes.ADD })
}

let enhanceCompose: any = compose

const middlewareList = [thunkMiddleware, promiseMiddleware()]

if (IS_DEV) {
  enhanceCompose = composeWithDevTools
  middlewareList.push(createLogger({ collapsed: true }))
}

export const initStore = (initialState: any = exampleInitialState) => {
  return createStore(
    reducer,
    initialState,
    enhanceCompose(applyMiddleware(...middlewareList))
  )
}
