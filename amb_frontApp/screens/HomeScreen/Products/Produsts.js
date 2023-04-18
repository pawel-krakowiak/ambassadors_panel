import * as React from 'react';
import 'react-native-reanimated'
import { MotiView, MotiText } from 'moti'
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import styles from './styles';
import productsStore from '../../../zustand/products';
import * as Icons from "react-native-heroicons/solid";

const Produsts = () => {

    const [sortByHighest, setSortByHighest] = React.useState(true)
    const sortedItems = productsStore(state => state.sortedItems)
    

    return (
        <View style={styles.wrapper}>
            <View style={styles.topContainer}>
                <MotiText from={{translateY: 20,  opacity: 0,}} 
                animate={{translateY: 0,  opacity: 1}} 
                style={styles.title}>Nagrody</MotiText>
                <MotiView from={{translateY: 20,  opacity: 0,}} 
                animate={{translateY: 0,  opacity: 1}} style={styles.sortContainer}>
                    <Text style={styles.sortTitle}>Sortuj:</Text>
                    <TouchableWithoutFeedback onPress={() => setSortByHighest(!sortByHighest)}>
                        <View style={styles.sortContainer}> 
                            <Text style={styles.sortValue}> Punkty</Text>
                            <MotiView from={{rotate: '0deg'}} 
                            animate={{rotate: sortByHighest ? '0deg' : '180deg'}}>
                                <Icons.ChevronDownIcon height={30} color="black"/>
                            </MotiView>
                        </View>
                    </TouchableWithoutFeedback>
                </MotiView>
            </View>
            <View style={styles.productsContainer}>
                {sortedItems?.sort((a, b) => {
                    if(sortByHighest){
                        return  b.cost - a.cost 
                    }else{
                        return  a.cost - b.cost 
                    }
                })?.map((item, index) => {
                    if(sortedItems.length % 2 !== 0 && index + 1 === sortedItems.length){
                        return(
                            <MotiView key={`Product${index}`} from={{translateY: 20, translateX: 20, opacity: 0}}
                            animate={{translateY: 0, translateX: 0, opacity: 1}}   transition={{
                                type: 'timing',
                                duration: 350,
                                delay: index * 100,
                            }}
                             style={{...styles.productItem, marginTop: index % 2 === 0 ? 12 : 48, marginRight: '50%'}}>
                                <View style={styles.productItemImgContainer}>
                                    <Image resizeMode="contain" style={styles.productItemImg} source={{uri: item.img}}/>
                                </View>
                                <View style={styles.productItemDescriptionContainer}>
                                    <View style={styles.productItemDescriptionLeft}>
                                        <Text style={styles.productItemCost}>{item.cost}pkt.</Text>
                                        <Text style={styles.productItemTitle}>{item.name}</Text>
                                    </View>
                                    <View style={styles.productItemBtn}>
                                        <Icons.PlusIcon height={30} color="white"/>
                                    </View>
                                </View>
                            </MotiView>
                        )
                    }else{
                        return(
                            <MotiView key={`Product${index}`} from={{translateY: 20, translateX: 20, opacity: 0}}
                            animate={{translateY: 0, translateX: 0, opacity: 1}}   transition={{
                                type: 'timing',
                                duration: 350,
                                delay: index * 200,
                            }}
                             style={{...styles.productItem, marginTop: index % 2 === 0 ? 12 : 48,}}>
                                <View style={styles.productItemImgContainer}>
                                    <Image resizeMode="contain" style={styles.productItemImg} source={{uri: item.img}}/>
                                </View>
                                <View style={styles.productItemDescriptionContainer}>
                                    <View style={styles.productItemDescriptionLeft}>
                                        <Text style={styles.productItemCost}>{item.cost}pkt.</Text>
                                        <Text style={styles.productItemTitle}>{item.name}</Text>
                                    </View>
                                    <View style={styles.productItemBtn}>
                                        <Icons.PlusIcon height={30} color="white"/>
                                    </View>
                                </View>
                            </MotiView>
                        )
                    }
                })}
            </View>
        </View>
    )
}

export default Produsts