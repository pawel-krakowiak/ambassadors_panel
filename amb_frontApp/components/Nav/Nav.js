import * as React from 'react';
import 'react-native-reanimated'
import { MotiView, MotiText } from 'moti'
import { View, Text, Image, TextInput, TouchableWithoutFeedback, StatusBar } from 'react-native';
import styles from './styles2';
import AnimateNumber from 'react-native-countup'
import * as Icons from "react-native-heroicons/solid";
import userStore from '../../zustand/user.js';
import productsStore from '../../zustand/products.js';
import optionsStore from '../../zustand/options.js';



const Nav = ({scrollViewRef, isOnTop, belowPoints}) => {
    const [isSettingsClicked, setIsSettingsClicked] = React.useState(false)
    const getUser = userStore(state => state.getUser)
    const user = userStore(state => state.user)
    const getItems = productsStore(state => state.getItems)
    const searchValue = productsStore(state => state.searchValue)
    const setSearch = productsStore(state => state.setSearch)
    const isDarkMode = optionsStore(state => state.isDarkMode)


    React.useEffect(() => {
        getItems(user)
    }, [user])


    return (
        <MotiView style={styles(isDarkMode).wrapper} animate={{paddingTop: StatusBar.currentHeight + (isOnTop ? 20 : 10)}}>
            <MotiText style={{fontWeight: 700, color: "#fff"}} animate={{fontSize: isOnTop ? 24 : 16}} >Hej, Mikołaj  </MotiText>
            <MotiView style={styles(isDarkMode).descWrapper} animate={{height: isOnTop ? 45 : 30}}>
                <MotiText style={{fontWeight: 700, color: "#fff"}} animate={{fontSize: isOnTop ? 24 : 16, translateY: belowPoints ? -60 : 0}} >Dzięki za polecenia! </MotiText>
                <MotiText style={{fontWeight: 700, color: "#fff"}} animate={{fontSize: isOnTop ? 24 : 16, translateY: belowPoints ? -20 : 30}} >Zebrałeś 
                <Text style={{color: "black"}}> {user.points}</Text> punktów</MotiText>
            </MotiView>
        </MotiView>
    )
}

export default Nav