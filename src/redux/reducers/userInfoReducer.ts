import { USER_INFO  } from "../actionTypes";
import { TState } from "../store";

const initialState = {
    nickname: '',
    name: '', 
    sername: '',
    advantages: [],
    radio: 0,
    checkbox: [],
    about: '',
    phone: localStorage.getItem('phone') || '',
    email: localStorage.getItem('email') || '',
}

export const userInfoReducer = (
    state: TState['userInfo'] = initialState, 
    {
        payload, 
        type
    }: {
        payload: any, 
        type: keyof typeof USER_INFO 
    }
) => {
    switch(type) {
        case USER_INFO.CHANGE_PARAM: {
            localStorage.setItem(payload.param, payload.value)
            return {
                ...state,
               [payload.param]: payload.value
            }
        }
        default: return state;
    }
} 