import {create} from 'zustand'
import initialData from './dataMarkups/userMockup.js'
import * as api from '../api/index'
import AsyncStorage from '@react-native-async-storage/async-storage';


const store = (set, get) => ({
    user: {},
    getUser: async () => {
        let data = initialData;
        set((state) => ({user: data}))
    },
    loginUser: async (inputValues, setErrorMsg, navigation) => {
        try{

            let formData = new FormData();

            await formData.append('email', inputValues.mail)
            await formData.append('password', inputValues.password)

            let result = await api.logIn(formData)

            let {access, refresh, user} = result.data

            if(user.is_active){
                console.log(access)
                console.log(user)

                await AsyncStorage.setItem('accessToken', access)
                await AsyncStorage.setItem('refreshToken', refresh)
    
                set((state) => ({user: user}))

                navigation.navigate('Home')
            }else{
                setErrorMsg("Konto nie aktywne. Skontaktuj się z administratorem.")
            }
            
        }catch(err){
            console.log(err)
            setErrorMsg("Coś poszło nie tak. Skontaktuj się z administratorem.")
        }
    },
})


const userStore = create(store)

export default userStore