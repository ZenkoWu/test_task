import { NavLink, useNavigate } from "react-router-dom"
import { ContentContainer } from "../ContentContainer/ContentContainer"
import s from './Main.module.css'
import  folder from '../../images/folder.svg'
import { Field, Form, Formik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import { USER_INFO  } from "../../redux/actionTypes"
import { ChangeEvent, useEffect } from "react"
import { addPhoneMask } from "../../utils/addPhoneMask"
import { TState } from "../../redux/store"

const links = [
    {title: 'Telegram', link: '#'},
    {title: 'Github', link: '#'},
    {title: 'Резюме', link: '#'}
]

const validatePhone = (value: string) => {
    return !value || value.replace(/[^\d]/g, '').length < 11 
}
const validateEmail = (email: string) => {
    const regular = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return !regular.test(email)
}

export const Main = () => { 
    
    const {phone, email} = useSelector((state: TState) => state.userInfo)
    const dispatch = useDispatch()

    const onEmailChange = (payload: string) => {
        dispatch({type: USER_INFO.CHANGE_EMAIL, payload})
    }
    const onPhoneChange = (value: EventTarget) => {
        const payload = addPhoneMask(value)
        dispatch({type: USER_INFO.CHANGE_PHONE, payload})
    }
    
    const navigate = useNavigate()
    
    const onStartBtnClick = () => {
        navigate('/start')
    }
    return (
        <ContentContainer>
            <div className={s.mainInfo}>
                <div className={s.mainInfoImg}>{'АИ'}</div>
                <div className={`${s.gap_5} d-flex flex-column`}>
                    <h2>Алексей Иванов</h2>
                    <div className={`${s.gap_15} d-flex`}>
                        {
                            links.map(el => (
                                <p>
                                    <img 
                                        src={folder} 
                                        alt="holder" 
                                        className={s.marginRight}
                                    />
                                    <NavLink to={el.link}>{el.title}</NavLink>
                                </p>
                            ))
                        }
                    </div>
                </div>
            </div>

            <Formik
                initialValues={{
                    phone: phone,
                    email: email
                }}
                onSubmit={(values)=> console.log(values)}
            >
                {({errors, touched}) => (
                    <Form className={s.form}>
                        <div className={s.inputContainer}>
                            <label
                                htmlFor="field-phone"
                                className={`${s.label} ${errors.phone && touched.phone  && s.errorLabel}`}
                            >
                             { (errors.phone && touched.phone  &&  'Введите корректный номер') || 'Номер телефона' }
                            </label>
                            <Field 
                                className={`${s.input} ${errors.phone && touched.phone && s.errorInput}`}
                                name='phone'
                                validate={()=>validatePhone(phone)}
                                placeholder='+7 (900) 000-00-00'
                                type='tel'
                                id='field-phone'
                                value={phone}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    onPhoneChange(e.target)
                                }
                            />
                        </div>
                        
                        <div className={s.inputContainer}>
                            <label
                                htmlFor="field-email"
                                className={`${s.label} ${errors.email && touched.email && s.errorLabel}`}
                            >
                                 { (errors.email && touched.email  &&  'Введите корректный email' ) || 'Email' } 
                            </label>
                            <Field 
                                className={`${s.input} ${errors.email && touched.email && s.errorInput}`}
                                id='field-email'
                                name='email'
                                type='email'
                                validate={() =>validateEmail(email)}
                                placeholder='email'
                                value={email}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => 
                                    onEmailChange(e.target.value)
                                }
                            />
                        </div>
                        <button
                            id="button-start"
                            disabled={errors.email || errors.phone ? true : false}
                            className={s.submitBtn}
                            type="submit"
                            onClick={onStartBtnClick}
                        >
                            Начать
                        </button>
                    </Form>
                )}
            </Formik>

        </ContentContainer>
    )
}