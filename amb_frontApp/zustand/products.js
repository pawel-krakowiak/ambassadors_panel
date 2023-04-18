import {create} from 'zustand'
import initialData from './dataMarkups/productsMockup.js'

const store = (set, get) => ({
    allItems: [],
    sortedItems: [],
    currentFilter: 'all',
    getItems: async (user) => {
        let data = initialData;
        set((state) => ({allItems: [...data]}))

        switch(get().currentFilter){
            case 'all': 
                set((state) => ({sortedItems: [...data]}))
                break;
            case 'canBuy':
                let canBuy = data.filter(i => {
                    if(i.cost <= user.budget){
                        return i
                    }
                })
                set((state) => ({sortedItems: [...canBuy]}))
                break;
            case 'cantBuy':
                let cantBuy = data.filter(i => {
                    if(i.cost > user.budget){
                        return i
                    }
                })
                set((state) => ({sortedItems: [...cantBuy]}))
                break;
        }
    },
    setFilter: (value, user) => {
        set((state) => ({currentFilter: value}))
        switch(value){
            case 'all': 
                set((state) => ({sortedItems: [...get().allItems]}))
                break;
            case 'canBuy':
                let canBuy = get().allItems.filter(i => {
                    if(i.cost <= user.budget){
                        return i
                    }
                })
                set((state) => ({sortedItems: [...canBuy]}))
                break;
            case 'cantBuy':
                let cantBuy = get().allItems.filter(i => {
                    if(i.cost > user.budget){
                        return i
                    }
                })
                set((state) => ({sortedItems: [...cantBuy]}))
                break;
        }
    },
})


const productsStore = create(store)

export default productsStore