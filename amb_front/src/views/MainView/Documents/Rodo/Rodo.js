import React, {useState, useEffect} from "react";
import stylesLight from './Rodo.module.scss'
import stylesDark from './RodoDark.module.scss'
import optionsStore from "../../../../zustand/optionsStore";
import {motion, AnimatePresence} from 'framer-motion'
import FaqItem from '../../../../components/FaqItem/FaqItem'
const Rodo = () => {
    const [styles, setStyles] = useState(false)
    const darkMode = optionsStore(state => state.darkMode)
    useEffect(() => {
        if(darkMode){
            setStyles(stylesDark)
        }else{
            setStyles(stylesLight)
        }
    }, [darkMode])


    return(
        <div className={styles.wrapper}>
            <div className={styles.title}><p className="bigTxt">Klauzula Rodo</p></div>
            <div className={styles.content}>
                <FaqItem id={1} title={'Pierwszy paragraf'} content={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex'} />
                <FaqItem id={2} title={'Drugi paragraf'} content={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex'} />
                <FaqItem id={3} title={'Trzeci paragraf'} content={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex'} />
                <FaqItem id={4} title={'Czwarty paragraf'} content={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex'} />
            </div>
        </div>
    )
}

export default Rodo