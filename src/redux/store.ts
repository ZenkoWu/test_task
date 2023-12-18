import { applyMiddleware, combineReducers, createStore  } from "redux";
import { userInfoReducer } from "./reducers/userInfoReducer";
import {thunk} from "redux-thunk"

const reducers = combineReducers({
    userInfo: userInfoReducer
})
export type TState = {
    userInfo: {
        nickname?: string,
        name?: string, 
        sername?: string,
        sex?: 'man' | 'woman',
        phone?: string,
        email?: string,
        advantages: {id: number, advantage: string}[],
        radio: {id: number, checked: boolean}[],
        checkbox: {id: number, checked: boolean}[],
        about?: string
    }
}
const middleware = applyMiddleware(thunk);
export const store = createStore(reducers, {}, middleware)
