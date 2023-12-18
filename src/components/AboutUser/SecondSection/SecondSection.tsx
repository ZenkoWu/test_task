import { useDispatch, useSelector } from "react-redux"
import { TState } from "../../../redux/store"
import { ChangeEvent } from "react"
import { USER_INFO } from "../../../redux/actionTypes"
import { FormFields, TField } from "../../FormFields/FormFields"
import { userInfoParams } from "../../../constants"

export const SecondSection = ({
    OnBackBtnClick, 
    OnNextBtnClick
}: {
    OnBackBtnClick: ()=> void,
    OnNextBtnClick: ()=> void,
}) => {
    const {advantages, checkbox, radio} = useSelector((state: TState) => state.userInfo)
    const dispatch = useDispatch()

    const onChange = (param: keyof typeof userInfoParams, value: string) => {
        dispatch({
            type: USER_INFO.CHANGE_PARAM, 
            payload: {param, value}
        })
    }

    const onAdvantageChange = (id: number, value: string) => {
        dispatch({
            type: USER_INFO.CHANGE_ADVANTAGE, 
            payload: {id, value}
        })
    }
    const onBasketClick = (id: number) => {
        dispatch({
            type: USER_INFO.DELETE_ADVANTAGE, 
            payload: id
        })
    }
    const onAdvantageAdd = () => {
        dispatch({
            type: USER_INFO.ADD_ADVANTAGE, 
        })
    }

    const onCheckBtnClick = ( id: number) => {
        dispatch({
            type: USER_INFO.CHECK_CHANGE, 
            payload: id
        })
    }

    const onRadioBtnClick = (id: number) => {
        dispatch({
            type: USER_INFO.RADIO_CHANGE, 
            payload: id
        })
    }
    const fields: TField[] = [
        {
            name: 'advantages',
            label: 'Преимущества',
            type: 'text',
            value: advantages,
            fieldGroup: {
                onDelete: onBasketClick,
                onAdd: onAdvantageAdd,
                onChange: onAdvantageChange
            },

        },
        {
            name: 'checkbox',
            label: 'Checkbox группа',
            type: 'checkbox',
            value: checkbox,
            onChange: (e: ChangeEvent<HTMLInputElement>) => 
                onChange(userInfoParams.name, e.target.value),
            onCheck: onCheckBtnClick
        },
        {
            name: 'radio',
            label: 'Radio группа',
            type: 'radio',
            value: radio,
            onChange: (e: ChangeEvent<HTMLInputElement>) =>
                onChange(userInfoParams.sername, e.target.value),
            onCheck: onRadioBtnClick
        },
    ];


    return (
        <FormFields
            initialValues={{advantages, checkbox, radio}}
            onSubmit={(values)=> console.log(values)}
            fields={fields}
            OnBackBtnClick={OnBackBtnClick}
            backBtnTitle="Назад"
            OnNextBtnClick={OnNextBtnClick}
            nextBtnTitle="Далее"
            btnNextId='button-next'
        />
    )
}