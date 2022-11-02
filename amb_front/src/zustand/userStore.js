import create from 'zustand'
import * as api from '../api/index'
import { devtools } from 'zustand/middleware'

const store = (set) => ({
    isLogged: false,
    name: 'Mikołaj',
    points: 495,
    logOut: () => {
        set((state) => ({isLogged: false}))
    },
    logIn: ({data, setMessageError}) => {
        console.log((data))
        setMessageError('Błędne hasło')
    },
})

const userStore = create(devtools(store))

export default userStore