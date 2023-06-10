import * as React from 'react';
import 'react-native-reanimated'
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { MotiText, MotiView } from 'moti';
import styles from './styles';
import * as Icons from "react-native-heroicons/solid";
import GestureRecognizer from 'react-native-swipe-gestures';
import optionsStore from '../../zustand/options';
import userStore from '../../zustand/user';

const UpdateScreen = ({navigation, route}) => {

    const isDarkMode = optionsStore(state => state.isDarkMode)
    const logOut = userStore(state => state.logOut)
    const handleSwipe = () => {
        navigation.goBack()
    }

    React.useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])

    return (
        <GestureRecognizer style={styles(isDarkMode).wrapper} onSwipeRight={handleSwipe} config={{directionalOffsetThreshold: 150, velocityThreshold: 0.6}}>
            <View style={styles(isDarkMode).imgContainer}>
                <Image style={styles(isDarkMode).categoriesItemImg}  
                source={require('../../assets/updateImg2.png')}/>
            </View>
            <View style={styles(isDarkMode).txtContainer}>
                <Text style={styles(isDarkMode).title}>Pora na aktualizację</Text>
                <Text style={styles(isDarkMode).desc}>Chcemy abyś korzystając z naszej aplikacji cieszył się najlepszym doświadczeniem. Przygotowaliśmy aktualizację, która jest wymagana do poprawnego działania.</Text>
            </View>
            <View style={styles(isDarkMode).buttonsContainer}>
                <View style={styles(isDarkMode).updateBtn}>
                    <Text style={styles(isDarkMode).updateBtnTxt}>Aktualizuj</Text>
                </View>
                <TouchableWithoutFeedback onPress={() => logOut(navigation)}>
                    <View style={styles(isDarkMode).backBtn}>
                        <Text style={{color: '#616161'}}>Cofnij</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </GestureRecognizer>
    )


}


export default UpdateScreen