import React, {useState, useEffect} from "react";
import stylesLight from './Menu.module.scss'
import stylesDark from './MenuDark.module.scss'
import optionsStore from "../../../../zustand/optionsStore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb, faMoon, faRightFromBracket, faMessage } from '@fortawesome/free-solid-svg-icons'
import { NavLink  } from "react-router-dom";

const Menu = ({style}) => {
    const [styles, setStyles] = useState(false)
    const darkMode = optionsStore(state => state.darkMode)
    const changeDarkMode = optionsStore(state => state.changeDarkMode)
    useEffect(() => {
        if(darkMode){
            setStyles(stylesDark)
        }else{
            setStyles(stylesLight)
        }
    }, [darkMode])
    return(
        <>{styles &&
            <div className={styles.wrapper} style={{...style}}>
                <span><NavLink to="/message"><FontAwesomeIcon className="primaryColor" icon={faMessage} /></NavLink></span>
                <span onClick={() => {changeDarkMode(darkMode)}}><FontAwesomeIcon style={{color: darkMode ? '#FAFF00' : '#000000'}} icon={darkMode ? faLightbulb : faMoon} /></span>
                <span><NavLink to="/logOut"><FontAwesomeIcon style={{color:  '#FC6363'}} icon={faRightFromBracket} /></NavLink></span>
            </div>
        }</>
    )
}

export default Menu