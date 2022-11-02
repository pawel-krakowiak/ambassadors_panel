import React, {useState, useEffect} from "react";
import stylesLight from './Tasks.module.scss'
import stylesDark from './TasksDark.module.scss'
import optionsStore from "../../../zustand/optionsStore";
import {motion, AnimatePresence} from 'framer-motion'
import Button from "../../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import InfoCard from "../../../components/InfoCard/InfoCard";
import data from './data'

const Tasks = () => {
    const [styles, setStyles] = useState(false)
    const darkMode = optionsStore(state => state.darkMode)
    useEffect(() => {
        if(darkMode){
            setStyles(stylesDark)
        }else{
            setStyles(stylesLight)
        }
    }, [darkMode])
    const navigate = useNavigate()

    return(
        <>{styles &&<div className={styles.wrapper}>
            <div className={styles.title}><p className="bigTxt">Wiesz ze masz prawa? Konstytucja mówi że tak!</p></div>
            <div className={styles.content}>
                {data.map((item, i) => <InfoCard i={i} item={item}/>)}
            </div>
        </div>}</>
    )
}

export default Tasks