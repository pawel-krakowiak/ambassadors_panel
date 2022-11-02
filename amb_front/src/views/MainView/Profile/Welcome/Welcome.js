import React, {useState, useEffect} from "react";
import stylesLight from './Welcome.module.scss'
import stylesDark from './WelcomeDark.module.scss'
import optionsStore from "../../../../zustand/optionsStore";
import robot from '../../../../assets/robot.png'
import CountUp from 'react-countup';
import userStore from "../../../../zustand/userStore";

const Welcome = () => {
    const [styles, setStyles] = useState(stylesLight)
    const darkMode = optionsStore(state => state.darkMode)
    const name = userStore(state => state.name)
    const points = userStore(state => state.points)
    useEffect(() => {
        if(darkMode){
            setStyles(stylesDark)
        }else{
            setStyles(stylesLight)
        }
    }, [darkMode])
    return(
        <div className={styles.wrapper}>
            <img className={styles.img} src={robot} alt="Robot witający użytkownika" />
            <p className="bigTxt"><span className="primaryColor">Witaj,</span> {name}</p>
            <p className="mediumTxt">Zdobyłeś: <span className="primaryColor"><CountUp end={points} duration={1.5}/> punktów</span></p>
        </div>
    )
}

export default Welcome