import * as React from 'react';
import 'react-native-reanimated'
import { View, Text, Image, TouchableWithoutFeedback, ScrollView } from 'react-native';
import styles from './styles';
import * as Icons from "react-native-heroicons/solid";
import GestureRecognizer from 'react-native-swipe-gestures';
import optionsStore from '../../zustand/options';
import historyStore from '../../zustand/history';
import HistoryItem from '../../components/HistoryItem/HistoryItem';
import BackHeader from '../../components/BackHeader/BackHeader';

const HistoryScreen = ({navigation, route}) => {
    const historyItems = historyStore(state => state.historyItems)
    const isDarkMode = optionsStore(state => state.isDarkMode)

    React.useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])

    return (
        <GestureRecognizer style={{flex: 1}}  onSwipeRight={() => navigation.goBack()} config={{directionalOffsetThreshold: 150, velocityThreshold: 0.6}}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles(isDarkMode).wrapper}>
                <BackHeader />
                <View style={styles(isDarkMode).imgContainer}>
                    <Image style={styles(isDarkMode).img}  
                    source={require('../../assets/historyImg.png')}/>
                </View>
                <View style={styles(isDarkMode).txtContainer}>
                    <Text style={styles(isDarkMode).title}>Historia</Text>
                </View>
                <View style={styles(isDarkMode).historyItemsContainer}>
                    {historyItems?.map((item, index) => {
                        return(
                            <HistoryItem item={item} index={index} isInView={true} key={`${index}, HistoryItem${item.name}`}/>
                        )
                    })}
            </View>
            </ScrollView>
        </GestureRecognizer>
    )


}


export default HistoryScreen