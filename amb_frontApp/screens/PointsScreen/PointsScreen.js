import * as React from 'react';
import 'react-native-reanimated'
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { MotiText, MotiView } from 'moti';
import styles from './styles';
import * as Icons from "react-native-heroicons/solid";
import GestureRecognizer from 'react-native-swipe-gestures';
import optionsStore from '../../zustand/options';

const PointsScreen = ({navigation, route}) => {

    const isDarkMode = optionsStore(state => state.isDarkMode)
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
            <View style={styles(isDarkMode).top}>

            </View>
        </GestureRecognizer>
    )


}


export default PointsScreen