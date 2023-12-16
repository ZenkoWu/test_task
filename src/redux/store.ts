import { applyMiddleware, combineReducers, createStore  } from "redux";
import { userInfoReducer } from "./reducers/userInfoReducer";
import {thunk} from "redux-thunk"

const reducers = combineReducers({
    userInfo: userInfoReducer
})
export type TState = {
    userInfo: {
        name: string, 
        sername: string,
        sex?: 'man' | 'woman',
        phone: string,
        email: string,
        advantages: string[],
        radio: number,
        checkbox: number[],
        about: string
    }
}
const middleware = applyMiddleware(thunk);
export const store = createStore(reducers, {}, middleware)
