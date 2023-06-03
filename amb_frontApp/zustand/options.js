import {create} from 'zustand'
import AsyncStorage from '@react-native-async-storage/async-storage';

const store = (set, get) => ({
    currentProduct: {},
    isDarkMode: false,
    setCurrentProduct: (value) => {
        set((state) => ({currentProduct: value}))
    },
    checkDarkMode: async (theme) => {
        let cookie = await AsyncStorage.getItem('isDarkMode')
        if(cookie){
            if(cookie === 'true'){
                set((state) => ({isDarkMode: true}))
            }else{
                set((state) => ({isDarkMode: false}))
            }
        }else{
            if(theme ==='dark'){
                set((state) => ({isDarkMode: true}))
                await AsyncStorage.setItem('isDarkMode', 'true')
            }else{
                set((state) => ({isDarkMode: false}))
                await AsyncStorage.setItem('isDarkMode', 'false')
            }
        }
    },
    setIsDarkMode: async (value) => {
        set((state) => ({isDarkMode: value}))
        await AsyncStorage.setItem('isDarkMode', `${value}`)
    },
})


const optionsStore = create(store)

export default optionsStore