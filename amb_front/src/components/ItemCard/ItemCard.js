import React, {useState, useEffect} from "react";
import stylesLight from './ItemCard.module.scss'
import stylesDark from './ItemCardDark.module.scss'
import optionsStore from "../../zustand/optionsStore";
import { motion } from 'framer-motion'
import Button from "../Button/Button";
import GlassCase from "../GlassCase/GlassCase";

const ItemCard = ({long, id, item, active}) => {
    const [styles, setStyles] = useState(false)
    const darkMode = optionsStore(state => state.darkMode)
    useEffect(() => {
        if(darkMode){
            setStyles(stylesDark)
        }else{
            setStyles(stylesLight)
        }
    }, [darkMode])
    const [isGlassCaseOpen, setIsGlassCaseOpen] = useState(false)


    return(
        <>
            <motion.div initial={{x: "30px", y: "30px", opacity: 0}} animate={{x: "0px", y: "0px", opacity: 1, transition: {duration: .4, delay: id * 0.2}}} 
            className={long ? styles.wrapperLng : styles.wrapper} style={{cursor: active && 'pointer'}} onClick={() => {active && setIsGlassCaseOpen(true)}}>
               <img src={item.img} alt={item.name} className={styles.img} />
                <div className={styles.contentContainer}>
                    <div className={styles.descriptionContainer}>
                        {long ? <>
                            <p className="mediumTxt">{item.name}<span className={active ? "primaryColor" : 'disabledColor'}> {item.cost} punktów</span></p> 
                            <p className="smallTxt">{item.description}</p>
                            </> :
                            <>
                            <p  className="smallTxt">{item.name}</p>
                            <p className="mediumTxt"><span className={active ? "primaryColor" : 'disabledColor'}>{item.cost} punktów</span></p>
                            </>  
                        }
                    </div>
                    <Button onClick={() => {active && setIsGlassCaseOpen(true)}} active={active} circle style={{fontSize: long && '42px'}}/>
                </div>
            </motion.div>
            {isGlassCaseOpen && <GlassCase setIsGlassCaseOpen={setIsGlassCaseOpen} item={item} />}
        </>
    )
}

export default ItemCard