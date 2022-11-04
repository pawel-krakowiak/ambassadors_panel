import React, {useState, useEffect} from "react";
import stylesLight from './NextAward.module.scss'
import stylesDark from './NextAwardDark.module.scss'
import optionsStore from "../../../../zustand/optionsStore";
import {motion} from 'framer-motion'
import itemsStore from "../../../../zustand/itemsStore";

const NextAward = ({style}) => {
    const [styles, setStyles] = useState(false)
    const darkMode = optionsStore(state => state.darkMode)
    useEffect(() => {
        if(darkMode){
            setStyles(stylesDark)
        }else{
            setStyles(stylesLight)
        }
    }, [darkMode])
    const closestItem = itemsStore(state => state.closestItem)

    return(
        <>{styles&& 
        <div style={{...style}} className={styles.wrapper}>
            <div className={styles.description}>
                <p className="mediumTxt">Następna nagroda:</p>
                <p className="mediumTxt"><span className="primaryColor">{closestItem.name}</span></p>
            </div>

            <div className={styles.svgContainer}>
                <svg width="100%" height="100%" viewBox="0 0 36 36">
                    <path
                        d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke={darkMode ? "#616161" : '#EBEBEB'}
                        strokeLinecap="round"
                        strokeWidth="3.1"
                        strokeDasharray="100, 100"
                    />
                </svg>
                <svg width="100%" height="100%" viewBox="0 0 36 36">
                    <motion.path
                        initial={{strokeDasharray: '0, 100'}}
                        animate={{strokeDasharray: `${closestItem.percentage}, 100`, transition: {duration: 2, type: "spring", delay: 0.7}}}
                        d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#3C83EC"
                        strokeLinecap="round"
                        strokeWidth="3"
                    />
                </svg>
            </div>
            <p className="smallTxt">Brakuje ci {closestItem.difference} punktów</p>
        </div>}</>
    )
}

export default NextAward