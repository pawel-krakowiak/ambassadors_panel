import * as React from 'react';
import 'react-native-reanimated'
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { MotiText, MotiView } from 'moti';
import styles from './styles';
import * as Icons from "react-native-heroicons/solid";
import userStore from '../../zustand/user';

const InfoScreen = ({navigation, route}) => {

    const user = userStore(state => state.user)

    React.useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])

    return (
        <View style={styles.wrapper}> 

        </View>
    )


}


export default InfoScreen