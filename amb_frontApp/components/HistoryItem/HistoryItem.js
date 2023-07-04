import * as React from 'react';
import optionsStore from '../../zustand/options';
import { MotiView, MotiText } from 'moti'
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import styles from './styles';

const HistoryItem = ({item, index, isInView}) => {
    const isDarkMode = optionsStore(state => state.isDarkMode)

    return (
        <MotiView from={{translateY: 20, opacity: 0}}
            animate={{translateY: isInView ? 0 : 20, opacity: isInView ? 1 : 0}}
            transition={{delay: index * 200}}
            style={styles(isDarkMode).historyItem} key={`HistoryItem${index}`}>
            <View style={styles(isDarkMode).historyItemImgContainer}>
                <Image resizeMode="contain" style={styles(isDarkMode).historyItemImg}
                source={{uri: item.img}}/>
            </View>
            <View style={styles(isDarkMode).historyItemDescriptionContainer}>
                <Text style={styles(isDarkMode).historyItemTitle}>{item.name}</Text>
                <Text style={styles(isDarkMode).historyItemCost}>{item.cost} pkt.</Text>
                <Text style={styles(isDarkMode).historyItemDate}>{`${item.date.getDate()}/${item.date.getMonth() + 1}/${item.date.getFullYear()}`}</Text>
            </View>
        </MotiView>
    )
}


export default HistoryItem