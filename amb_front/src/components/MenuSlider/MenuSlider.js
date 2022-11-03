import React, {useState, useEffect} from "react";
import stylesLight from './MenuSlider.module.scss'
import stylesDark from './MenuSliderDark.module.scss'
import optionsStore from "../../zustand/optionsStore";
import {motion, AnimatePresence} from 'framer-motion'
import Button from "../Button/Button";
import { NavLink } from "react-router-dom";

const MenuSlider = () => {
    const [styles, setStyles] = useState(false)
    const darkMode = optionsStore(state => state.darkMode)
    const menuType = optionsStore(state => state.menuType)
    const glassCaseContent = optionsStore(state => state.glassCaseContent)
    useEffect(() => {
        if(darkMode){
            setStyles(stylesDark)
        }else{
            setStyles(stylesLight)
        }
    }, [darkMode])

    return(
        <>{styles && <motion.div  className={styles.wrapper} initial={{bottom: '-90%', transition: {duration: .5}}} 
        animate={{bottom: menuType === 'null' ? '-90%' : '0%', transition: {duration: .5}}} >
            {menuType === 'menu' && 
                <div className={styles.navContainer}>
                    <NavLink id='/profile' to="/profile"><p className="bigTxt">O tobie</p></NavLink>
                    <NavLink id='/awards' to="/awards"><p className="bigTxt">Nagrody</p></NavLink>
                    <NavLink id='/tasks' to="/tasks"><p className="bigTxt">Jak zdobyć punkty</p></NavLink>
                </div>
            }
            {menuType === 'award' && 
                <div className={styles.contentContainer}>
                    <img className={styles.img} src={glassCaseContent?.img} alt={glassCaseContent?.name} />
                    <div className={styles.descriptionContainer}>
                        <p className="bigTxt">{glassCaseContent?.name} </p>
                        <p className="bigTxt"><span className="primaryColor">{glassCaseContent?.cost} punktów</span></p>
                        <p className="mediumTxt">{glassCaseContent?.description}</p>
                        <div className={styles.button}>Wybierz</div>
                    </div>
                </div>
            }
        </motion.div>}</>
    )
}

export default MenuSlider