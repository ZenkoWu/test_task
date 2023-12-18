import { useDispatch, useSelector } from "react-redux"
import { TState } from "../../../redux/store"
import { createPortal } from "react-dom"
import { ChangeEvent, useState } from "react"
import { Modal } from "../../Modal/Modal"
import { useNavigate } from "react-router-dom"
import { FormFields, TField } from "../../FormFields/FormFields"
import { userInfoParams } from "../../../constants"
import { validateAbout } from "../../../utils/validationFunctions"
import { USER_INFO } from "../../../redux/actionTypes"

export const ThirdSection = ({
    OnBackBtnClick
}: {
    OnBackBtnClick: ()=> void
}) => {
    const [opened, setOpened] = useState(false)
    const [isError, setIsError] = useState(false)

    const userInfo = useSelector((state: TState) => state.userInfo)
    const about = userInfo.about

    const dispatch = useDispatch()

    const onChange = (value: string) => {
        if(value.length <= 200) {
            dispatch({
                type: USER_INFO.CHANGE_PARAM, 
                payload: {
                    param: userInfoParams.about, 
                    value
                }
            })
        }
    }
    const navigate = useNavigate()

    const fields: TField[] = [
        {
            name: 'about',
            label: 'О себе',
            errorLabel: 'Введите текст не менее 20 символов',
            type: 'textarea',
            validate: () => validateAbout(about),
            value: about,
            onChange: (e: ChangeEvent<HTMLInputElement>) => 
                onChange(e.target.value),
        },
    ]
    const sendUserInfo = (data: TState['userInfo']) => {
        fetch('/fakeApi', { //todo set real url
            method: 'POST',
            headers: {
            'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        })
        .then((res)=> {
            if (res.status >= 200 && res.status < 300) {
                return res;
            } else {
                let error = new Error(res.statusText);
                throw error
            }
        })
        .catch((e)=> {
            // setIsError(true) - установить, если есть ошибки 
            console.log(e)
        })
        .finally(()=> setOpened(true))
    }

    const onSendBtnClick = () => {
        setTimeout(()=> {
            sendUserInfo(userInfo)
        }, 2000)
    }

    return (
        <div>
            {
                opened && createPortal(
                    <Modal 
                        setOpened={setOpened}
                        opened={opened}
                        isError={isError}
                        onSuccess={()=> navigate('/')}
                    />, 
                    document.getElementById('content')!
                )
            }
        
            <FormFields
                initialValues={{about}}
                onSubmit={(values)=> console.log(values)}
                fields={fields}
                OnBackBtnClick={OnBackBtnClick}
                backBtnTitle="Назад"
                OnNextBtnClick={onSendBtnClick}
                nextBtnTitle="Отправить"
                btnNextId="button-send"
            />
        </div>
    )
}
