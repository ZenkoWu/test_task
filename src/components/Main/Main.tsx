import { NavLink, useNavigate } from "react-router-dom"
import { ContentContainer } from "../ContentContainer/ContentContainer"
import s from './Main.module.css'
import  folder from '../../images/folder.svg'
import { useDispatch, useSelector } from "react-redux"
import { USER_INFO  } from "../../redux/actionTypes"
import { ChangeEvent } from "react"
import { addPhoneMask } from "../../utils/addPhoneMask"
import { TState } from "../../redux/store"
import { validateEmail, validatePhone } from "../../utils/validationFunctions"
import { FormFields, TField } from "../Form/FormFields"
import { userInfoParams } from "../../constants"
import { userInfo } from "../../redux/actionCreators"

const links = [
    {title: 'Telegram', link: '#'},
    {title: 'Github', link: '#'},
    {title: 'Резюме', link: '#'}
]

export const Main = () => { 
    const {phone, email} = useSelector((state: TState) => state.userInfo)
    const dispatch = useDispatch()

    const onEmailChange = (value: string) => {
        dispatch(userInfo.changeParam({param: userInfoParams.email, value}))
    }
    const onPhoneChange = (value: EventTarget) => {
        const payload = addPhoneMask(value)
        dispatch(userInfo.changeParam({param: userInfoParams.phone, value: payload}))
    }
    
    const navigate = useNavigate()
    const onStartBtnClick = () => {
        navigate('/aboutUser')
    }

    const fields: TField[] = [
        {
            name: 'phone',
            label: 'Номер телефона',
            errorLabel : 'Введите корректный номер',
            validate: () => validatePhone(phone),
            type: 'tel',
            value: phone,
            onChange: (e: ChangeEvent<HTMLInputElement>) => onPhoneChange(e.target),
            placeholder: '+7 (900) 000-00-00'
        },
        {
            name: 'email',
            label: 'Email',
            errorLabel : 'Введите корректный email',
            validate: () => validateEmail(email),
            type: 'email',
            value: email,
            onChange: (e: ChangeEvent<HTMLInputElement>) => onEmailChange(e.target.value),
            placeholder: 'yourEmail@email.ru'
        }
    ]
    return (
        <ContentContainer>
            <div className={s.mainInfo}>
                <div className={s.mainInfoImg}>{'АИ'}</div>
                <div className={`${s.gap_5} d-flex flex-column`}>
                    <h2>Алексей Иванов</h2>
                    <div className={`${s.gap_15} d-flex`}>
                        {
                            links.map(el => (
                                <div>
                                    <img 
                                        src={folder} 
                                        alt="holder" 
                                        className={s.marginRight}
                                    />
                                    <NavLink to={el.link}>{el.title}</NavLink>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <FormFields 
                initialValues={{phone, email}}
                onSubmit={(values)=> console.log(values)}
                fields={fields}
                OnNextBtnClick={onStartBtnClick}
                nextBtnTitle="Начать"
            />
        </ContentContainer>
    )
}