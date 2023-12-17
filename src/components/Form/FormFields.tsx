import { Field, Form, Formik } from "formik"
import s from './FormFields.module.css'
import { ChangeEvent } from "react"
import { TState } from "../../redux/store"

export type TField = {
    name: 'phone' | 'email' | 'name' | 'sername' | 'nickname' | 'sex' ,
    label: string,
    errorLabel?: string,
    validate?: () => void,
    type: 'text' | 'textarea' | 'select'| 'tel' | 'email',
    value: string | undefined,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    tip?: string,
    options?: {option: string}[],
    placeholder?: string

}

type TFormFields = {
    initialValues: TState['userInfo'],
    onSubmit: (values: any) => void,
    fields: TField[],
    OnBackBtnClick?: ()=> void,
    OnNextBtnClick?: () => void,
    backBtnTitle?: string,
    nextBtnTitle?: string
}

export const FormFields = ({
    initialValues,
    onSubmit,
    fields,
    OnBackBtnClick,
    OnNextBtnClick,
    backBtnTitle,
    nextBtnTitle
}: TFormFields) => {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
        > 
            {({errors, touched}) => (
                
                <Form className={s.form}>
                    {
                        fields.map(el => (
                            <div className={s.inputContainer}>
                                <label
                                    htmlFor={`field-${el.name}`}
                                    className={`
                                        ${s.label} 
                                        ${errors[el.name] && touched[el.name] && s.errorLabel
                                    }`}
                                >
                                    { 
                                        (errors[el.name] && touched[el.name]  &&  el.errorLabel) ||  
                                        el.label 
                                    }
                                </label>

                                { 
                                    el.options ? 
                                        <Field 
                                            as="select" 
                                            name={el.name}
                                            id={`field-${el.name}`}
                                            className={s.input}
                                            value={el.value}
                                            onChange={el.onChange}
                                            
                                        >
                                            {el.options.map(el => (
                                                <option value={el.option}>{el.option}</option>
                                            ))}
                                        
                                        </Field> 
                                        // <select
                                        // className={s.input}
                                        //  value={name} 
                                        //  onChange={(e: ChangeEvent<any>) => el.onChange(e.target.value)}>
                                        //     {el.options.map(el => (
                                        //         <option value={el.option}>{el.option}</option>
                                        //     ))}
                                        // </select>
                                    :
                                    el.type === 'textarea' ? 
                                    <div>
                                        <Field
                                            className={`
                                                ${s.textarea} 
                                                ${errors[el.name] && touched[el.name] && s.errorInput}
                                            `}
                                            name={el.name}
                                            placeholder={el.placeholder || 'Placeholder'}
                                            as='textarea'
                                            id={`field-${el.name}`}
                                            value={el.value}
                                            onChange={el.onChange}
                                        />
                                        {el.value?.length && <p>{el.value.length}/200</p>}
                                    </div>
                                :
                                        <Field
                                            className={`
                                                ${s.input} 
                                                ${errors[el.name] && touched[el.name] && s.errorInput
                                            }`}
                                            name={el.name}
                                            validate={el.validate}
                                            placeholder={el.placeholder || 'Placeholder'}
                                            type={el.type}
                                            id={`field-${el.name}`}
                                            value={el.value}
                                            onChange={el.onChange}
                                        />
                                }
                                { 
                                    el.tip && 
                                    <p className={s.tip}>
                                        { 
                                            (errors[el.name] && touched[el.name]  &&  el.tip) || 'Tip' 
                                        }
                                    </p>
                                }
                            </div>
                        ))
                    }
                    <div className={s.btnGroup}>
                        {
                            OnBackBtnClick &&
                            <button
                                id="button-back"
                                disabled={Object.keys(errors).length > 0}
                                className={s.backBtn}
                                type="submit"
                                onClick={OnBackBtnClick}
                            >
                                {backBtnTitle}
                            </button>
                        }
                    
                        {
                            OnNextBtnClick && 
                            <button
                                id="button-next"
                                disabled={Object.keys(errors).length > 0}
                                className={s.nextBtn}
                                type="submit"
                                onClick={OnNextBtnClick}
                            >
                                {nextBtnTitle}
                            </button>
                        }
                    </div>
                </Form>
            )}
        </Formik>
    )
}