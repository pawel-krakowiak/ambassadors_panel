import {create} from 'zustand'
import initialData from './dataMarkups/userMockup.js'
import * as api from '../api/index'
import AsyncStorage from '@react-native-async-storage/async-storage';

const store = (set, get) => ({
    user: {},
    getUser: async (navigation) => {
        try{
            let accesToken = await AsyncStorage.getItem('accessToken')
            let refreshToken = await AsyncStorage.getItem('refreshToken')
    
            if(refreshToken){
                let formData = new FormData();
    
                await formData.append('refresh', refreshToken)
                let result = await api.verifyToken(formData, accesToken)
    
                let {access, refresh} = result.data
                if(access, refresh){
                    await AsyncStorage.setItem('accessToken', access)
                    await AsyncStorage.setItem('refreshToken', refresh)
    
                    let userResult = await api.getUserInfo(access)
                   
                    set((state) => ({user: userResult.data}))
                }else{
                    await AsyncStorage.removeItem('accessToken')
                    await AsyncStorage.removeItem('refreshToken')
        
                    set((state) => ({user: {}}))
                    navigation.replace('Login')
                }
            }else{
                await AsyncStorage.removeItem('accessToken')
                await AsyncStorage.removeItem('refreshToken')
    
                set((state) => ({user: {}}))
                navigation.replace('Login')
            }
        }catch(err){
            console.log(err)
            await AsyncStorage.removeItem('accessToken')
            await AsyncStorage.removeItem('refreshToken')

            set((state) => ({user: {}}))
            navigation.replace('Login')
        }
        
    },
    loginUser: async (inputValues, setErrorMsg, navigation) => {
        try{

            let formData = new FormData();

            await formData.append('email', inputValues.mail)
            await formData.append('password', inputValues.password)

            let result = await api.logIn(formData)

            let {access, refresh, user} = result.data

            if(user.is_active){

                await AsyncStorage.setItem('accessToken', access)
                await AsyncStorage.setItem('refreshToken', refresh)
                set((state) => ({user: user}))

                navigation.replace('Home')
            }else{
                setErrorMsg("Konto nie aktywne. Skontaktuj się z administratorem.")
            }
            
        }catch(err){
            if(err.toJSON().status === 401){
                setErrorMsg("Logowanie się nie powiodło")
            }else{
                setErrorMsg("Coś poszło nie tak. Skontaktuj się z administratorem.")

            }
        }
    },
    verifyUser: async (setLoginStep, navigation) => {
        try{    

            let accesToken = await AsyncStorage.getItem('accessToken')
            let refreshToken = await AsyncStorage.getItem('refreshToken')


            if(refreshToken){
                let formData = new FormData();

                await formData.append('refresh', refreshToken)
                let result = await api.verifyToken(formData, accesToken)

                let {access, refresh} = result.data
                if(access, refresh){
                    await AsyncStorage.setItem('accessToken', access)
                    await AsyncStorage.setItem('refreshToken', refresh)

                    let userResult = await api.getUserInfo(access)

                    let user = userResult.data
                    
                    if(user.is_active){
                        set((state) => ({user: user}))
                        navigation.replace('Home')
                    }else{
                        setLoginStep(2)
                    }
                    
                }else{
                    setLoginStep(2)
                }
            }else{
                setLoginStep(2)
            }
            
        }catch(err){
            console.log(err)
            setLoginStep(2)
        }
    },
    logOut: async (navigation) => {
        try{
            await AsyncStorage.removeItem('accessToken')
            await AsyncStorage.removeItem('refreshToken')

            set((state) => ({user: {}}))
            navigation.replace('Login')
        }catch(err){
            console.log(err)
        }
    }
 })


const userStore = create(store)

export default userStore