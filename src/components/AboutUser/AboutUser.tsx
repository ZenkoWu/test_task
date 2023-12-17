import { useState } from "react"
import { ContentContainer } from "../ContentContainer/ContentContainer"
import { FirstSection } from "./FirstSection/FirstSection"
import { ThirdSection } from "./ThirdSection/ThirdSection"
import { SecondSection } from "./SecondSection/SecondSection"
import s from './AboutUser.module.css'

const sections = [1, 2, 3]

export const AboutUser = () => { 
    const [section, setSection] = useState(1)

    const OnNextBtnClick = () => {
        setSection(prev => prev + 1)
    }
    return (
        <ContentContainer> 
            <div className={s.container}>
                <div>
                    <div className="d-flex"> 
                        <div className={`
                            ${s.sectionBar} 
                            ${section > 1 ? s.fulfilledBg : s.defaultBg}`
                        }>
                            <input 
                                checked={section === 1} 
                                onClick={() => setSection(1)} 
                                type="radio"
                                className={`${s.sectionBtn} ${s.sectionBtn_first}`} 
                            />
                            <input 
                                checked={section === 2} 
                                onClick={() => setSection(2)} 
                                type="radio" 
                                className={`${s.sectionBtn} ${s.sectionBtn_second}`} 
                            />
                        
                        </div>
                        <div className={` 
                            ${s.sectionBar} 
                            ${section === 3 ? s.fulfilledBg : s.defaultBg}
                        `}>
                            <input 
                                checked={section === 3} 
                                onClick={() => setSection(3)} 
                                type="radio" 
                                className={`${s.sectionBtn} ${s.sectionBtn_third}`} 
                                />
                        </div>
                    </div>
                 
                    <div className={s.sectionNumbers}>
                        {
                            sections.map(number => (
                                <div className={`
                                    ${section == number && s.fwBold} 
                                    ${s.sectionNumber}
                                `}>
                                    {number}
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className={s.marginTop}>
                    {
                        section === 1 ? 
                            <FirstSection OnNextBtnClick={OnNextBtnClick}/>
                        :
                        section === 2 ? 
                            <SecondSection 
                                OnBackBtnClick={()=> setSection(1)} 
                                OnNextBtnClick={OnNextBtnClick}
                            />
                        : 
                            <ThirdSection OnBackBtnClick={()=> setSection(2)} />

                    }
                </div>
            </div>
        </ContentContainer>
    )
}