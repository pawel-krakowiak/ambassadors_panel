import React, {useState, useEffect} from "react";
import stylesLight from './LastActivity.module.scss'
import stylesDark from './LastActivityDark.module.scss'
import optionsStore from "../../../../zustand/optionsStore";

const LastActivity = ({style}) => {
    const [styles, setStyles] = useState(false)
    const darkMode = optionsStore(state => state.darkMode)
    const isMobile = optionsStore(state => state.darkMode)
    useEffect(() => {
        if(darkMode){
            setStyles(stylesDark)
        }else{
            setStyles(stylesLight)
        }
    }, [darkMode])
    return(
        <>{styles &&
            <div style={{...style}} className={styles.wrapper}>
                <p className="mediumTxt">Twoja ostatnia aktywność:</p>
                <p className={isMobile ? 'bigTxt' : 'mediumTxt'}><span className="primaryColor">Wymienienie 100 punktów</span></p>
                <p className={isMobile ? 'mediumTxt' : 'smallTxt'}><span className="link">Zobacz całą historie</span></p>
            </div>
        }</>

    )
}

export default LastActivity