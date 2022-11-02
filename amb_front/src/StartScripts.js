import React, { useEffect, useState } from "react";
import optionsStore from "./zustand/optionsStore";
import userStore from "./zustand/userStore";
import itemStore from "./zustand/itemsStore";

const StartScripts = () => {
    const checkDarkMode = optionsStore(state => state.checkDarkMode)
    const checkWindowSize = optionsStore(state => state.checkWindowSize)
    const points = userStore(state => state.points)
    const getItems = itemStore(state => state.getItems)

    useEffect(() => {
        checkDarkMode()
        checkWindowSize()
        getItems(points)
        window.addEventListener('resize', checkWindowSize)
    }, [])
    return(
        <></>
    )
}

export default StartScripts