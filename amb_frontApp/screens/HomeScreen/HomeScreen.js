import * as React from 'react';
import 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native';
import { View, ScrollView, Text, useColorScheme } from 'react-native';
import Nav from '../../components/Nav/Nav.js';
import styles from './styles';
import Categories from './Categories/Categories.js';
import Produsts from './Products/Produsts.js';
import History from './History/History.js';
import Settings from './Settings/Settings.js';
import GestureRecognizer from 'react-native-swipe-gestures'
import optionsStore from '../../zustand/options.js';
import historyStore from '../../zustand/history.js';

const HomeScreen = () => {
    const navigation = useNavigation()
    const currentProduct = optionsStore(state => state.currentProduct)
    const checkDarkMode = optionsStore(state => state.checkDarkMode)
    const isDarkMode = optionsStore(state => state.isDarkMode)
    const scrollViewRef = React.useRef();
    const historyItems = historyStore(state => state.historyItems)
    const getItems = historyStore(state => state.getItems)
    const theme = useColorScheme();
    
    React.useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
        getItems()
        checkDarkMode(theme)
    }, [])

    const handleSwipe = () => {
        if(currentProduct.id){
            navigation.navigate('Product', currentProduct)
        }
    }

    return (
        <View style={{flex: 1, backgroundColor: isDarkMode ? "#3b3b3b" : '#FCFCFC'}} >
            <ScrollView showsVerticalScrollIndicator={false}
             stickyHeaderIndices={[0]} ref={scrollViewRef}>
                <Nav scrollViewRef={scrollViewRef} />
                <View style={styles(isDarkMode).content}>
                    <Categories />
                    <GestureRecognizer style={styles(isDarkMode).content} onSwipeLeft={handleSwipe} config={{directionalOffsetThreshold: 150, velocityThreshold: 0.6}}>
                    <Produsts />
                    {historyItems.length > 0 && <History />}
                    <Settings />
                    <Text style={styles(isDarkMode).copyRight}>&copy; 2023 Just Vape</Text>
                    </GestureRecognizer>
                </View>
            </ScrollView>         
        </View>
    )


}


export default HomeScreen