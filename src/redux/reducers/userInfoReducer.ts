import { USER_INFO  } from "../actionTypes";
import { TState } from "../store";

const initialState = {
    nickname: '',
    name: '', 
    sername: '',
    advantages: [
        {id: 0, advantage: ''},
        {id: 1, advantage: ''},
        {id: 2, advantage: ''},
    ],
    sex: 'man' as const,
    radio:  [
        {id: 1, checked: false},
        {id: 2, checked: false},
        {id: 3, checked: false},
    ],
    checkbox: [
        {id: 1, checked: false},
        {id: 2, checked: false},
        {id: 3, checked: false},
    ],
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
        case USER_INFO.DELETE_ADVANTAGE: {
            const newAdvantages = state.advantages?.filter(el => el.id !== payload)
            return {
                ...state,
                advantages: newAdvantages
            }
        }
        case USER_INFO.ADD_ADVANTAGE: {
            return {
                ...state,
                advantages: [...state.advantages!, { id: state.advantages!.length , advantage: ''}]
            }
        }
        case USER_INFO.CHANGE_ADVANTAGE: {
            const newAdvantages = state.advantages!.map(el => {
                if(el.id === payload.id ) {
                    el.advantage = payload.value
                }
                return el
            })
            
            return {
                ...state,
                advantages: newAdvantages
            }
        }
        case USER_INFO.CHECK_CHANGE: {
            const newCheck = state.checkbox!.map(el => {
                if(el.id === payload ) {
                    el.checked = !el.checked
                }
                return el
            })
            
            return {
                ...state,
                checkbox: newCheck
            }
        }
        case USER_INFO.RADIO_CHANGE: {
            const newRadio = state.radio!.map(el => {
                if(el.id === payload ) {
                    el.checked = true
                }else {
                    el.checked = false
                }
                return el
            })
            
            return {
                ...state,
                radio: newRadio
            }
        }
        default: return state;
    }
} 