import {create} from 'zustand'

const store = (set, get) => ({
    currentProduct: {},
    setCurrentProduct: (value) => {
        set((state) => ({currentProduct: value}))
    },
})


const optionsStore = create(store)

export default optionsStore