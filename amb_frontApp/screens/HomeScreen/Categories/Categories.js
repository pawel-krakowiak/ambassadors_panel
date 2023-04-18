import * as React from 'react';
import 'react-native-reanimated'
import { MotiView, MotiText } from 'moti'
import { View, Text, Image, TouchableWithoutFeedback, ScrollView } from 'react-native';
import styles from './styles';
import productsStore from '../../../zustand/products';
import userStore from '../../../zustand/user'

const Categories = () => {

    const currentFilter = productsStore(state => state.currentFilter)
    const setFilter = productsStore(state => state.setFilter)
    const user = userStore(state => state.user)

    return (
        <View style={styles.wrapper}>
            <MotiText from={{translateY: 20,  opacity: 0}} 
            animate={{translateY: 0,  opacity: 1}} 
            style={styles.title}>Kategorie</MotiText>
            <ScrollView  contentContainerStyle={styles.categoriesWrapper} horizontal 
             showsHorizontalScrollIndicator={false}>
                <TouchableWithoutFeedback onPress={() => setFilter('all', user)}>
                    <MotiView style={styles.categoriesItem} 
                    from={{translateY: 20, translateX: 10, opacity: 0, backgroundColor: "#F1F1F1", color: "black"}} 
                    animate={{translateY: 0, translateX: 0, opacity: 1, 
                    backgroundColor: currentFilter === "all" ? "#34A3CF" : "#F1F1F1" }} >
                        <Image style={styles.categoriesItemImg}  
                        source={require('../../../assets/icons8-electronic-cigarette-100.png')}/>
                        <Text style={{fontSize: 16, color: currentFilter === "all" ? "white" : "black"}}>Wszystkie</Text>
                    </MotiView>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => setFilter('canBuy', user)}>
                    <MotiView style={styles.categoriesItem} 
                    from={{translateY: 20, translateX: 10, opacity: 0, backgroundColor: "#F1F1F1", color: "black"}} 
                    animate={{translateY: 0, translateX: 0, opacity: 1, 
                    backgroundColor: currentFilter === "canBuy" ? "#34A3CF" : "#F1F1F1" }} >
                        <Image style={styles.categoriesItemImg}  
                        source={require('../../../assets/icons8-checkmark-100.png')}/>
                        <Text style={{fontSize: 16, color: currentFilter === "canBuy" ? "white" : "black"}}>Dostępne</Text>
                    </MotiView>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => setFilter('cantBuy', user)}>
                    <MotiView style={styles.categoriesItem} 
                    from={{translateY: 20, translateX: 10, opacity: 0, backgroundColor: "#F1F1F1", color: "black"}} 
                    animate={{translateY: 0, translateX: 0, opacity: 1, 
                    backgroundColor: currentFilter === "cantBuy" ? "#34A3CF" : "#F1F1F1" }} >
                        <Image style={styles.categoriesItemImg}  
                        source={require('../../../assets/icons8-us-dollar-circled-100.png')}/>
                        <Text style={{fontSize: 16, color: currentFilter === "cantBuy" ? "white" : "black"}}>Zablokowane</Text>
                    </MotiView>
                </TouchableWithoutFeedback>
                
            </ScrollView >
        </View>
    )
}

export default Categories