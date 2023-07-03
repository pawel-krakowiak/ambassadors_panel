import * as React from 'react';
import 'react-native-reanimated'
import { View, Text, Image, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { MotiText, MotiView } from 'moti';
import styles from './styles';
import * as Icons from "react-native-heroicons/solid";
import GestureRecognizer from 'react-native-swipe-gestures';
import optionsStore from '../../zustand/options';
import userStore from '../../zustand/user';
import ConfettiCannon from 'react-native-confetti-cannon';

const PurchaseScreen = ({navigation, route}) => {

    const isDarkMode = optionsStore(state => state.isDarkMode)
    const logOut = userStore(state => state.logOut)
    const { height, width } = Dimensions.get('window');

    const handleSwipe = () => {
        navigation.navigate('Home')
    }

    React.useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])

    return (
        <GestureRecognizer style={styles(isDarkMode).wrapper} onSwipeRight={handleSwipe} config={{directionalOffsetThreshold: 150, velocityThreshold: 0.6}}>
            <View style={styles(isDarkMode).backBtnContainer}>
                <TouchableWithoutFeedback onPress={handleSwipe}>
                    <MotiView style={styles(isDarkMode).backBtn}
                    from={{scale: 0.75, opacity: 0}}
                    animate={{scale: 1, opacity: 1}}
                    transition={{delay: 300}}>
                        <Icons.XMarkIcon size={25} color="#F1F1F1"/>
                    </MotiView>
                </TouchableWithoutFeedback>
            </View>  
            <View style={styles(isDarkMode).imgContainer}>
                <Image style={styles(isDarkMode).categoriesItemImg}  
                source={require('../../assets/thankYou.png')}/>
            </View>
            <View style={styles(isDarkMode).txtContainer}>
                <Text style={styles(isDarkMode).title}>Dzięki, że jesteś</Text>
                <Text style={styles(isDarkMode).desc}>Przyjeliśmy twoje zamówienie, odbierz produkt w sklepie. Więcej informacji znajdziesz w historii</Text>
            </View>
            <View style={styles(isDarkMode).buttonsContainer}>
                <TouchableWithoutFeedback onPress={handleSwipe}>
                    <View style={styles(isDarkMode).updateBtn}>
                        <Text style={styles(isDarkMode).updateBtnTxt}>Wróć na stronę główną</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <ConfettiCannon count={300} origin={{x: -1, y: height + 20}} fallSpeed={2000} />
        </GestureRecognizer>
    )


}


export default PurchaseScreen