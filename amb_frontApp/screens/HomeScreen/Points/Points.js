import * as React from 'react';
import 'react-native-reanimated'
import { MotiView, MotiText } from 'moti'
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import styles from './styles';
import * as Icons from "react-native-heroicons/solid";
import optionsStore from '../../../zustand/options';
import userStore from '../../../zustand/user';
import { useNavigation } from '@react-navigation/native';
import Barcode from '@kichiyaki/react-native-barcode-generator'

const Points = ({setPointsPosition, handleSwitchBottomSheet}) => {
    const isDarkMode = optionsStore(state => state.isDarkMode)
    const user = userStore(state => state.user)
    const navigation = useNavigation()
    const [isCardFilpped, setIsCardFlipped] = React.useState(false)
    const [barCodeDimensions, setBarcodeDimensions] = React.useState({
        width: 0,
        height: 0,
    })
    return (
        <View style={styles(isDarkMode).wrapper}>
            <View style={styles(isDarkMode).topContainer}>
            </View>
            <View style={styles(isDarkMode).bottomContainer}>
             <TouchableWithoutFeedback onPress={() => setIsCardFlipped(!isCardFilpped)}>
                <View style={styles(isDarkMode).pointsContainer}>
                    <MotiView style={styles(isDarkMode).pointsContent} onLayout={(e) => setBarcodeDimensions({width: e.nativeEvent.layout.width, height: e.nativeEvent.layout.height})}
                    animate={{rotateY: isCardFilpped ? '0deg' : "180deg"}}> 
                        <Barcode 
                            value={user.email}
                            format="CODE128"
                            // text="test@gmail.com"
                            maxWidth={barCodeDimensions.width}
                            height={barCodeDimensions.height}
                            onError={(error) => console.log(error)}
                            background={isDarkMode ? "#2e2e2e" : '#F1F1F1'}
                            lineColor={isDarkMode ? "#fff" : '#000'}
                       /> 
                    </MotiView>
                    <MotiView style={{...styles(isDarkMode).pointsContent, backfaceVisibility: "hidden"}}
                    animate={{rotateY: isCardFilpped ? '180deg' : "360deg"}}>
                        <Text style={styles(isDarkMode).pointsAmount}>{user.points}</Text>
                        <Text style={styles(isDarkMode).pointsDesc} onLayout={(e) => setPointsPosition(e.nativeEvent.layout.y)}>🎉 Polecając nasz sklep zebrałeś:</Text>
                    </MotiView>
                </View>
                </TouchableWithoutFeedback>
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