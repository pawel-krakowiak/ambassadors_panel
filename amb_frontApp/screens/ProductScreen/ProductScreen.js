import * as React from 'react';
import 'react-native-reanimated'
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { MotiText, MotiView } from 'moti';
import styles from './styles';
import * as Icons from "react-native-heroicons/solid";
import userStore from '../../zustand/user';
import AnimateNumber from 'react-native-countup'
import GestureRecognizer from 'react-native-swipe-gestures';


const ProductScreen = ({navigation, route}) => {

    const item = route.params
    const user = userStore(state => state.user)

    React.useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])

    const [amount, setAmount] = React.useState(1)

    const handleBuy = () => {
        if(amount <= 9 && amount >= 1){
            if((amount * item.points_price) <= user?.points){
             //buy product
             console.log('buy')
            }
        }
    }

    const handleSwipe = () => {
        navigation.goBack()
    }

    return (
        <GestureRecognizer style={styles.wrapper} onSwipeRight={handleSwipe} config={{directionalOffsetThreshold: 150, velocityThreshold: 0.6}}>
            <View style={styles.backBtnContainer}>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                    <MotiView style={styles.backBtn}
                    from={{scale: 0.75, opacity: 0}}
                    animate={{scale: 1, opacity: 1}}
                    transition={{delay: 300}}>
                        <Icons.ChevronLeftIcon size={25} color="#F1F1F1"/>
                    </MotiView>
                </TouchableWithoutFeedback>
            </View>   
            <View style={styles.imgContainer}>
                <Image resizeMode="contain" style={styles.img} source={{uri: item.reward_img}}/>
            </View>
            <View style={styles.bottomContainer}> 
                <View style={styles.descContainer}> 
                    <MotiText style={styles.title} 
                    from={{opacity: 0, translateY: 20}}
                    animate={{opacity: 1, translateY: 0}}
                    transition={{delay: 300}}>{item.name}</MotiText>
                    <MotiText style={styles.description}
                    from={{opacity: 0, translateY: 20,}}
                    animate={{opacity: 1, translateY: 0}}
                    transition={{delay: 400}}>{item.description}</MotiText>
                </View>
                <MotiView style={styles.amountContainer}
                from={{opacity: 0, translateY: 20,}}
                animate={{opacity: 1, translateY: 0}}
                transition={{delay: 600}}>
                    <TouchableWithoutFeedback onPress={() => amount > 1 && setAmount(amount - 1)}>
                        <MotiView style={styles.minusIcon}
                        from={{borderColor: "#34A3CF"}}
                        animate={{borderColor: amount > 1 ? "#34A3CF" : "#8E8E8E"}}>
                            <Text>
                                <Icons.MinusIcon color={amount > 1 ? "#34A3CF" : "#8E8E8E"} size={35}/>
                            </Text>
                        </MotiView>
                    </TouchableWithoutFeedback> 
                    <Text style={styles.amount}>
                        {amount}
                    </Text>
                    <TouchableWithoutFeedback onPress={() => amount < 9 && setAmount(amount + 1)}>
                        <MotiView  style={styles.plusIcon}
                        from={{backgroundColor: "#34A3CF"}}
                        animate={{backgroundColor: amount < 9 ? "#34A3CF" : "#8E8E8E"}}>
                            <Text >
                                <Icons.PlusIcon color="white" size={30}/>
                            </Text>
                        </MotiView>
                    </TouchableWithoutFeedback> 
                </MotiView>
                <MotiView style={styles.buyContainer}
                from={{opacity: 0, translateY: 20,}}
                animate={{opacity: 1, translateY: 0}}
                transition={{delay: 800}}>
                    <MotiText style={styles.cost}
                    from={{color: "#34A3CF"}}
                    animate={{color: (amount * item.points_price) <= user?.points ? "#34A3CF" : "#8E8E8E"}}>
                        <AnimateNumber value={amount * item.points_price} formatter={(val) => {return parseFloat(val).toFixed(0)}}/> pkt.
                    </MotiText>
                    <TouchableWithoutFeedback onPress={handleBuy}>
                        <MotiView style={styles.buyBtn}
                        from={{backgroundColor: "#34A3CF"}}
                        animate={{backgroundColor: (amount * item.points_price) <= user?.points ? "#34A3CF" : "#8E8E8E"}}>
                            <Text style={styles.buyBtnTxt}>Wymień</Text>
                        </MotiView>
                    </TouchableWithoutFeedback>
                </MotiView>
            </View>
        </GestureRecognizer>
    )


}


export default ProductScreen