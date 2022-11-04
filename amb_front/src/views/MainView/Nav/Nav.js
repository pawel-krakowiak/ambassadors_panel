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
    const menuType = optionsStore(state => state.menuType)
    const changeMenuType = optionsStore(state => state.changeMenuType)
    const name = userStore(state => state.name)
    let location = useLocation();
    const navigate = useNavigate()
    const [rollerWidth, setRollerWidth] = useState(0)
    const [rollerPosition, setRollerPosition] = useState(0)
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
        changeMenuType('null')
    }, [location])
    useEffect(() => {
        if(darkMode){
            setStyles(stylesDark)
        }else{
            setStyles(stylesLight)
        }
    }, [darkMode])
    const [showBurger, setShowBurger] = useState(true)

    useEffect(() => {
        if(menuType === 'menu' || menuType === "null"){
            setShowBurger(true)
        }else{
            setShowBurger(false)
        }
    }, [menuType])

    return(
        <>{styles &&<div className={styles.wrapper}>
            {isMobile ?  
                <div className={styles.welcomeContainer}>
                    <p className="bigTxt"><span className="primaryColor">Witaj, </span>{name}</p>
                </div>
            : <><div className={styles.menu}>
                <div className={styles.navContainer}>
                    {isMedium &&<NavLink id='/profile' to="/profile"><p className="mediumTxt">O tobie</p></NavLink>}
                    <NavLink id='/awards' to="/awards"><p className="mediumTxt">Nagrody</p></NavLink>
                    <NavLink id='/tasks' to="/tasks"><p className="mediumTxt">Jak zdobyć punkty</p></NavLink>
                </div>
                <motion.div animate={{width: `${rollerWidth}px`, left: `${rollerPosition}px`}} className={styles.roller}></motion.div>
            </div></>}
            <div className={styles.buttonsContainer}>
                {isWindowOpen && <Button onClick={() => {navigate(-1)}} square icon={faChevronLeft}/>}
                {menuType !== 'null' && <> { menuType !== 'menu' && <Button onClick={() => {changeMenuType('null')}} square icon={faChevronLeft}/>}</>}
                {isMobile && <> { showBurger && <Button onClick={() => {changeMenuType(menuType !== 'menu' ? 'menu' : 'null')}} square icon={menuType === 'menu' ? faX : faBars}/>}</>}
            </div>
        </div>}</>
        
    )
}

export default Nav