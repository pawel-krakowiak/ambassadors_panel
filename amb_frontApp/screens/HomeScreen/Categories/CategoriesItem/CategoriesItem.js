import * as React from 'react';
import optionsStore from '../../../../zustand/options';
import { MotiView, MotiText } from 'moti'
import { View, Text, Image, TouchableWithoutFeedback, Dimensions } from 'react-native';
import styles from './styles';
import productsStore from '../../../../zustand/products';
import userStore from '../../../../zustand/user';

const CategoriesItem = ({filter, img, txt}) => {
    const { height, width } = Dimensions.get('window');
    const isDarkMode = optionsStore(state => state.isDarkMode)
    const currentFilter = productsStore(state => state.currentFilter)
    const setFilter = productsStore(state => state.setFilter)
    const user = userStore(state => state.user)
    const [bgColor, setBgColor] = React.useState("#F1F1F1")
    const [txtColor, setTxtColor] = React.useState("#F1F1F1")

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
        <TouchableWithoutFeedback onPress={() => setFilter(filter, user)}>
            <MotiView style={styles(isDarkMode).categoriesItem} 
            from={{backgroundColor: bgColor, color: txtColor}} 
            animate={{backgroundColor: currentFilter === filter ? "#34A3CF" : bgColor }} >
                <Image style={styles(isDarkMode).categoriesItemImg}  
                source={img}/>
                <Text style={{fontSize: width > 700 ? 18 : 16, color: currentFilter === filter ? "white" : txtColor}}>{txt}</Text>
            </MotiView>
        </TouchableWithoutFeedback>
    )
}


export default CategoriesItem