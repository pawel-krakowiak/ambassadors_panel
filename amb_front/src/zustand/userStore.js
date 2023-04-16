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
    logIn: async ({data, setMessageError, setLoggedAnim}) => {
        console.log((data))
        try{
           let result = await api.logIn(data)
           console.log(result)
        }catch (err) {
            console.log(err)
        }
        // setMessageError('Błędne hasło')
        // setLoggedAnim(true)

        // setTimeout(() => {
        //     set((state) => ({isLogged: true}))
        // }, 700)
    },
})

const userStore = create(devtools(store))

export default userStore