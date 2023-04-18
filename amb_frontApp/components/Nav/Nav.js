import * as React from 'react';
import 'react-native-reanimated'
import { MotiView } from 'moti'
import { View, Text, Image, TextInput, TouchableWithoutFeedback } from 'react-native';
import styles from './styles';
import AnimateNumber from 'react-native-countup'
import * as Icons from "react-native-heroicons/solid";
import userStore from '../../zustand/user.js';
import productsStore from '../../zustand/products.js';


const Nav = () => {
    const [isSettingsClicked, setIsSettingsClicked] = React.useState(false)
    const getUser = userStore(state => state.getUser)
    const user = userStore(state => state.user)
    const getItems = productsStore(state => state.getItems)


    const handleClickSettings = () => {
        setIsSettingsClicked(true)

        setTimeout(() => {setIsSettingsClicked(false)}, 250)
    }

    React.useEffect(() => {
        getUser()
    }, [])

    React.useEffect(() => {
        getItems(user)
    }, [user])

    return (
        <View  style={styles.wrapper} >
            <View style={styles.topNavContainer}>
                <View style={styles.navLeft}>
                    <Text style={styles.helloText}>Hej, {user?.name}</Text>
                    <Text style={styles.PointsText}>Zebrałeś już <Text style={styles.PointsTextBlack}> 
                        <AnimateNumber value={user?.budget} formatter={(val) => {return parseFloat(val).toFixed(0)}}/> 
                        </Text> pkt.</Text>                    
                </View>
                <View style={styles.navRight}>
                    <Image style={styles.navLogo} 
                    source={{uri: 'https://justvape.pl/skins/user/rwd_clickshop-blue_1/images/logo.png'}} />
                </View>
            </View>
            <View style={styles.bottomNavContainer}>
                <View style={styles.searchContainer}>
                    <Icons.MagnifyingGlassIcon size={20} color="gray" />
                    <TextInput 
                        placeholder='Wyszukaj nagrode ...'
                        keyboardType='default'
                        style={styles.searchInput}
                    />
                </View>
                <View style={styles.bottomNavRight}>
                    <TouchableWithoutFeedback onPress={handleClickSettings}>
                        <View style={styles.settingsBtnContainer}>
                            <MotiView style={styles.settingsBtn} from={{scale: 1}} 
                            animate={{scale: isSettingsClicked ? 0.75 : 1}}
                            transition={{
                                type: 'timing',
                                duration: 200,
                            }}>
                                <Icons.AdjustmentsVerticalIcon size={30} color="gray"/>
                            </MotiView>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </View>
    )
}

export default Nav