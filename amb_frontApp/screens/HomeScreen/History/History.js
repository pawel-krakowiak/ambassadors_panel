import * as React from 'react';
import 'react-native-reanimated'
import { MotiView, MotiText } from 'moti'
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import styles from './styles';
import * as Icons from "react-native-heroicons/solid";
import historyStore from '../../../zustand/history';


const History = () => {

    const getItems = historyStore(state => state.getItems)
    const historyItems = historyStore(state => state.historyItems)
    const [showAll, setShowAll] = React.useState(false)

    React.useEffect(() => {
        getItems()
    }, [])

    return (
        <View style={styles.wrapper}>
            <MotiText from={{translateY: 20,  opacity: 0,}} 
            animate={{translateY: 0,  opacity: 1}} 
            style={styles.title}>Historia</MotiText>
            <View style={styles.historyItemsContainer}>
                {historyItems?.map((item, index) => {
                    if(showAll){
                        return(
                            <MotiView from={{translateY: 20, opacity: 0}}
                            animate={{translateY: 0, opacity: 1}}
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
                            animate={{translateY: 0, opacity: 1}}
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
        </View>
    )
}

export default History