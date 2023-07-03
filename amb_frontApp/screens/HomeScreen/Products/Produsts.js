import * as React from 'react';
import 'react-native-reanimated'
import { MotiView, MotiText } from 'moti'
import { View, Text, Image, TouchableWithoutFeedback, Dimensions } from 'react-native';
import styles from './styles';
import productsStore from '../../../zustand/products';
import userStore from '../../../zustand/user.js';
import * as Icons from "react-native-heroicons/solid";
import InViewPort from "@coffeebeanslabs/react-native-inviewport";
import { useNavigation } from '@react-navigation/native';
import optionsStore from '../../../zustand/options';

const Produsts = () => {

    const [sortByHighest, setSortByHighest] = React.useState(true)
    const sortedItems = productsStore(state => state.sortedItems)
    const allItems = productsStore(state => state.allItems)
    const [isInView, setIsInView] = React.useState(false)
    const searchValue = productsStore(state => state.searchValue)
    const isLoaded = productsStore(state => state.isLoaded)
    const user = userStore(state => state.user)
    const navigation = useNavigation()
    const setCurrentProduct = optionsStore(state => state.setCurrentProduct)
    const isDarkMode = optionsStore(state => state.isDarkMode)
    const { height, width } = Dimensions.get('window');
    
    const handleOpenProductScreen = (item) => {
        if(item.points_price <= user?.points){
            setCurrentProduct(item)
            navigation.navigate('Product', item)
        }
    }

    return (
        <View style={styles(isDarkMode).wrapper}>
            <InViewPort onChange={(isVisible) => isVisible && setIsInView(true)}>
            <View style={styles(isDarkMode).topContainer}>
                <MotiText from={{translateY: 20,  opacity: 0}} 
                animate={{translateY: isInView ? 0 : 20, opacity: isInView ? 1 : 0}}  
                style={styles(isDarkMode).title}>Nagrody</MotiText>
                <MotiView from={{translateY: 20,  opacity: 0,}} 
                animate={{translateY: 0,  opacity: 1}} style={styles(isDarkMode).sortContainer}>
                    <Text style={styles(isDarkMode).sortTitle}>Sortuj:</Text>
                    <TouchableWithoutFeedback onPress={() => setSortByHighest(!sortByHighest)}>
                        <View style={styles(isDarkMode).sortContainer}> 
                            <Text style={styles(isDarkMode).sortValue}> Punkty</Text>
                            <MotiView from={{rotate: '0deg'}} 
                            animate={{rotate: sortByHighest ? '0deg' : '180deg'}}>
                                <Icons.ChevronDownIcon height={30} color={isDarkMode ? '#ffffff' : "#000"}/>
                            </MotiView>
                        </View>
                    </TouchableWithoutFeedback>
                </MotiView>
            </View>
            </InViewPort>
            {isLoaded && <View style={styles(isDarkMode).productsContainer}>
                {sortedItems?.filter(i => {
                    if(searchValue.length > 0){
                        if(i.name.includes(searchValue)){
                            return i
                        }
                    }else{
                        return i
                    }
                }).length > 0 ? 
                sortedItems?.filter(i => {
                    if(searchValue.length > 0){
                        if(i.name.includes(searchValue)){
                            return i
                        }
                    }else{
                        return i
                    }
                })?.sort((a, b) => {
                    if(sortByHighest){
                        return  b.points_price - a.points_price 
                    }else{
                        return  a.points_price - b.points_price 
                    }
                })?.map((item, index) => {
                    if(index % 2 !== 0 ){
                        return(
                            <TouchableWithoutFeedback key={`Product${item.img}-${item.name}`} onPress={() => handleOpenProductScreen(item)}>
                                <MotiView from={{translateY: 20, translateX: 20, opacity: 0}}
                                animate={{translateY: 0, translateX: 0, opacity: 1}}   transition={{
                                    type: 'timing',
                                    duration: 350,
                                    delay: index * 100,
                                }}
                                style={{...styles(isDarkMode).productItem, marginTop: index % 2 === 0 ? 12 : 48, marginLeft: '5%'}}>
                                    <View style={styles(isDarkMode).productItemImgContainer}>
                                        <Image resizeMode="contain" style={styles(isDarkMode).productItemImg} source={{uri: item.reward_img}}/>
                                    </View>
                                    <View style={styles(isDarkMode).productItemDescriptionContainer}>
                                        <View style={styles(isDarkMode).productItemDescriptionLeft}>
                                            <Text style={{...styles(isDarkMode).productItemCost, 
                                            color: item.points_price <= user?.points ? "#34A3CF" : "#8E8E8E"}}>{item.points_price}pkt.</Text>
                                            <Text style={styles(isDarkMode).productItemTitle}>{item.name}</Text>
                                        </View>
                                        <View style={{...styles(isDarkMode).productItemBtn, backgroundColor: item.points_price <= user?.points ? "#34A3CF" : "#8E8E8E"}}>
                                            <Icons.PlusIcon width={width > 640 ? 60 : 30} color="white"/>
                                        </View>
                                    </View>
                                </MotiView>
                            </TouchableWithoutFeedback>
                        )
                    }else{
                        return(
                            <TouchableWithoutFeedback key={`Product${item.img}-${item.name}`} onPress={() => handleOpenProductScreen(item)}>
                                <MotiView  from={{translateY: 20, translateX: 20, opacity: 0}}
                                animate={{translateY: 0, translateX: 0, opacity: 1}}   transition={{
                                    type: 'timing',
                                    duration: 350,
                                    delay: index * 200,
                                }}
                                style={{...styles(isDarkMode).productItem, marginTop: index % 2 === 0 ? 12 : 48, marginLeft: '2.55%'}}>
                                    <View style={styles(isDarkMode).productItemImgContainer}>
                                        <Image resizeMode="contain" style={styles(isDarkMode).productItemImg} source={{uri: item.reward_img}}/>
                                    </View>
                                    <View style={styles(isDarkMode).productItemDescriptionContainer}>
                                        <View style={styles(isDarkMode).productItemDescriptionLeft}>
                                            <Text style={{...styles(isDarkMode).productItemCost, 
                                            color: item.points_price <= user?.points ? "#34A3CF" : "#8E8E8E"}}>{item.points_price}pkt.</Text>
                                            <Text style={styles(isDarkMode).productItemTitle}>{item.name}</Text>
                                        </View>
                                        <View style={{...styles(isDarkMode).productItemBtn, backgroundColor: item.points_price <= user?.points ? "#34A3CF" : "#8E8E8E"}}>
                                            <Icons.PlusIcon width={width > 640 ? 60 : 30} color="white"/>
                                        </View>
                                    </View>
                                </MotiView>
                            </TouchableWithoutFeedback>
                        )
                    }
                }) : 
                <MotiText 
                style={styles(isDarkMode).noItems}
                from={{scale: 0.5, opacity: 0.3}}
                animate={{scale: 1, opacity: 1}}
                >{allItems.length > 0 ? "Brak produktów spełniających wymagania" : "Brak produktów w bazie" }</MotiText>}
            </View>}
        </View>
    )
}

export default Produsts