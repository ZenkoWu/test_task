import { Field, Form, Formik } from "formik"
import s from './FormFields.module.css'
import { ChangeEvent } from "react"
import { TState } from "../../redux/store"
import basket from '../../images/delete.png'

type TFieldType = 'text' | 'textarea' | 'select'| 'tel' | 'email' | 'checkbox' | 'radio'

export type TField = {
    name: keyof TState['userInfo'],
    label: string,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
    type: TFieldType,
    value: any,
    errorLabel?: string,
    validate?: () => void,
    tip?: string,
    options?: string[],
    placeholder?: string,
    fieldGroup?: {
        onDelete: (id: number)=> void,
        onAdd: ()=> void,
        onChange: (id: number, value: string) => void
    },
    onCheck?: (id: number, e?:any) => void
}

type TFormFields = {
    initialValues: TState['userInfo'],
    onSubmit: (values: any) => void,
    fields: TField[],
    OnBackBtnClick?: ()=> void,
    OnNextBtnClick: () => void,
    backBtnTitle?: string,
    nextBtnTitle: string,
    btnNextId: string
}

export const FormFields = ({
    initialValues,
    onSubmit,
    fields,
    OnBackBtnClick,
    OnNextBtnClick,
    backBtnTitle,
    nextBtnTitle,
    btnNextId
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
                                            {el.options.map(option => (
                                                <option value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </Field>
                                    :
                                        el.fieldGroup ?  
                                       <>
                                            { 
                                                el.value.map((subEl: any) => (
                                                    <div className={s.fieldsContainer}>
                                                        <Field
                                                            className={`
                                                                ${s.input} 
                                                                ${errors[el.name] && touched[el.name] && s.errorInput}
                                                            `}
                                                            name={el.name}
                                                            placeholder={el.placeholder || 'Placeholder'}
                                                            validate={el.validate}
                                                            type={el.type}
                                                            id={`field-${el.name}`}
                                                            value={subEl.advantage}
                                                            onChange={(e:any)=> 
                                                                el.fieldGroup?.onChange(subEl.id, e.target.value)
                                                            }
                                                        />
                                                        <div 
                                                            onClick={()=> el.fieldGroup?.onDelete(subEl.id)}
                                                            className={s.basketBtn}  
                                                        >
                                                           <img 
                                                                src={basket} 
                                                                alt="basketBtn"  
                                                            />
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <button 
                                                className={s.addBtn} 
                                                onClick={()=> el.fieldGroup?.onAdd()}
                                            >
                                                +
                                            </button>
                                        </>
                                      
                                    :
                                        el.type === 'checkbox' || el.type === 'radio' ? 
                                        <>
                                           { 
                                                el.value.map((subEl: any) => (
                                                    <div className={s.fieldsContainer}>
                                                        <label>
                                                            {subEl.id}
                                                            <Field
                                                                className={s.marginLeft_10}
                                                                name={el.name}
                                                                placeholder={el.placeholder || 'Placeholder'}
                                                                validate={el.validate}
                                                                type={el.type}
                                                                id={`field-${el.name}`}
                                                                value={subEl.id}
                                                                checked={subEl.checked}
                                                                onChange={()=> el.onCheck?.(subEl.id)}
                                                            />
                                                        </label>
                                                    </div>
                                                ))
                                            } 
                                        </>
                                    :
                                        <>
                                            <Field
                                                className={`
                                                    ${el.type === 'textarea' ?  s.textarea : s.input} 
                                                    ${errors[el.name] && touched[el.name] && s.errorInput}
                                                `}
                                                name={el.name}
                                                placeholder={el.placeholder || 'Placeholder'}
                                                as={el.type === 'textarea' && 'textarea'}
                                                validate={el.validate}
                                                type={el.type}
                                                id={`field-${el.name}`}
                                                value={el.value}
                                                onChange={el.onChange}
                                            />
                                            {
                                                el.type === 'textarea' && 
                                                el.value?.length > 0 && 
                                                <p className={s.counter}>
                                                    {el.value.length}/200
                                                </p>
                                            }
                                        </>
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
                                id={btnNextId}
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