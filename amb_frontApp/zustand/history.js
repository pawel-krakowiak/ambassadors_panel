import {create} from 'zustand'
import initialData from './dataMarkups/historyMockup.js'
import * as api from '../api/index'
import AsyncStorage from '@react-native-async-storage/async-storage';

const store = (set, get) => ({
    historyItems: [],
    getHistoryItems: async () => {
        try{
            let accesToken = await AsyncStorage.getItem('accessToken')
            let result = await api.getHistory(accesToken)

            // console.log('history', result.data)

            let data = initialData;
        

            data.sort(function(a, b) {
                return b.date - a.date;
              })
            set((state) => ({historyItems: [...data]}))
        }catch(err){
            console.log('historyErrir', err)

            // await AsyncStorage.removeItem('accessToken')
            // await AsyncStorage.removeItem('refreshToken')

            // set((state) => ({user: {}}))
            // navigation.replace('Login')
        }
        
    },
    createOrder: async (item, amount, navigation) => {
        try{
            console.log(item)
            let accesToken = await AsyncStorage.getItem('accessToken')

            // let result = await api.createOrder(accesToken)
            // console.log('result', result)
             navigation.navigate('Purchase')
        }catch(err){
            console.log(err)

            await AsyncStorage.removeItem('accessToken')
            await AsyncStorage.removeItem('refreshToken')

            set((state) => ({user: {}}))
            navigation.replace('Login')
        }
    }
})


const historyStore = create(store)

export default historyStore