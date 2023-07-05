import * as React from 'react';
import optionsStore from '../../zustand/options';
import { MotiView, MotiText } from 'moti'
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import styles from './styles';
import * as Icons from "react-native-heroicons/solid";
import { useNavigation } from '@react-navigation/native';

const BackHeader = ({home, product}) => {
    const isDarkMode = optionsStore(state => state.isDarkMode)
    const navigation = useNavigation()

    return (
        <View style={{...styles(isDarkMode).backBtnContainer, backgroundColor: product ? `${isDarkMode ? "#2e2e2e" : '#F1F1F1'}` : null}}>
            <TouchableWithoutFeedback onPress={() => home ? navigation.navigate("home") : navigation.goBack()}>
                <MotiView style={styles(isDarkMode).backBtn}
                from={{scale: 0.75, opacity: 0}}
                animate={{scale: 1, opacity: 1}}
                transition={{delay: 300}}>
                    <Icons.XMarkIcon size={25} color="#F1F1F1"/>
                </MotiView>
            </TouchableWithoutFeedback>
        </View>   
    )
}


export default BackHeader