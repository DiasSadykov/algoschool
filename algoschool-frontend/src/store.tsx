import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "./Reducers";
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))
export default createStore(rootReducer, composedEnhancer);
