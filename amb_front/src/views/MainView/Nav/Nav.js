import React, {useState, useEffect} from "react";
import stylesLight from './Nav.module.scss'
import stylesDark from './NavDark.module.scss'
import optionsStore from "../../../zustand/optionsStore";
import userStore from "../../../zustand/userStore";
import { NavLink, useLocation, useNavigate  } from "react-router-dom";
import {motion, AnimatePresence} from 'framer-motion'
import Button from "../../../components/Button/Button";
import { faX, faBars, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
    const [styles, setStyles] = useState(false)
    const darkMode = optionsStore(state => state.darkMode)
    const isMedium = optionsStore(state => state.isMedium)
    const isMobile = optionsStore(state => state.isMobile)
    const name = userStore(state => state.name)
    let location = useLocation();
    const navigate = useNavigate()
    const [rollerWidth, setRollerWidth] = useState(0)
    const [rollerPosition, setRollerPosition] = useState(0)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isWindowOpen, setIsWindowOpen] = useState(false)
    
    useEffect(() => {
        if(location.pathname === '/awards' || location.pathname === '/tasks' || location.pathname === '/documents' || location.pathname === '/profile'){
            if(location.pathname !== '/profile' || isMedium){
                let el = document.getElementById(`${location.pathname}`)
                setRollerWidth(el?.offsetWidth)
                setRollerPosition(el?.offsetLeft)
                setIsWindowOpen(false)
            }
        }else{
            setRollerWidth(0)
            setIsWindowOpen(true)
        }
    }, [location, styles])
    useEffect(() => {
        window.scroll({top: 0, left: 0, behavior: 'smooth'})
        setIsMenuOpen(false)
    }, [location])
    useEffect(() => {
        if(darkMode){
            setStyles(stylesDark)
        }else{
            setStyles(stylesLight)
        }
    }, [darkMode])
    return(
        <>{styles &&<div className={styles.wrapper}>
            {isMobile ?  
                <div className={styles.welcomeContainer}>
                    <p className="bigTxt"><span className="primaryColor">Witaj, </span>{name}</p>
                </div>
            : <><div className={styles.menu}>
                <div className={styles.navContainer}>
                    <NavLink id='/profile' to="/profile"><p className="mediumTxt">O tobie</p></NavLink>
                    <NavLink id='/awards' to="/awards"><p className="mediumTxt">Nagrody</p></NavLink>
                    <NavLink id='/tasks' to="/tasks"><p className="mediumTxt">Jak zdobyć punkty</p></NavLink>
                </div>
                <motion.div animate={{width: `${rollerWidth}px`, left: `${rollerPosition}px`}} className={styles.roller}></motion.div>
            </div></>}
            <div className={styles.buttonsContainer}>
                {isWindowOpen && <Button onClick={() => {navigate(-1)}} square icon={faChevronLeft}/>}
                {isMobile && <Button onClick={() => {setIsMenuOpen(!isMenuOpen)}} square icon={isMenuOpen ? faX : faBars}/>}
            </div>
            <AnimatePresence>{isMenuOpen &&
            <motion.div initial={{bottom: '-190%', transition: {duration: .5}}} animate={{bottom: '0%', transition: {duration: .5}}} exit={{bottom: '-190%', transition: {duration: .5}}} className={styles.menuSlider}>
                <div className={styles.MobileNavContainer}>
                    <NavLink id='/profile' to="/profile"><p className="bigTxt">O tobie</p></NavLink>
                    <NavLink id='/awards' to="/awards"><p className="bigTxt">Nagrody</p></NavLink>
                    <NavLink id='/tasks' to="/tasks"><p className="bigTxt">Jak zdobyć punkty</p></NavLink>
                </div>
                    
            </motion.div>}</AnimatePresence>
        </div>}</>
        
    )
}

export default Nav