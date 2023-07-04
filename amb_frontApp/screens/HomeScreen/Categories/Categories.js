import * as React from 'react';
import 'react-native-reanimated'
import { MotiView, MotiText } from 'moti'
import { View, Text, Image, TouchableWithoutFeedback, ScrollView, Dimensions } from 'react-native';
import styles from './styles';
import productsStore from '../../../zustand/products';
import optionsStore from '../../../zustand/options';
import userStore from '../../../zustand/user'
import InViewPort from "@coffeebeanslabs/react-native-inviewport";

const Categories = () => {

    const currentFilter = productsStore(state => state.currentFilter)
    const setFilter = productsStore(state => state.setFilter)
    const isDarkMode = optionsStore(state => state.isDarkMode)
    const user = userStore(state => state.user)
    const [isInView, setIsInView] = React.useState(false)
    const [bgColor, setBgColor] = React.useState("#F1F1F1")
    const [txtColor, setTxtColor] = React.useState("#F1F1F1")
    const { height, width } = Dimensions.get('window');

    React.useEffect(() => {
        if(isDarkMode){
            setBgColor("#2e2e2e")
            setTxtColor("#fff")
        }else{
            setBgColor("#f1f1F1")
            setTxtColor("#000")
        }
    }, [isDarkMode])

    return (
        <View style={styles(isDarkMode).wrapper}>
            <InViewPort onChange={(isVisible) => isVisible && setIsInView(true)}>
            <MotiText from={{translateY: 20,  opacity: 0}} 
            animate={{translateY: isInView ? 0 : 20, opacity: isInView ? 1 : 0}} 
            style={styles(isDarkMode).title}>Kategorie</MotiText>
            <ScrollView  contentContainerStyle={styles(isDarkMode).categoriesWrapper} horizontal 
             showsHorizontalScrollIndicator={false}>
                <TouchableWithoutFeedback onPress={() => setFilter('all', user)}>
                    <MotiView style={styles(isDarkMode).categoriesItem} 
                    from={{backgroundColor: bgColor, color: txtColor}} 
                    animate={{backgroundColor: currentFilter === "all" ? "#34A3CF" : bgColor }} >
                        <Image style={styles(isDarkMode).categoriesItemImg}  
                        source={require('../../../assets/icons8-electronic-cigarette-100.png')}/>
                        <Text style={{fontSize: width > 700 ? 18 : 16, color: currentFilter === "all" ? "white" : txtColor}}>Wszystkie</Text>
                    </MotiView>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => setFilter('isAvaiable', user)}>
                    <MotiView style={styles(isDarkMode).categoriesItem} 
                    from={{backgroundColor: bgColor, color: txtColor}} 
                    animate={{backgroundColor: currentFilter === "isAvaiable" ? "#34A3CF" : bgColor }} >
                        <Image style={styles(isDarkMode).categoriesItemImg}  
                        source={require('../../../assets/icons8-checkmark-100.png')}/>
                        <Text style={{fontSize: width > 700 ? 18 : 16, color: currentFilter === "isAvaiable" ? "white" : txtColor}}>Dostępne</Text>
                    </MotiView>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => setFilter('isntAvaiable', user)}>
                    <MotiView style={styles(isDarkMode).categoriesItem} 
                    from={{backgroundColor: bgColor, color: txtColor}} 
                    animate={{backgroundColor: currentFilter === "isntAvaiable" ? "#34A3CF" : bgColor }} >
                        <Image style={styles(isDarkMode).categoriesItemImg}  
                        source={require('../../../assets/icons8-cancel-100.png')}/>
                        <Text style={{fontSize: width > 700 ? 18 : 16, color: currentFilter === "isntAvaiable" ? "white" : txtColor}}>Nie Dostępne</Text>
                    </MotiView>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => setFilter('canBuy', user)}>
                    <MotiView style={styles(isDarkMode).categoriesItem} 
                    from={{backgroundColor: bgColor, color: txtColor}} 
                    animate={{backgroundColor: currentFilter === "canBuy" ? "#34A3CF" : bgColor }} >
                        <Image style={styles(isDarkMode).categoriesItemImg}  
                        source={require('../../../assets/greenDollar.png')}/>
                        <Text style={{fontSize: width > 700 ? 18 : 16, color: currentFilter === "canBuy" ? "white" : txtColor}}>Do {user.points} pkt.</Text>
                    </MotiView>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => setFilter('cantBuy', user)}>
                    <MotiView style={styles(isDarkMode).categoriesItem} 
                    from={{backgroundColor: bgColor, color: txtColor}} 
                    animate={{backgroundColor: currentFilter === "cantBuy" ? "#34A3CF" : bgColor }} >
                        <Image style={styles(isDarkMode).categoriesItemImg}  
                        source={require('../../../assets/redDollar.png')}/>
                        <Text style={{fontSize: width > 700 ? 18 : 16, color: currentFilter === "cantBuy" ? "white" : txtColor}}>Ponad {user.points} pkt.</Text>
                    </MotiView>
                </TouchableWithoutFeedback>
                
            </ScrollView >
            </InViewPort>
        </View>
    )
}

export default Categories