import React, {useState, useEffect} from "react";
import stylesLight from './Profile.module.scss'
import stylesDark from './ProfileDark.module.scss'
import optionsStore from "../../../zustand/optionsStore";
import {motion, AnimatePresence} from 'framer-motion'
import LastActivity from "./LastActivity/LastActivity";
import Menu from "./Menu/Menu";
import Welcome from "./Welcome/Welcome";
import NextAward from "./NextAward/NextAward";

const Profile = () => {
    const [styles, setStyles] = useState(false)
    const darkMode = optionsStore(state => state.darkMode)
    const isMobile = optionsStore(state => state.isMobile)
    useEffect(() => {
        if(darkMode){
            setStyles(stylesDark)
        }else{
            setStyles(stylesLight)
        }
    }, [darkMode])


    return(
        <>{styles &&<div className={styles.wrapper}>
            <div className={styles.title}>
                <p className="bigTxt">Oto <span className="primaryColor">twój</span> profil </p>
            </div>
            <div className={styles.content}>
                <Welcome />
                <Menu />
                <LastActivity />
                <NextAward />
            </div>
        </div>}</>
    )
}

export default Profile