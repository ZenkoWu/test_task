import s from './Modal.module.css';
import successImg from '../../images/successSending.png'
import errorImg from '../../images/errorSending.png'

type TModal = {
    opened: boolean,
    setOpened:(open: boolean) => void, 
    onSuccess: ()=> void,
    isError: boolean
}
export const Modal = ({
    setOpened, 
    opened, 
    onSuccess,
    isError
}: TModal) => {

    const onCancel = () => {
        setOpened(false)
    }

    const onRejection = (e: any) => {
        opened && e?.target?.className == s.wrapper_modal && onCancel()
    }

    return (
        <div 
            className={`${s.wrapper_modal} ${isError && s.pointer}`} 
            onClick={(e:any)=> isError && onRejection(e)}
        >
            {
                isError ? 
                    <div className={`${s.errorModal}`}>
                        <div className={s.titleContainer}>
                            <p className={s.title}>
                                Ошибка
                            </p>
                            <button 
                                className={s.cancelBtn}
                                onClick={onCancel}
                            >
                                    x
                            </button>
                        </div>
                        <img 
                            src={errorImg} 
                            className={s.img}
                            alt='SendingStatusImg'
                        />
                        <button 
                            id='button-close'
                            className={`${s.btn} ${s.btnError}`}
                            onClick={onCancel} 
                        >
                            Закрыть
                        </button>
                    </div>
                :
                    <div className={`${s.modal}`}>
                        <p className={s.title}>
                            Форма успешно отправлена
                        </p>

                        <img 
                            src={successImg} 
                            className={s.img}
                            alt='SendingStatusImg'
                        />
                        <div className='d-flex'>
                            
                            <button 
                                id='button-to-main'
                                className={`${s.btn}`}
                                onClick={onSuccess} 
                            >
                                Перейти на главную
                            </button>
                        </div>
                    </div>
            }
        </div>
    )
}