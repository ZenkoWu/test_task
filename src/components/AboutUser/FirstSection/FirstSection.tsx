import { useDispatch, useSelector } from "react-redux"
import { TState } from "../../../redux/store"
import { ChangeEvent } from "react"
import { USER_INFO } from "../../../redux/actionTypes"
import { useNavigate } from "react-router-dom"
import { FormFields, TField } from "../../Form/FormFields"
import { validateName, validateNickname } from "../../../utils/validationFunctions"
import { userInfoParams } from "../../../constants"

export const FirstSection = ({OnNextBtnClick}: {OnNextBtnClick: ()=> void}) => {
    const {nickname, name, sername, sex} = useSelector((state: TState) => state.userInfo)
    const dispatch = useDispatch()

    const onChange = (param: keyof typeof userInfoParams, value: string) => {
        dispatch({
            type: USER_INFO.CHANGE_PARAM, 
            payload: {param, value}
        })
    }
    
    const fields: TField[] = [
        {
            name: 'nickname',
            label: 'Никнейм',
            tip: '*Вы можете использовать только буквы и цифры',
            errorLabel : 'Введите корректный никнейм',
            validate: () => validateNickname(nickname),
            type: 'text',
            value: nickname,
            onChange: (e: ChangeEvent<HTMLInputElement>) => 
                onChange(userInfoParams.nickname, e.target.value)
        },
        {
            name: 'name',
            label: 'Имя',
            tip: '*Используйте только буквы',
            errorLabel : 'Введите корректное имя',
            validate: () => validateName(name),
            type: 'text',
            value: name,
            onChange: (e: ChangeEvent<HTMLInputElement>) => 
                onChange(userInfoParams.name, e.target.value)
        },
        {
            name: 'sername',
            label: 'Фамилия',
            tip: '*Используйте только буквы',
            errorLabel : 'Введите корректную фамилию',
            validate: () => validateName(sername),
            type: 'text',
            value: sername,
            onChange: (e: ChangeEvent<HTMLInputElement>) =>
                onChange(userInfoParams.sername, e.target.value)
        },
        {
            name: 'sex',
            label: 'Пол',
            errorLabel : '',
            type: 'select',
            value: sex,
            onChange: (e: ChangeEvent<any>) => 
                onChange(userInfoParams.sex, e.target.value),
            options: [
                {
                    option: 'man'
                },
                {
                    option: 'woman'
                },
            ]
        },
    ];

    const navigate = useNavigate()
    const OnBackBtnClick = () => {
        navigate('/')
    }

    return (
        <FormFields
            initialValues={{nickname, name, sername, sex}}
            onSubmit={(values)=> console.log(values)}
            fields={fields}
            OnBackBtnClick={OnBackBtnClick}
            backBtnTitle="Назад"
            OnNextBtnClick={OnNextBtnClick}
            nextBtnTitle="Далее"
        />
    )
}