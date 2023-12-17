import { userInfoParams } from "../constants";
import { USER_INFO } from "./actionTypes";

export const userInfo = {
    changeParam: (payload: {
        param: keyof typeof userInfoParams, 
        value: string
    }) => ({type: USER_INFO.CHANGE_PARAM, payload}),
}

