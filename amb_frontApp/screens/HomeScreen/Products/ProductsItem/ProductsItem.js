import * as React from 'react';
import { MotiView, MotiText } from 'moti'
import { View, Text, Image, TouchableWithoutFeedback, Dimensions } from 'react-native';
import styles from './styles';
import userStore from '../../../../zustand/user';
import optionsStore from '../../../../zustand/options';
import { useNavigation } from '@react-navigation/native';
import * as Icons from "react-native-heroicons/solid";
const ProductsItem = ({item, index}) => {
    const { height, width } = Dimensions.get('window');
    const navigation = useNavigation()
    const isDarkMode = optionsStore(state => state.isDarkMode)
    const user = userStore(state => state.user)
    const setCurrentProduct = optionsStore(state => state.setCurrentProduct)
    

    const handleOpenProductScreen = (item) => {
        if(item.points_price <= user?.points){
            setCurrentProduct(item)
            navigation.navigate('Product', item)
        }
    } 

    return (
        <TouchableWithoutFeedback onPress={() => handleOpenProductScreen(item)}>
            <MotiView style={{...styles(isDarkMode).productItem, marginTop: index % 2 === 0 ? 12 : 48, marginLeft: '5%'}}
            from={{translateY: 20, translateX: 20, opacity: 0}} animate={{translateY: 0, translateX: 0, opacity: 1}} 
            transition={{type: 'timing', duration: 350, delay: index * 100,}}>
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


export default ProductsItem