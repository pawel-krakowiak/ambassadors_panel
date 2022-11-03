import create from 'zustand'
import * as api from '../api/index'
import { devtools } from 'zustand/middleware'

const store = (set) => ({
    darkMode: false,
    iaMobile: false,
    isMedium: false,
    isDesktop: false,
    windowSize: 1500, 
    windowHeight: 800,
    changeDarkMode: (current) => {
        set((state) => ({darkMode: !current}))
    },
    checkDarkMode: () => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            set((state) => ({darkMode: true}))
        }else{
            set((state) => ({darkMode: false}))
        }
    },
    checkWindowSize: () => {
        set((state) => ({windowSize: window.innerWidth}))
        set((state) => ({windowHeight: window.innerHeight}))
        if(window.innerWidth < 700){
            set((state) => ({isMobile: true}))
            set((state) => ({isMedium: false}))
            set((state) => ({isDesktop: false}))
        }else if(window.innerWidth < 1100 && window.innerWidth > 700){
            set((state) => ({isMobile: false}))
            set((state) => ({isMedium: true}))
            set((state) => ({isDesktop: false}))
        }else{
            set((state) => ({isMobile: false}))
            set((state) => ({isMedium: false}))
            set((state) => ({isDesktop: true}))
        }
        if(window.innerHeight < 500 && window.innerWidth > 700 ){
            set((state) => ({isMobile: false}))
            set((state) => ({isMedium: true}))
            set((state) => ({isDesktop: false}))
        }
    },
    changeDarkMode: (current) => {
        set((state) => ({darkMode: !current}))
    },
    
})

const optionsStore = create(devtools(store))

export default optionsStore