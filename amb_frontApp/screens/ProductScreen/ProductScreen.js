import * as React from 'react';
import 'react-native-reanimated'
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { MotiText, MotiView } from 'moti';
import styles from './styles';
import * as Icons from "react-native-heroicons/solid";
import userStore from '../../zustand/user';
import optionsStore from '../../zustand/options';
import AnimateNumber from 'react-native-countup'
import GestureRecognizer from 'react-native-swipe-gestures';
import historyStore from '../../zustand/history';


const ProductScreen = ({navigation, route}) => {

    const item = route.params
    const user = userStore(state => state.user)
    const isDarkMode = optionsStore(state => state.isDarkMode)
    const createOrder = historyStore(state => state.createOrder)

    React.useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])

    const [amount, setAmount] = React.useState(1)

    const handleBuy = () => {
        if(amount <= 9 && amount >= 1){
            if((amount * item.points_price) <= user?.points){
             createOrder(item, amount, navigation)
            
            }
        }
    }

    const handleSwipe = () => {
        navigation.goBack()
    }

    return (
        <GestureRecognizer style={styles(isDarkMode).wrapper} onSwipeRight={handleSwipe} config={{directionalOffsetThreshold: 150, velocityThreshold: 0.6}}>
            <View style={styles(isDarkMode).backBtnContainer}>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                    <MotiView style={styles(isDarkMode).backBtn}
                    from={{scale: 0.75, opacity: 0}}
                    animate={{scale: 1, opacity: 1}}
                    transition={{delay: 300}}>
                        <Icons.ChevronLeftIcon size={25} color="#F1F1F1"/>
                    </MotiView>
                </TouchableWithoutFeedback>
            </View>   
            <View style={styles(isDarkMode).imgContainer}>
                <Image resizeMode="contain" style={styles(isDarkMode).img} source={{uri: item.reward_img}}/>
            </View>
            <View style={styles(isDarkMode).bottomContainer}> 
                <View style={styles(isDarkMode).descContainer}> 
                    <MotiText style={styles(isDarkMode).title} 
                    from={{opacity: 0, translateY: 20}}
                    animate={{opacity: 1, translateY: 0}}
                    transition={{delay: 300}}>{item.name}</MotiText>
                    <MotiText style={styles(isDarkMode).description}
                    from={{opacity: 0, translateY: 20,}}
                    animate={{opacity: 1, translateY: 0}}
                    transition={{delay: 400}}>{item.description}</MotiText>
                </View>
                <MotiView style={styles(isDarkMode).amountContainer}
                from={{opacity: 0, translateY: 20,}}
                animate={{opacity: 1, translateY: 0}}
                transition={{delay: 600}}>
                    <TouchableWithoutFeedback onPress={() => amount > 1 && setAmount(amount - 1)}>
                        <MotiView style={styles(isDarkMode).minusIcon}
                        from={{borderColor: "#34A3CF"}}
                        animate={{borderColor: amount > 1 ? "#34A3CF" : "#8E8E8E"}}>
                            <Text>
                                <Icons.MinusIcon color={amount > 1 ? "#34A3CF" : "#8E8E8E"} size={35}/>
                            </Text>
                        </MotiView>
                    </TouchableWithoutFeedback> 
                    <Text style={styles(isDarkMode).amount}>
                        {amount}
                    </Text>
                    <TouchableWithoutFeedback onPress={() => amount < 9 && setAmount(amount + 1)}>
                        <MotiView  style={styles(isDarkMode).plusIcon}
                        from={{backgroundColor: "#34A3CF"}}
                        animate={{backgroundColor: amount < 9 ? "#34A3CF" : "#8E8E8E"}}>
                            <Icons.PlusIcon color="white" size={30}/>
                        </MotiView>
                    </TouchableWithoutFeedback> 
                </MotiView>
                <MotiView style={styles(isDarkMode).buyContainer}
                from={{opacity: 0, translateY: 20,}}
                animate={{opacity: 1, translateY: 0}}
                transition={{delay: 800}}>
                    <MotiText style={styles(isDarkMode).cost}
                    from={{color: "#34A3CF"}}
                    animate={{color: (amount * item.points_price) <= user?.points ? "#34A3CF" : "#8E8E8E"}}>
                        <AnimateNumber value={amount * item.points_price} formatter={(val) => {return parseFloat(val).toFixed(0)}}/> pkt.
                    </MotiText>
                    <TouchableWithoutFeedback onPress={handleBuy}>
                        <MotiView style={styles(isDarkMode).buyBtn}
                        from={{backgroundColor: "#34A3CF"}}
                        animate={{backgroundColor: (amount * item.points_price) <= user?.points ? "#34A3CF" : "#8E8E8E"}}>
                            <Text style={styles(isDarkMode).buyBtnTxt}>Wymień</Text>
                        </MotiView>
                    </TouchableWithoutFeedback>
                </MotiView>
            </View>
        </GestureRecognizer>
    )


}


export default ProductScreen