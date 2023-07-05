import * as React from 'react';
import 'react-native-reanimated'
import { MotiView, MotiText } from 'moti'
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import styles from './styles';
import * as Icons from "react-native-heroicons/solid";
import historyStore from '../../../zustand/history';
import optionsStore from '../../../zustand/options';
import InViewPort from "@coffeebeanslabs/react-native-inviewport";
import HistoryItem from './HistoryItem/HistoryItem'
import { useNavigation } from '@react-navigation/native';

const History = ({isBottomInView, setIsBottomInView}) => {

    const historyItems = historyStore(state => state.historyItems)
    const isDarkMode = optionsStore(state => state.isDarkMode)
    const [showAll, setShowAll] = React.useState(false)
    const navigation = useNavigation()

    const handleBtnClick = () => {
        if(showAll){
            navigation.navigate('History')
        }else{
            setShowAll(true)
        }
    }

    return (
        <View style={styles(isDarkMode).wrapper}>
            <InViewPort onChange={(isVisible) => isVisible && setIsBottomInView(true)}>
            <Text style={styles(isDarkMode).title}>Historia</Text>
            <View style={styles(isDarkMode).historyItemsContainer}>
                {historyItems?.map((item, index) => {
                    if(showAll && index < 6){
                        return(
                            <HistoryItem item={item} index={index} isInView={isBottomInView} key={`${index}, HistoryItem${item.name}`}/>
                        )
                    }else if(index < 3){
                        return(
                            <HistoryItem item={item} index={index} isInView={isBottomInView} key={`${index}, HistoryItem${item.name}`}/>
                        )
                    }
                })}
            </View>
           <TouchableWithoutFeedback onPress={handleBtnClick}>
                <View style={styles(isDarkMode).showMoreBtn}>
                    <Text style={styles(isDarkMode).showMoreBtnText}>Wczytaj więcej</Text>
                </View>
            </TouchableWithoutFeedback>
            </InViewPort>
        </View>
    )
}

export default History