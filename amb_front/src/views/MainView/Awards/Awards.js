import React, {useState, useEffect} from "react";
import stylesLight from './Awards.module.scss'
import stylesDark from './AwardsDark.module.scss'
import optionsStore from "../../../zustand/optionsStore";
import {motion, AnimatePresence} from 'framer-motion'
import CountUp from 'react-countup';
import itemsStore from '../../../zustand/itemsStore'
import ItemCard from "../../../components/ItemCard/ItemCard";

const Awards = () => {
    const [styles, setStyles] = useState(false)
    const darkMode = optionsStore(state => state.darkMode)
    useEffect(() => {
        if(darkMode){
            setStyles(stylesDark)
        }else{
            setStyles(stylesLight)
        }
    }, [darkMode])

    const items = itemsStore(state => state.items)

    return(
        <div className={styles.wrapper}>
            <div className={styles.title}><p className="bigTxt">Przygotowaliśmy dla ciebie <span className="primaryColor"><CountUp className="bigTxt" end={items.itemsCanBuy.length + items.itemsCantBuy.length} duration={1}/> nagród</span></p></div>
            <div className={styles.content}>
                {items.itemsCanBuy.map((item, i) => i === 0 ? <ItemCard active item={item} id={i} long /> : <ItemCard active item={item} id={i} />)}
                {items.itemsCantBuy.map((item, i) =>  <ItemCard item={item} id={items.itemsCanBuy.length + i} />)}
            </div>
        </div>
    )
}

export default Awards