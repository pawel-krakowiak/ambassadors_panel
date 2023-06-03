import * as React from 'react';
import 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native';
import { View, ScrollView, Text } from 'react-native';
import Nav from '../../components/Nav/Nav.js';
import styles from './styles';
import Categories from './Categories/Categories.js';
import Produsts from './Products/Produsts.js';
import History from './History/History.js';
import Settings from './Settings/Settings.js';
import GestureRecognizer from 'react-native-swipe-gestures'
import optionsStore from '../../zustand/options.js';

const HomeScreen = () => {
    const navigation = useNavigation()
    const currentProduct = optionsStore(state => state.currentProduct)
    const scrollViewRef = React.useRef();

    React.useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])

    const handleSwipe = () => {
        if(currentProduct.id){
            navigation.navigate('Product', currentProduct)
        }
    }

    return (
        <View style={{flex: 1}}>
            <ScrollView showsVerticalScrollIndicator={false}
             stickyHeaderIndices={[0]} ref={scrollViewRef}>
                <Nav scrollViewRef={scrollViewRef} />
                <View style={styles.content}>
                    <Categories />
                    <GestureRecognizer style={styles.content} onSwipeLeft={handleSwipe} config={{directionalOffsetThreshold: 150, velocityThreshold: 0.6}}>
                    <Produsts />
                    <History />
                    <Settings />
                    <Text style={styles.copyRight}>&copy; 2023 Just Vape</Text>
                    </GestureRecognizer>
                </View>
            </ScrollView>         
        </View>
    )


}


export default HomeScreen