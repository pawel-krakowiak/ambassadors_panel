import React, {useState, useEffect} from "react";
import stylesLight from './LastActivity.module.scss'
import stylesDark from './LastActivityDark.module.scss'
import optionsStore from "../../../../zustand/optionsStore";

const LastActivity = () => {
    const [styles, setStyles] = useState(stylesLight)
    const darkMode = optionsStore(state => state.darkMode)
    useEffect(() => {
        if(darkMode){
            setStyles(stylesDark)
        }else{
            setStyles(stylesLight)
        }
    }, [darkMode])
    return(
        <div className={styles.wrapper}>
            <p className="mediumTxt">Twoja ostatnia aktywność:</p>
            <p className="mediumTxt"><span className="primaryColor">Wymienienie 100 punktów</span></p>
            <p className="smallTxt"><span className="link">Zobacz całą historie</span></p>
        </div>
    )
}

export default LastActivity