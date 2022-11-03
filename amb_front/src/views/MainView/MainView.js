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
    const isDesktop = optionsStore(state => state.isDesktop)
    const windowHeight = optionsStore(state => state.windowHeight)
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
            <motion.div initial={{left: '-100%'}} animate={{left: isDesktop ?  0 : '-100%' , transition: {duration: .6, delay: .2, type: 'linear'}}} className={styles.left}>
                <Welcome />
                <Menu  />
                {windowHeight > 700 && <LastActivity />}
                <NextAward  style={{height: windowHeight < 700 && '55%'}} />
            </motion.div>
            <motion.div initial={{width: '100%', left: 0}} animate={{width: isDesktop ?  '75%' : '100%', left: isDesktop ? '22.5%' : 0 , transition: {duration: .6, type: 'linear'}}}
             className={styles.right}>
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