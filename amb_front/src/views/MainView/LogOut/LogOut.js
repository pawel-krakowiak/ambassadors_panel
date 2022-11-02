import React, {useState, useEffect} from "react";
import stylesLight from './LogOut.module.scss'
import stylesDark from './LogOutDark.module.scss'
import optionsStore from "../../../zustand/optionsStore";
import {motion} from 'framer-motion'
import {useNavigate} from 'react-router-dom'
import userStore from '../../../zustand/userStore'

const LogOut = () => {
    const [styles, setStyles] = useState(false)
    const darkMode = optionsStore(state => state.darkMode)
    useEffect(() => {
        if(darkMode){
            setStyles(stylesDark)
        }else{
            setStyles(stylesLight)
        }
    }, [darkMode])

    const navigate = useNavigate()
    const logOut = userStore(state => state.logOut)
    return(
        <>{styles && 
            <div className={styles.wrapper}>
            <motion.div initial={{scale: 0.6}} animate={{scale: 1}} className={styles.content}>
                <p className='bigTxt'>Czy na pewno chcesz sie wylogować?</p>
                <div className={styles.buttonsContainer}>
                    <div onClick={() => {navigate(-1)}} className={styles.button}><p className='bigTxt'>Nie</p></div>
                    <div onClick={() => {logOut()}} className={styles.button}><p className='bigTxt'>Tak</p></div>
                </div>
            </motion.div>
        </div>
        }</>
        
    )
}

export default LogOut