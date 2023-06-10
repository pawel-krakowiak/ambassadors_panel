import * as React from 'react';
import 'react-native-reanimated'
import { MotiView, MotiText } from 'moti'
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import styles from './styles';
import * as Icons from "react-native-heroicons/solid";
import optionsStore from '../../../zustand/options';
import { useNavigation } from '@react-navigation/native';


const Points = ({setPointsPosition, handleSwitchBottomSheet}) => {
    const isDarkMode = optionsStore(state => state.isDarkMode)
    const navigation = useNavigation()

    return (
        <View style={styles(isDarkMode).wrapper}>
            <View style={styles(isDarkMode).topContainer}>
            </View>
            <View style={styles(isDarkMode).bottomContainer}>
                <View style={styles(isDarkMode).pointsContainer}>
                    <Text style={styles(isDarkMode).pointsAmount}>2137</Text>
                    <Text style={styles(isDarkMode).pointsDesc} onLayout={(e) => setPointsPosition(e.nativeEvent.layout.y)}>🎉 Polecając nasz sklep zebrałeś:</Text>
                </View>
                <TouchableWithoutFeedback onPress={() => handleSwitchBottomSheet(true)}>
                    <View style={styles(isDarkMode).bottomBtn} >
                        <View style={styles(isDarkMode).bottomBtnDescContainer}>
                            <Text style={styles(isDarkMode).bottomBtnTitle}>Brakuje ci punktów?</Text>
                            <Text style={styles(isDarkMode).bottomBtnDesc}>Sprawdź jak je zdobyć </Text>
                        </View>
                        <View style={styles(isDarkMode).bottomBtnIconContainer}>
                            <Icons.ChevronRightIcon size={20} color="#616161"/>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>

        </View>
    )
}

export default Points