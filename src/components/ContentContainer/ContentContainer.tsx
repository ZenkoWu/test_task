import React from "react"
import s from './ContentContainer.module.css'

export const ContentContainer = ({children}: {children: React.ReactNode}) => {
    return (
        <div className={s.contentContainer}>
            <div className={s.contentBackground}>
                {children}
            </div>
        </div>
    )
}