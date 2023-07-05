import * as React from 'react';
import 'react-native-reanimated'
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import styles from './styles';
import * as Icons from "react-native-heroicons/solid";
import GestureRecognizer from 'react-native-swipe-gestures';
import optionsStore from '../../../zustand/options';
import { useNavigation } from '@react-navigation/native';

const PointsInstruction = ({handleSwitchBottomSheet}) => {
    const navigation = useNavigation()
    const isDarkMode = optionsStore(state => state.isDarkMode)
    
    React.useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])

    return (
        <GestureRecognizer style={styles(isDarkMode).wrapper} onSwipeDown={() => handleSwitchBottomSheet(false)} 
        config={{directionalOffsetThreshold: 150, velocityThreshold: 0.6}}>
            {/* <Text style={styles(isDarkMode).title}>Jak zdoybwać punkty?</Text>  */}
            <View style={styles(isDarkMode).content}>
                <View style={styles(isDarkMode).itemContainer}>
                    <View style={styles(isDarkMode).iconContainer}>
                        <Icons.CurrencyDollarIcon color="#34A3CF" size={24}/>
                    </View>
                    <Text style={styles(isDarkMode).itemDesc}>
                        Za każdą wydaną złotówkę otrzymujesz 0.8 punkta
                    </Text>
                </View>
                <View style={styles(isDarkMode).itemContainer}>
                    <View style={styles(isDarkMode).iconContainer}>
                        <Icons.LinkIcon color="#34A3CF" size={24}/>
                    </View>
                    <Text style={styles(isDarkMode).itemDesc}>
                        Za każde polecenie otrzymujesz 20 punktów
                    </Text>
                </View>
                <View style={styles(isDarkMode).itemContainer}>
                    <View style={styles(isDarkMode).iconContainer}>
                        <Icons.CurrencyDollarIcon color="#34A3CF" size={24}/>
                    </View>
                    <Text style={styles(isDarkMode).itemDesc}>
                        Udostępniaj nasz sklep na swoich socjalach
                    </Text>
                </View>
            </View>
            <TouchableWithoutFeedback onPress={() => {navigation.navigate('Terms'); handleSwitchBottomSheet(false)}}>
                <View style={styles(isDarkMode).btn}>
                    <Text style={styles(isDarkMode).btnTxt}>Regulamin</Text> 
                </View>
            </TouchableWithoutFeedback>
        </GestureRecognizer>
    )


}


export default PointsInstruction