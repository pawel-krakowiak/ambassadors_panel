import * as React from 'react';
import 'react-native-reanimated'
import { MotiView, MotiText } from 'moti'
import { View, Text, Image, TouchableWithoutFeedback, ScrollView, Dimensions } from 'react-native';
import styles from './styles';
import optionsStore from '../../../zustand/options';
import InViewPort from "@coffeebeanslabs/react-native-inviewport";
import CategoriesItem from './CategoriesItem/CategoriesItem';
import userStore from '../../../zustand/user';

const Categories = () => {
    const isDarkMode = optionsStore(state => state.isDarkMode)
    const [isInView, setIsInView] = React.useState(false)
    const user = userStore(state => state.user)

    return (
        <View style={styles(isDarkMode).wrapper}>
            <InViewPort onChange={(isVisible) => isVisible && setIsInView(true)}>
            <MotiText from={{translateY: 20,  opacity: 0}} 
            animate={{translateY: isInView ? 0 : 20, opacity: isInView ? 1 : 0}} 
            style={styles(isDarkMode).title}>Kategorie</MotiText>
            <ScrollView  contentContainerStyle={styles(isDarkMode).categoriesWrapper} horizontal 
             showsHorizontalScrollIndicator={false}>
                <CategoriesItem filter="all" img={require('../../../assets/icons8-electronic-cigarette-100.png')} txt="Wszystkie"/>
                <CategoriesItem filter="isAvaiable" img={require('../../../assets/icons8-checkmark-100.png')} txt="Dostępne"/>
                <CategoriesItem filter="isntAvaiable" img={require('../../../assets/icons8-cancel-100.png')} txt="Nie Dostępne"/>
                <CategoriesItem filter="canBuy" img={require('../../../assets/greenDollar.png')} txt={`Do ${user.points} pkt.`}/>
                <CategoriesItem filter="cantBuy" img={require('../../../assets/redDollar.png')} txt={`Ponad ${user.points} pkt.`}/>
            </ScrollView >
            </InViewPort>
        </View>
    )
}

export default Categories