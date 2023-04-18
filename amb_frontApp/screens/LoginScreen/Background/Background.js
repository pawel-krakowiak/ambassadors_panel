import * as React from 'react';
import 'react-native-reanimated'
import { View, Text } from 'react-native';
import {MotiView} from 'moti'
import styles from './styles';
import { LinearGradient } from 'react-native-gradients';


const Background = () => {

    const colorList = [
        {offset: '0%', color: '#11427C', opacity: '1'},
        {offset: '27%', color: '#0065DD', opacity: '1'},
        {offset: '47%', color: '#4C77E3', opacity: '1'},
        {offset: '100%', color: '#6E97FF', opacity: '1'},
      ]

    return (
        <View style={styles.wrapper}>
            <MotiView from={{rotate: '0deg', scale: 2, scaleX: 3}} 
            animate={{rotate: '360deg', scale: 2, scaleX: 3 }}
            transition={{loop: true,
             repeatReverse: false, 
             type: "timing",
             duration: 30000}} >
                <LinearGradient angle={30}  colorList={colorList}/> 
            </MotiView>
            <View style={styles.opacity}>
            </View>
        </View>
    )


}


export default Background