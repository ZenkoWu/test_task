import { USER_INFO } from "./actionTypes";

export const form = {
    changePhone:  (payload: string) => ({type: USER_INFO.CHANGE_PHONE, payload}),
}

