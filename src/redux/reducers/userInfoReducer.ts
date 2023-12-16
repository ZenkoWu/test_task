import { USER_INFO  } from "../actionTypes";
import { TState } from "../store";

const initialState = {
    name: '', 
    sername: '',
    advantages: [],
    radio: 0,
    checkbox: [],
    about: '',
    phone: JSON.parse(localStorage.getItem('phone') || 'null') || '',
    email:  JSON.parse(localStorage.getItem('email') || 'null') || '',

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
        case USER_INFO.CHANGE_PHONE: {
            localStorage.setItem('phone', JSON.stringify(payload))
            return {
                ...state,
               phone: payload
            }
        }
        case  USER_INFO.CHANGE_EMAIL: {
            localStorage.setItem('email', JSON.stringify(payload))
            return {
                ...state,
               email: payload
            }
        }

        default: return state;
    }
} 