import React, {useState, useEffect} from "react";
import stylesLight from './InfoCard.module.scss'
import stylesDark from './InfoCardDark.module.scss'
import optionsStore from "../../zustand/optionsStore";
import {motion, AnimatePresence} from 'framer-motion'
import Button from "../Button/Button";

const InfoCard = ({i, item}) => {
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
        <motion.div  initial={{x: '-60%', opacity: 0}} 
        animate={{x:0, opacity: 1, transition: {duration: .5, delay: i * .2}}} className={styles.itemContainer}>
            <div className={styles.descriptionContainer}>
                <p className="mediumTxt">{item.name}</p>
                <p className="smallTxt">{item.description}</p>
             </div>
            <div className={styles.buttonContainer}>
                <Button active circle value={item.reward} style={{fontSize: '48px', height: '30%'}} />
            </div>
        </motion.div>
    )
}

export default InfoCard