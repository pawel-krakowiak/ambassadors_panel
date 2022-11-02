import React, {useState, useEffect} from "react";
import stylesLight from './MainView.module.scss'
import stylesDark from './MainViewDark.module.scss'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Awards from "./Awards/Awards";
import optionsStore from "../../zustand/optionsStore";
import Welcome from "./Profile/Welcome/Welcome";
import LastActivity from "./Profile/LastActivity/LastActivity";
import NextAward from "./Profile/NextAward/NextAward";
import Menu from "./Profile/Menu/Menu";
import Nav from './Nav/Nav'
import Button from "../../components/Button/Button";
import Tasks from './Tasks/Tasks'
import Documents from "./Documents/Documents";
import LogOut from "./LogOut/LogOut";
import Message from "./Message/Message";
import Statute from "./Documents/Statute/Statute";
import Rodo from "./Documents/Rodo/Rodo";
import { motion } from "framer-motion";

const MainView = () => {
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
        <>{styles &&<div  className={styles.wrapper}>
            <BrowserRouter>
            <motion.div initial={{x: '-100%'}} animate={{x: 0, transition: {duration: .6, delay: .2, type: 'linear'}}} className={styles.left}>
                <Welcome />
                <Menu />
                <LastActivity />
                <NextAward />
            </motion.div>
            <motion.div initial={{width: '100%'}} animate={{width: '77.5%', transition: {duration: .6, type: 'linear'}}} className={styles.right}>
                <Nav />
                <div className={styles.contentContainer}>
                        <Routes>
                            <Route path="*" element={<Navigate to={`/awards`} /> } />
                            <Route path="/awards" element={<Awards />} />
                            <Route path="/tasks" element={<Tasks />} />
                            <Route path="/logOut" element={<LogOut />} />
                            <Route path="/message" element={<Message />} />
                        </Routes>
                </div>
            </motion.div>
            </BrowserRouter>
        </div>}</>
    )
}

export default MainView