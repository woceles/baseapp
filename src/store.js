import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './modules';
const sagaMiddleware = createSagaMiddleware();
const rangerMiddleware = createSagaMiddleware();

const composeEnhancer = window
    .__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(sagaMiddleware, rangerMiddleware)));
export { store, sagaMiddleware, rangerMiddleware, };