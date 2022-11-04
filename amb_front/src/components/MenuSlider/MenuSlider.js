import React, {useState, useEffect} from "react";
import stylesLight from './MenuSlider.module.scss'
import stylesDark from './MenuSliderDark.module.scss'
import optionsStore from "../../zustand/optionsStore";
import userStore from "../../zustand/userStore";
import messagesStore from "../../zustand/messagesStore";
import {motion, AnimatePresence} from 'framer-motion'
import Button from "../Button/Button";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const MenuSlider = () => {
    const [styles, setStyles] = useState(false)
    const darkMode = optionsStore(state => state.darkMode)
    const menuType = optionsStore(state => state.menuType)
    const changeMenuType = optionsStore(state => state.changeMenuType)
    const glassCaseContent = optionsStore(state => state.glassCaseContent)
    const navigate = useNavigate()
    const logOut = userStore(state => state.logOut)
    useEffect(() => {
        if(darkMode){
            setStyles(stylesDark)
        }else{
            setStyles(stylesLight)
        }
    }, [darkMode])


    const name = userStore(state => state.name)
    const messageError = messagesStore(state => state.messageError)
    const resetMessage = messagesStore(state => state.resetMessage)
    const sendMessage = messagesStore(state => state.sendMessage)
    const initialState = {
        name: name,
        title: '',
        message: '',
    }
    const [contactMsg, setContactMsg] = useState(initialState)
    const handleSubmit = (e) => {
        e.preventDefault()
        sendMessage(contactMsg)
    }
    const handleChange = (e) => {
        setContactMsg({...contactMsg, [e.target.name]: e.target.value})
        resetMessage()
    }

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
            {menuType === 'logout' && 
                <div className={styles.logOutContainer}>
                    <p className='bigTxt'>Czy na pewno chcesz sie wylogować?</p>
                    <div onClick={() => {changeMenuType('null')}} className={styles.button}><p className='bigTxt'>Nie</p></div>
                    <div onClick={() => {logOut(navigate)}} className={styles.button}><p className='bigTxt'>Tak</p></div>
                </div>
            }
            {menuType === 'message' && 
                 <form onSubmit={handleSubmit} className={styles.messageContainer}>
                 <p className='bigTxt'>Zostaw nam wiadomość</p>
                 <div className={styles.floatLabel}> 
                     <input autoComplete="off" required type="text" name='title' maxLength={55}  value={contactMsg.title}  onChange={handleChange}/>
                     <label className={contactMsg.title.length > 0 && styles.active} htmlFor="title">
                         Tytuł
                      </label>
                 </div>
                 <div className={styles.floatLabel}> 
                     <textarea autoComplete="off" required type="textarea" name='message'  value={contactMsg.message}  onChange={handleChange}/>
                     <label className={contactMsg.message.length > 0 && styles.active} htmlFor="message">
                         Twoja wiadomość
                      </label>
                 </div>
                 <div className={styles.errorBox}>
                     <AnimatePresence>
                     {messageError && <motion.div initial={{scale: 0.6}} animate={{scale: 1}} exit={{scale: 0}} style={{color: 'limegreen'}} className="smallTxt">{messageError}</motion.div>}
                     </AnimatePresence>
                 </div>
                 <button type="submit" className={styles.btn}><p className='mediumTxt'>Wyślij</p></button>
             </form>
            }
        </motion.div>}</>
    )
}

export default MenuSlider