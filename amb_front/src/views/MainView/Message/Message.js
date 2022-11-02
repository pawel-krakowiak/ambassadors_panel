import React, {useState, useEffect} from "react";
import stylesLight from './Message.module.scss'
import stylesDark from './MessageDark.module.scss'
import optionsStore from "../../../zustand/optionsStore";
import {motion, AnimatePresence} from 'framer-motion'
import userStore from '../../../zustand/userStore'
import messagesStore from '../../../zustand/messagesStore'

const Message = () => {
    const [styles, setStyles] = useState(false)
    const darkMode = optionsStore(state => state.darkMode)
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
        <>{styles && 
            <div className={styles.wrapper}>
            <motion.form onSubmit={handleSubmit} initial={{scale: 0.6}} animate={{scale: 1}} className={styles.content}>
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
            </motion.form>
        </div>
        }</>
        
    )
}

export default Message