import React, {useState, useEffect} from "react";
import stylesLight from './Nav.module.scss'
import stylesDark from './NavDark.module.scss'
import optionsStore from "../../../zustand/optionsStore";
import { NavLink, useLocation, useNavigate  } from "react-router-dom";
import {motion} from 'framer-motion'
import Button from "../../../components/Button/Button";
import { faX } from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
    const [styles, setStyles] = useState(stylesLight)
    const darkMode = optionsStore(state => state.darkMode)
    const isMedium = optionsStore(state => state.isMedium)
    let location = useLocation();
    const navigate = useNavigate()
    const [rollerWidth, setRollerWidth] = useState(0)
    const [rollerPosition, setRollerPosition] = useState(0)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    useEffect(() => {
        if(location.pathname === '/awards' || location.pathname === '/tasks' || location.pathname === '/documents' || location.pathname === '/profile'){
            if(location.pathname !== '/profile' || isMedium){
                let el = document.getElementById(`${location.pathname}`)
                setRollerWidth(el.offsetWidth)
                setRollerPosition(el.offsetLeft)
                setIsMenuOpen(false)
            }
        }else{
            setRollerWidth(0)
            setIsMenuOpen(true)
        }
    }, [location])
    useEffect(() => {
        if(darkMode){
            setStyles(stylesDark)
        }else{
            setStyles(stylesLight)
        }
    }, [darkMode])
    return(
        <div className={styles.wrapper}>
            <div className={styles.menu}>
                <div className={styles.navContainer}>
                    <NavLink id='/awards' to="/awards"><p className="mediumTxt">Nagrody</p></NavLink>
                    <NavLink id='/tasks' to="/tasks"><p className="mediumTxt">Jak zdobyć punkty</p></NavLink>
                    <NavLink id='/documents' to="/documents"><p className="mediumTxt">Regulaminy</p></NavLink>
                </div>
                <motion.div animate={{width: `${rollerWidth}px`, left: `${rollerPosition}px`}} className={styles.roller}></motion.div>
            </div>
            <div className={styles.buttonsContainer}>
                {isMenuOpen && <Button onClick={() => {navigate(-1)}} square icon={faX}/>}
            </div>
        </div>
        
    )
}

export default Nav