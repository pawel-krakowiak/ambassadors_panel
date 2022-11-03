import React, {useState, useEffect} from "react";
import stylesLight from './Button.module.scss'
import stylesDark from './ButtonDark.module.scss'
import optionsStore from "../../zustand/optionsStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

const Button = ({square, icon, onClick, circle, style, active, value}) => {
    const [styles, setStyles] = useState(false)
    const darkMode = optionsStore(state => state.darkMode)
    useEffect(() => {
        if(darkMode){
            setStyles(stylesDark)
        }else{
            setStyles(stylesLight)
        }
    }, [darkMode])
    return(
        <>{styles &&<>
            {square && <div style={{...style}} onClick={onClick} className={styles.wrapperSq}>
                <FontAwesomeIcon icon={icon} />
            </div>
            }
            {circle && <div style={{...style}} onClick={onClick} className={active ? styles.wrapperCir : styles.wrapperCirDis} >
                {value ? value : <FontAwesomeIcon icon={faChevronRight} />}
            </div>
            }
        </>}</>
    )
}

export default Button