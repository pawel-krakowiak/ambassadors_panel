import {create} from 'zustand'
import initialData from './dataMarkups/userMockup.js'

const store = (set, get) => ({
    user: {},
    getUser: async () => {
        let data = initialData;
        set((state) => ({user: data}))
    },
})


const userStore = create(store)

export default userStore