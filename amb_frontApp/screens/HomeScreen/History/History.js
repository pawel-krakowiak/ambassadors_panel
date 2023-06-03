import * as React from 'react';
import 'react-native-reanimated'
import { MotiView, MotiText } from 'moti'
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import styles from './styles';
import * as Icons from "react-native-heroicons/solid";
import historyStore from '../../../zustand/history';
import optionsStore from '../../../zustand/options';
import InViewPort from "@coffeebeanslabs/react-native-inviewport";

const History = () => {

    const historyItems = historyStore(state => state.historyItems)
    const isDarkMode = optionsStore(state => state.isDarkMode)
    const [showAll, setShowAll] = React.useState(false)
    const [isInView, setIsInView] = React.useState(false)


    
    return (
        <View style={styles(isDarkMode).wrapper}>
            <InViewPort onChange={(isVisible) => isVisible && setIsInView(true)}>
            <Text style={styles(isDarkMode).title}>Historia</Text>
            <View style={styles(isDarkMode).historyItemsContainer}>
                {historyItems?.map((item, index) => {
                    if(showAll){
                        return(
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
                    }else if(index < 3){
                        return(
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
                })}
            </View>
            {!showAll && <TouchableWithoutFeedback onPress={() => setShowAll(true)}>
                <View style={styles(isDarkMode).showMoreBtn}>
                    <Text style={styles(isDarkMode).showMoreBtnText}>Wczytaj więcej</Text>
                </View>
            </TouchableWithoutFeedback>}
            </InViewPort>
        </View>
    )
}

export default History