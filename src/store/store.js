import { createStore, combineReducers } from 'redux'
import { itemReducer } from './item.reducer'

const rootReducer = combineReducers({
    itemModule: itemReducer,
})

const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
export const store = createStore(rootReducer, middleware)


store.subscribe(() => {
    console.log('storeState:\n', store.getState())
})



