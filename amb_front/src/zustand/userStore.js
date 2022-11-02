import create from 'zustand'
import * as api from '../api/index'
import { devtools } from 'zustand/middleware'

const store = (set) => ({
    isLogged: true,
    name: 'Mikołaj',
    points: 495,
    logOut: (navigate) => {
        set((state) => ({isLogged: false}));
        navigate('/')

    },
    logIn: ({data, setMessageError, setLoggedAnim}) => {
        console.log((data))
        setMessageError('Błędne hasło')
        setLoggedAnim(true)

        setTimeout(() => {
            set((state) => ({isLogged: true}))
        }, 500)
    },
})

const userStore = create(devtools(store))

export default userStore