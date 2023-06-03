import {create} from 'zustand'
import initialData from './dataMarkups/productsMockup.js'
import * as api from '../api/index'
import AsyncStorage from '@react-native-async-storage/async-storage';

const store = (set, get) => ({
    allItems: [],
    sortedItems: [],
    currentFilter: 'all',
    searchValue: "",
    isLoaded: false,
    getItems: async (user) => {
        try{
            // let data = initialData;
            let accesToken = await AsyncStorage.getItem('accessToken')
            let result = await api.getProducts(accesToken)
            let data = result.data.filter(i => i.location_id === user.location_id)

            set((state) => ({allItems: [...data]}))

            switch(get().currentFilter){
                case 'all': 
                    set((state) => ({sortedItems: [...data]}))
                    break;
                case 'canBuy':
                    let canBuy = data.filter(i => {
                        if(i.points_price <= user.points){
                            return i
                        }
                    })
                    set((state) => ({sortedItems: [...canBuy]}))
                    break;
                case 'cantBuy':
                    let cantBuy = data.filter(i => {
                        if(i.points_price > user.points){
                            return i
                        }
                    })
                    set((state) => ({sortedItems: [...cantBuy]}))
                    break;
            }
            set((state) => ({isLoaded: true}))
        }catch(err){
            console.log(err)
            set((state) => ({isLoaded: false}))
            navigation.replace('Login')
        }
    },
    setFilter: (value, user) => {
        try{
            set((state) => ({currentFilter: value}))
            switch(value){
                case 'all': 
                    set((state) => ({sortedItems: [...get().allItems]}))
                    break;
                case 'canBuy':
                    let canBuy = get().allItems.filter(i => {
                        if(i.points_price <= user.points){
                            return i
                        }
                    })
                    set((state) => ({sortedItems: [...canBuy]}))
                    break;
                case 'cantBuy':
                    let cantBuy = get().allItems.filter(i => {
                        if(i.points_price > user.points){
                            return i
                        }
                    })
                    set((state) => ({sortedItems: [...cantBuy]}))
                    break;
                case 'isAvaiable':
                    let isAvaiable = get().allItems.filter(i => {
                        if(i.is_available){
                            return i
                        }
                    })
                    set((state) => ({sortedItems: [...isAvaiable]}))
                    break;
                case 'isntAvaiable':
                    let isntAvaiable = get().allItems.filter(i => {
                        if(!i.is_available){
                            return i
                        }
                    })
                    set((state) => ({sortedItems: [...isntAvaiable]}))
                    break;
            }
        }catch(err){
            console.log(err)
            set((state) => ({isLoaded: false}))
            navigation.replace('Login')
        }    
    },
    setSearch: (value) => {
        set((state) => ({searchValue: value}))
    },
})


const productsStore = create(store)

export default productsStore