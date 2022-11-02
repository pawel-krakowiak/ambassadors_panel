import React, {useState, useEffect} from "react";
import stylesLight from './FaqItem.module.scss'
import stylesDark from './FaqItemDark.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import {motion, AnimatePresence} from 'framer-motion'
import { chevron, faqItem } from "../../animations/animations";
import optionsStore from "../../zustand/optionsStore";

const FaqItem = ({title, content, id}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [heightOfElement, setHeightOfElement] = useState(0)
    const [isHeightChecked, setIsHeightChecked] = useState(false)
    const [styles, setStyles] = useState(stylesLight)
    const darkMode = optionsStore(state => state.darkMode)
    useEffect(() => {
        setHeightOfElement(document.getElementById(`faq${id}`)?.clientHeight)
        setTimeout(() => {setIsHeightChecked(true)}, 500)
    }, [])

    useEffect(() => {
        if(darkMode){
            setStyles(stylesDark)
        }else{
            setStyles(stylesLight)
        }
    }, [darkMode])
    return(
        <motion.div style={{width: '100%'}} initial={{y: "-30px", opacity: 0}} animate={{y: 0, opacity: 1, transition: {duration: .4, delay: id * .2}}}>
        <motion.div className={styles.wrapper} initial={{height: '90px', transition: {duration: 0.4, type: 'linear'}}} 
        animate={{height: isOpen ? `${90 + heightOfElement}px` : '90px', transition: {duration: 0.4, type: 'linear'}}}>
            <div className={styles.header} onClick={() => {setIsOpen(!isOpen)}}>
                <div className={styles.buttonContainer}>
                    <div className={styles.button}>
                        <motion.span variants={chevron} initial="initial" animate={isOpen ? 'animate' : 'initial'}>
                            <FontAwesomeIcon icon={faChevronDown} />
                        </motion.span>
                    </div>
                </div>
                <div className={styles.title}>
                    {title}
                </div>
            </div>
            {isHeightChecked ? 
                <> <AnimatePresence>
                    {isOpen && 
                        <motion.div id={`faq${id}`} variants={faqItem} initial="initial" animate={isOpen ? 'animate' : 'initial'} exit="initial" >
                            <hr className={styles.contentSpacing}/>
                            <div className={styles.contentContainer} >
                                {content}
                            </div>
                        </motion.div>
                    } 
                </AnimatePresence></> : 
                <div id={`faq${id}`} style={{opacity: 0, y: "-100%"}} className={styles.contentContainer} >
                    {content}
                </div>
            }
        </motion.div>
        </motion.div>
    )
}

export default FaqItem