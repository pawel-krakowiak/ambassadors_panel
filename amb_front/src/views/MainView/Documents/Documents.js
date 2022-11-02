import React, {useState, useEffect} from "react";
import stylesLight from './Documents.module.scss'
import stylesDark from './DocumentsDark.module.scss'
import optionsStore from "../../../zustand/optionsStore";
import {motion, AnimatePresence} from 'framer-motion'
import Button from "../../../components/Button/Button";
import { useNavigate } from "react-router-dom";

const Documents = () => {
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

    return(
        <div className={styles.wrapper}>
            <div className={styles.title}><p className="bigTxt">Wiesz ze masz prawa? Konstytucja mówi że tak!</p></div>
            <div className={styles.content}>
                <motion.div onClick={() => {navigate('/statute')}} initial={{x: '-60%', opacity: 0}} animate={{x:0, opacity: 1, transition: {duration: .5}}} className={styles.itemContainer}>
                    <div className={styles.descriptionContainer}>
                        <p className="mediumTxt">Regulamin użytkownika</p>
                        <p className="smallTxt">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,</p>
                    </div>
                    <div className={styles.buttonContainer}>
                        <Button active circle style={{fontSize: '48px', height: '30%'}} />
                    </div>
                </motion.div>
                <motion.div onClick={() => {navigate('/rodo')}} initial={{x: '-60%', opacity: 0}} animate={{x:0, opacity: 1, transition: {duration: .5, delay: .2}}} className={styles.itemContainer}>
                    <div className={styles.descriptionContainer}>
                        <p className="mediumTxt">Klauzula RODO</p>
                        <p className="smallTxt">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,</p>
                    </div>
                    <div className={styles.buttonContainer}>
                        <Button active circle style={{fontSize: '48px', height: '30%'}} />
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default Documents