import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'


const middleware = [thunk]

const store = window.navigator.userAgent.includes('Chrome') 
    ?
    createStore(rootReducer, compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ))
    :
    createStore(rootReducer, compose(
        applyMiddleware(...middleware)
    ))

export default store

