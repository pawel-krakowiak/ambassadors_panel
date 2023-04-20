import * as React from 'react';
import 'react-native-reanimated'
import { MotiView, MotiText } from 'moti'
import { View, Text, Image, TouchableWithoutFeedback, ScrollView } from 'react-native';
import styles from './styles';
import productsStore from '../../../zustand/products';
import userStore from '../../../zustand/user'
import InViewPort from "@coffeebeanslabs/react-native-inviewport";

const Categories = () => {

    const currentFilter = productsStore(state => state.currentFilter)
    const setFilter = productsStore(state => state.setFilter)
    const user = userStore(state => state.user)
    const [isInView, setIsInView] = React.useState(false)

    return (
        <View style={styles.wrapper}>
            <InViewPort onChange={(isVisible) => isVisible && setIsInView(true)}>
            <MotiText from={{translateY: 20,  opacity: 0}} 
            animate={{translateY: isInView ? 0 : 20, opacity: isInView ? 1 : 0}} 
            style={styles.title}>Kategorie</MotiText>
            <ScrollView  contentContainerStyle={styles.categoriesWrapper} horizontal 
             showsHorizontalScrollIndicator={false}>
                <TouchableWithoutFeedback onPress={() => setFilter('all', user)}>
                    <MotiView style={styles.categoriesItem} 
                    from={{backgroundColor: "#F1F1F1", color: "black"}} 
                    animate={{backgroundColor: currentFilter === "all" ? "#34A3CF" : "#F1F1F1" }} >
                        <Image style={styles.categoriesItemImg}  
                        source={require('../../../assets/icons8-electronic-cigarette-100.png')}/>
                        <Text style={{fontSize: 16, color: currentFilter === "all" ? "white" : "black"}}>Wszystkie</Text>
                    </MotiView>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => setFilter('isAvaiable', user)}>
                    <MotiView style={styles.categoriesItem} 
                    from={{backgroundColor: "#F1F1F1", color: "black"}} 
                    animate={{backgroundColor: currentFilter === "isAvaiable" ? "#34A3CF" : "#F1F1F1" }} >
                        <Image style={styles.categoriesItemImg}  
                        source={require('../../../assets/icons8-checkmark-100.png')}/>
                        <Text style={{fontSize: 16, color: currentFilter === "isAvaiable" ? "white" : "black"}}>Dostępne</Text>
                    </MotiView>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => setFilter('isntAvaiable', user)}>
                    <MotiView style={styles.categoriesItem} 
                    from={{backgroundColor: "#F1F1F1", color: "black"}} 
                    animate={{backgroundColor: currentFilter === "isntAvaiable" ? "#34A3CF" : "#F1F1F1" }} >
                        <Image style={styles.categoriesItemImg}  
                        source={require('../../../assets/icons8-cancel-100.png')}/>
                        <Text style={{fontSize: 16, color: currentFilter === "isntAvaiable" ? "white" : "black"}}>Nie Dostępne</Text>
                    </MotiView>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => setFilter('canBuy', user)}>
                    <MotiView style={styles.categoriesItem} 
                    from={{backgroundColor: "#F1F1F1", color: "black"}} 
                    animate={{backgroundColor: currentFilter === "canBuy" ? "#34A3CF" : "#F1F1F1" }} >
                        <Image style={styles.categoriesItemImg}  
                        source={require('../../../assets/greenDollar.png')}/>
                        <Text style={{fontSize: 16, color: currentFilter === "canBuy" ? "white" : "black"}}>Can buy</Text>
                    </MotiView>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => setFilter('cantBuy', user)}>
                    <MotiView style={styles.categoriesItem} 
                    from={{backgroundColor: "#F1F1F1", color: "black"}} 
                    animate={{backgroundColor: currentFilter === "cantBuy" ? "#34A3CF" : "#F1F1F1" }} >
                        <Image style={styles.categoriesItemImg}  
                        source={require('../../../assets/redDollar.png')}/>
                        <Text style={{fontSize: 16, color: currentFilter === "cantBuy" ? "white" : "black"}}>Can't buy</Text>
                    </MotiView>
                </TouchableWithoutFeedback>
                
            </ScrollView >
            </InViewPort>
        </View>
    )
}

export default Categories