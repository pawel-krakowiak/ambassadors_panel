import React, {useState, useEffect} from "react";
import stylesLight from './LogIn.module.scss'
import stylesDark from './LogInDark.module.scss'
import optionsStore from '../../zustand/optionsStore'
import userStore from '../../zustand/userStore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import logo from '../../assets/logo.png'
import {motion, AnimatePresence} from 'framer-motion'
import mailboxLight from '../../assets/mailboxLight.svg'
import mailboxDark from '../../assets/mailboxDark.svg'

const Menu = () => {
    const [styles, setStyles] = useState(stylesLight)
    const darkMode = optionsStore(state => state.darkMode)
    const isMobile = optionsStore(state => state.isMobile)
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
    const [loggedAnim, setLoggedAnim] = useState(false)
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
        logIn({data: contactMsg, setMessageError, setLoggedAnim})
    }

    const handleClickReset = () => {
        if(contactMsg.mail !== ""){
            setIsResetView(true)
            setContactMsg({
                mail: '',
                password: '', 
            })
        }else{
            setMessageError('musisz najpierw wpisać maila')

        }
    }
    return(
        <> {styles &&<div className={styles.wrapper}>
                <motion.div className={styles.left} initial={{ left: 0}} animate={{ left: loggedAnim ? '-100%' : 0}}>
                <AnimatePresence>{isResetView &&
                    <motion.div className={styles.forgottenPasswordContainer} initial={{scale: 0.6, display: 'none'}} animate={{scale: 1, display: 'flex',
                     transition: {delay: .4}}} exit={{scale: 0.6, transition: {type: 'linear', duration: .3}}}>
                        <img className={styles.svg} src={darkMode ? mailboxDark : mailboxLight} alt="mailbox" />
                        <p className="bigTxt">Sprawdź skrzynke mailową!</p>
                        <p className="mediumTxt">Powinieneś w niej znaleźć nowe hasło tymczasowe.</p>
                        <button onClick={() => {setIsResetView(false)}} className={styles.btn}><p className='mediumTxt'>Wróć do logowania</p></button>
                    </motion.div>
                    }</AnimatePresence>
                    <AnimatePresence>{!isResetView &&<motion.form onSubmit={handleSubmit} initial={{scale: 0.6, display: 'none'}} 
                    animate={{scale: 1, display: 'block', transition: {delay: .4}}} 
                    exit={{scale: 0.6, transition: {type: 'linear', duration: .3}}} className={styles.logInForm}>
                    <p className={styles.welcome}>Witaj Ponownie 🎉</p>
                    <div className={styles.floatLabel}> 
                        <div className={styles.inputContainer}>
                            <input autoComplete="off" required type="email" name='mail'  value={contactMsg.mail}  onChange={handleChange}/>
                            <label className={contactMsg.mail.length > 0 && styles.active} htmlFor="mail">
                                Email
                            </label>
                        </div>
                    </div>
                    <div className={styles.floatLabel}> 
                        <div className={styles.inputContainer}>
                            <input autoComplete="off" required type={showPassword ? 'text' : 'password'} name='password'  value={contactMsg.password}  onChange={handleChange}/>
                            <label className={contactMsg.password.length > 0 && styles.active} htmlFor="password">
                                Hasło
                            </label>
                        </div>
                        <div onClick={() => {setShowPassword(!showPassword)}} className={styles.eyeContainer}>
                            <FontAwesomeIcon className="bixTxt" icon={showPassword ? faEyeSlash : faEye} />
                        </div>
                    </div>
                    <div className={styles.errorBox}>
                        <AnimatePresence>
                        {messageError && <motion.div initial={{scale: 0.6}} animate={{scale: 1}} exit={{scale: 0}} style={{color: 'limegreen'}} className="smallTxt">{messageError}</motion.div>}
                        </AnimatePresence>
                    </div>
                    <button type="submit" className={styles.btn}><p className='mediumTxt'>Zaloguj się</p></button>
                    <p onClick={handleClickReset} className='mediumTxt' style={{marginTop: '1rem', cursor: 'pointer'}}>Zapomniałeś hasła?</p>
                    </motion.form>}</AnimatePresence>
                </motion.div>
                {isMobile ? 
                    <>{loggedAnim && <motion.div className={styles.right} initial={{width: '100%', left: '100%'}} 
                    animate={{width:  '100%', left:  '0' , transition: {duration: .3}}}>
                        <img className={styles.img} src={logo} alt="Just Vape Shop" />
                    </motion.div>}</>
                : 
                <motion.div className={styles.right} initial={{width: '65%', left: '35%', borderRadius: '25px 0 0 25px'}} 
                animate={{width: loggedAnim ?  '100%' : '65%', left: loggedAnim ? '0' : '35%', borderRadius: loggedAnim ? '0' : '25px 0 0 25px'}}>
                    <img className={styles.img} src={logo} alt="Just Vape Shop" />
                </motion.div>}
        </div>} </>
    )
}

export default Menu