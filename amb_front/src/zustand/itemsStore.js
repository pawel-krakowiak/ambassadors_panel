import create from 'zustand'
import * as api from '../api/index'
import { devtools } from 'zustand/middleware'
import initialData from '../assets/data'

const store = (set) => ({
    items: {
        itemsCanBuy: [],
        itemsCantBuy: [],
    },
    closestItem: {
        name: '',
        difference: 0,
        percentage: 0,
    },
    getItems: async (userPoints) => {
        let data = initialData;

        let itemsCanBuy = [];
        let itemsCantBuy = [];
        await data.map(item => {
            if(item.cost <= userPoints){
                itemsCanBuy.push(item)
            }else{
                itemsCantBuy.push(item)
            }
        })
        
        await itemsCanBuy.sort((a, b) => a.cost - b.cost).reverse()
        await itemsCantBuy.sort((a, b) => a.cost - b.cost).reverse()
        
        await set((state) => ({items: {
            itemsCanBuy,
            itemsCantBuy,
        }}))

        await set((state) => ({closestItem: {
            name: itemsCantBuy[itemsCantBuy.length - 1].name,
            difference: itemsCantBuy[itemsCantBuy.length - 1].cost - userPoints,
            percentage: (100 * userPoints) / itemsCantBuy[itemsCantBuy.length - 1].cost
        }}))
    }

})

const itemStore = create(devtools(store))

export default itemStore