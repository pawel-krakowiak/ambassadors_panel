import create from 'zustand'
import * as api from '../api/index'
import { devtools } from 'zustand/middleware'

const store = (set) => ({
    messageError: false,
    resetMessage: () => {
        set((state) => ({messageError: false}))
    },
    sendMessage: (data) => {
        console.log(data)
        set((state) => ({messageError: "Dziękujemy za twoją wiadomoć"}))
    },
})

const messagesStore = create(devtools(store))

export default messagesStore