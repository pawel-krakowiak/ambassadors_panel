import React, {useState, useEffect} from "react";
import stylesLight from './GlassCase.module.scss'
import stylesDark from './GlassCaseDark.module.scss'
import optionsStore from "../../zustand/optionsStore";
import { motion } from 'framer-motion'
import Button from "../Button/Button";
import { faX } from "@fortawesome/free-solid-svg-icons";

const GlassCase = ({item, setIsGlassCaseOpen}) => {
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
        <> { styles && <div className={styles.wrapper}> 
            <motion.div initial={{backgroundColor: 'rgba(0, 0, 0, 0.1)'}} animate={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}} onClick={() => {setIsGlassCaseOpen(false)}} className={styles.backPanel}></motion.div>
            <motion.div initial={{opacity: 0, scale: 0.7}} animate={{opacity: 1, scale: 1}} className={styles.contentContainer}>
                <div className={styles.buttonContainer}>
                    <Button onClick={() => {setIsGlassCaseOpen(false)}} square icon={faX}/>
                </div>
                <img className={styles.img} src={item.img} alt={item.name} />
                <div className={styles.descriptionContainer}>
                    <p className="bigTxt">Firmowa czapka </p>
                    <p className="bigTxt"><span className="primaryColor">{item.cost} punktów</span></p>
                    <p className="smallTxt">{item.description}</p>
                    <div className={styles.button}>Wybierz</div>
                </div>
            </motion.div>
        </div>}</>
    )
}

export default GlassCase