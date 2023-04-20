import * as React from 'react';
import 'react-native-reanimated'
import { MotiView, MotiText } from 'moti'
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import styles from './styles';
import * as Icons from "react-native-heroicons/solid";
import historyStore from '../../../zustand/history';
import InViewPort from "@coffeebeanslabs/react-native-inviewport";

const History = () => {

    const getItems = historyStore(state => state.getItems)
    const historyItems = historyStore(state => state.historyItems)
    const [showAll, setShowAll] = React.useState(false)
    const [isInView, setIsInView] = React.useState(false)

    React.useEffect(() => {
        getItems()
    }, [])

    return (
        <View style={styles.wrapper}>
            <InViewPort onChange={(isVisible) => isVisible && setIsInView(true)}>
            <Text style={styles.title}>Historia</Text>
            <View style={styles.historyItemsContainer}>
                {historyItems?.map((item, index) => {
                    if(showAll){
                        return(
                            <MotiView from={{translateY: 20, opacity: 0}}
                            animate={{translateY: isInView ? 0 : 20, opacity: isInView ? 1 : 0}}
                            transition={{delay: index * 200}}
                             style={styles.historyItem} key={`HistoryItem${index}`}>
                                <View style={styles.historyItemImgContainer}>
                                    <Image resizeMode="contain" style={styles.historyItemImg}
                                    source={{uri: item.img}}/>
                                </View>
                                <View style={styles.historyItemDescriptionContainer}>
                                    <Text style={styles.historyItemTitle}>{item.name}</Text>
                                    <Text style={styles.historyItemCost}>{item.cost} pkt.</Text>
                                    <Text style={styles.historyItemDate}>{`${item.date.getDate()}/${item.date.getMonth() + 1}/${item.date.getFullYear()}`}</Text>
                                </View>
                            </MotiView>
                        )
                    }else if(index < 3){
                        return(
                            <MotiView from={{translateY: 20, opacity: 0}}
                            animate={{translateY: isInView ? 0 : 20, opacity: isInView ? 1 : 0}}
                            transition={{delay: index * 200}}
                             style={styles.historyItem} key={`HistoryItem${index}`}>
                                <View style={styles.historyItemImgContainer}>
                                    <Image resizeMode="contain" style={styles.historyItemImg}
                                    source={{uri: item.img}}/>
                                </View>
                                <View style={styles.historyItemDescriptionContainer}>
                                    <Text style={styles.historyItemTitle}>{item.name}</Text>
                                    <Text style={styles.historyItemCost}>{item.cost} pkt.</Text>
                                    <Text style={styles.historyItemDate}>{`${item.date.getDate()}/${item.date.getMonth() + 1}/${item.date.getFullYear()}`}</Text>
                                </View>
                            </MotiView>
                        )
                    }
                })}
            </View>
            {!showAll && <TouchableWithoutFeedback onPress={() => setShowAll(true)}>
                <View style={styles.showMoreBtn}>
                    <Text style={styles.showMoreBtnText}>Wczytaj więcej</Text>
                </View>
            </TouchableWithoutFeedback>}
            </InViewPort>
        </View>
    )
}

export default History