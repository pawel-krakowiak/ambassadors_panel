import * as React from 'react';
import 'react-native-reanimated'
import { MotiView } from 'moti'
import { View, Text, Image, TextInput, TouchableWithoutFeedback } from 'react-native';
import styles from './styles';
import AnimateNumber from 'react-native-countup'
import * as Icons from "react-native-heroicons/solid";
import userStore from '../../zustand/user.js';
import productsStore from '../../zustand/products.js';
import optionsStore from '../../zustand/options.js';


const Nav = (scrollViewRef) => {
    const [isSettingsClicked, setIsSettingsClicked] = React.useState(false)
    const getUser = userStore(state => state.getUser)
    const user = userStore(state => state.user)
    const getItems = productsStore(state => state.getItems)
    const searchValue = productsStore(state => state.searchValue)
    const setSearch = productsStore(state => state.setSearch)
    const isDarkMode = optionsStore(state => state.isDarkMode)

    const handleRefreshData = () => {
        getUser()
        getItems(user)
        setIsSettingsClicked(true)
        setTimeout(() => {setIsSettingsClicked(false)}, 250)
    }

    React.useEffect(() => {
        getItems(user)
    }, [user])

    return (
        <View  style={styles(isDarkMode).wrapper} >
            <View style={styles(isDarkMode).topNavContainer}>
                <View style={styles(isDarkMode).navLeft}>
                    <Text style={styles(isDarkMode).helloText}>Hej, {user?.name}</Text>
                    <Text style={styles(isDarkMode).PointsText}>Zebrałeś już <Text style={styles(isDarkMode).PointsTextBlack}> 
                        <AnimateNumber value={user?.points} formatter={(val) => {return parseFloat(val).toFixed(0)}}/> 
                        </Text> pkt.</Text>                    
                </View>
                <View style={styles(isDarkMode).navRight}>
                    <Image style={styles(isDarkMode).navLogo} 
                    source={{uri: 'https://justvape.pl/skins/user/rwd_clickshop-blue_1/images/logo.png'}} />
                </View>
            </View>
            <View style={styles(isDarkMode).bottomNavContainer}>
                <View style={styles(isDarkMode).searchContainer}>
                    <Icons.MagnifyingGlassIcon size={20} color="gray" />
                    <TextInput 
                        placeholder='Wyszukaj nagrode ...'
                        keyboardType='default'
                        style={styles(isDarkMode).searchInput}
                        onChangeText={(e) => setSearch(e)}
                        value={searchValue}
                        autoCapitalize='none'
                    />
                </View>
                <View style={styles(isDarkMode).bottomNavRight}>
                    <TouchableWithoutFeedback onPress={handleRefreshData}>
                        <View style={styles(isDarkMode).settingsBtnContainer}>
                            <MotiView style={styles(isDarkMode).settingsBtn} from={{scale: 1, rotate: '0deg'}} 
                            animate={{scale: isSettingsClicked ? 0.75 : 1, rotate: isSettingsClicked ? '-30deg' : '0deg'}}
                            transition={{
                                type: 'timing',
                                duration: 200,
                            }}>
                                <Icons.ArrowPathIcon size={25} color="gray"/>
                            </MotiView>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </View>
    )
}

export default Nav