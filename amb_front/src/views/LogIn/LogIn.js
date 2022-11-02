import React, {useState, useEffect} from "react";
import stylesLight from './LogIn.module.scss'
import stylesDark from './LogInDark.module.scss'
import optionsStore from '../../zustand/optionsStore'
import userStore from '../../zustand/userStore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb, faMoon, faRightFromBracket, faMessage } from '@fortawesome/free-solid-svg-icons'
import logo from '../../assets/logo.png'
import {motion, AnimatePresence} from 'framer-motion'

const Menu = () => {
    const [styles, setStyles] = useState(stylesLight)
    const darkMode = optionsStore(state => state.darkMode)
    const isLogged = optionsStore(state => state.isLogged)
    const changeDarkMode = optionsStore(state => state.changeDarkMode)
    useEffect(() => {
        if(darkMode){
            setStyles(stylesDark)
        }else{
            setStyles(stylesLight)
        }
    }, [darkMode])
    const [isResetView, setIsResetView] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [messageError, setMessageError] = useState(false)

    const [contactMsg, setContactMsg] = useState({
        mail: '',
        password: '',
    })

    const handleChange = (e) => {
        setContactMsg({...contactMsg, [e.target.name]: e.target.value})
        setMessageError(false)
    }

    const logIn = userStore(state => state.logIn)
    const handleSubmit = (e) => {
        e.preventDefault()
        logIn({data: contactMsg, setMessageError})
    }


    return(
        <div className={styles.wrapper}>
                <div className={styles.left}>
                    
                    {isResetView &&
                    <div className={styles.forgottenPasswordContaine}>

                    </div>
                    }
                    <AnimatePresence>{!isResetView &&< motion.form onSubmit={handleSubmit} initial={{scale: 0.6}} animate={{scale: 1}} 
                    exit={{scale: 0.6, transition: {type: 'linear', duration: .4}}} className={styles.logInForm}>
                    <p className={styles.welcome}>Witaj Ponownie 🎉</p>
                    <div className={styles.floatLabel}> 
                        <input autoComplete="off" required type="email" name='mail'  value={contactMsg.mail}  onChange={handleChange}/>
                        <label className={contactMsg.mail.length > 0 && styles.active} htmlFor="mail">
                            Email
                        </label>
                    </div>
                    <div className={styles.floatLabel}> 
                        <input autoComplete="off" required type={showPassword ? 'text' : 'password'} name='password'  value={contactMsg.password}  onChange={handleChange}/>
                        <label className={contactMsg.password.length > 0 && styles.active} htmlFor="password">
                            Hasło
                        </label>
                    </div>
                    <div className={styles.errorBox}>
                        <AnimatePresence>
                        {messageError && <motion.div initial={{scale: 0.6}} animate={{scale: 1}} exit={{scale: 0}} style={{color: 'limegreen'}} className="smallTxt">{messageError}</motion.div>}
                        </AnimatePresence>
                    </div>
                    <button type="submit" className={styles.btn}><p className='mediumTxt'>Zaloguj się</p></button>
                    <p onClick={() => {setIsResetView(true)}} className='mediumTxt' style={{marginTop: '1rem', cursor: 'pointer'}}>Zapomniałeś hasła?</p>
                    </motion.form>}</AnimatePresence>
                </div>
                <div className={styles.right}>
                    <img className={styles.img} src={logo} alt="Just Vape Shop" />
                </div>
        </div>
    )
}

export default Menu