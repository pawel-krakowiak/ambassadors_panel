import * as React from 'react';
import 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native';
import { View, ScrollView, Text,  } from 'react-native';
import Nav from '../../components/Nav/Nav.js';
import styles from './styles';
import Categories from './Categories/Categories.js';
import Produsts from './Products/Produsts.js';
import History from './History/History.js';
import Settings from './Settings/Settings.js';
import GestureRecognizer from 'react-native-swipe-gestures'
import optionsStore from '../../zustand/options.js';
import historyStore from '../../zustand/history.js';
import Points from './Points/Points.js';
import PointsInstruction from './PointsInstruction/PointsInstruction.js'
import BottomSheet, { useBottomSheetTimingConfigs } from '@gorhom/bottom-sheet';

const HomeScreen = () => {
    const navigation = useNavigation()
    const currentProduct = optionsStore(state => state.currentProduct)
    const isDarkMode = optionsStore(state => state.isDarkMode)
    const scrollViewRef = React.useRef();
    const historyItems = historyStore(state => state.historyItems)
    const getHistoryItems = historyStore(state => state.getHistoryItems)

    const [isOnTop, setIsOnTop] = React.useState(true)
    const [pointsPosition, setPointsPosition] = React.useState(0)
    const [belowPoints, setBelowPoints] = React.useState(false)
    const [isPointsSheetOpen, setIsPoinsSheetOpen] = React.useState(false)
    const [isBottomInView, setIsBottomInView] = React.useState(false)

    const animationConfigs = useBottomSheetTimingConfigs({
        duration: 500,
      });
    
    React.useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
        getHistoryItems()
    }, [])

    const handleSwipe = () => {
        if(currentProduct.id){
            navigation.navigate('Product', currentProduct)
        }
    }

    const handleSwitchBottomSheet = (value) => {
        if(value){
            bottomSheetRef.current.snapToIndex(0)
        }else{
            bottomSheetRef.current.close()
        }
    }
    
    const handleScroll = (e) => {
            handleSwitchBottomSheet(false)
            if(e.nativeEvent.contentOffset.y > 35){
                setIsOnTop(false)
            }else{
                setIsOnTop(true)
            }
            if(e.nativeEvent.contentOffset.y > pointsPosition){
                setBelowPoints(true)
            }else{
                setBelowPoints(false)
            }
    }

    const bottomSheetRef = React.useRef()


 
    return (
        <View style={{flex: 1, backgroundColor: isDarkMode ? "#3b3b3b" : '#FCFCFC'}} >
            <ScrollView showsVerticalScrollIndicator={false}
             stickyHeaderIndices={[0]} ref={scrollViewRef} onScroll={handleScroll}>
                <Nav scrollViewRef={scrollViewRef} isOnTop={isOnTop} belowPoints={belowPoints}/>
                <Points setPointsPosition={setPointsPosition} handleSwitchBottomSheet={handleSwitchBottomSheet}/>
                <View style={styles(isDarkMode).content}>
                    <Categories />
                    <GestureRecognizer style={styles(isDarkMode).content} onSwipeLeft={handleSwipe} config={{directionalOffsetThreshold: 150, velocityThreshold: 0.6}}>
                    <Produsts />
                    {historyItems.length > 0 && <History isBottomInView={isBottomInView} setIsBottomInView={setIsBottomInView} />}
                    <Settings isBottomInView={isBottomInView} setIsBottomInView={setIsBottomInView} />
                    <Text style={styles(isDarkMode).copyRight}>&copy; 2023 Just Vape</Text>
                    </GestureRecognizer>
                </View>
            </ScrollView>  
            <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            snapPoints={['40%', '66%']}
            enablePanDownToClose={true}
            animationConfigs={animationConfigs}
            backgroundStyle={{backgroundColor: isDarkMode ? "#2e2e2e" : '#F1F1F1',}}
            >
              <PointsInstruction handleSwitchBottomSheet={handleSwitchBottomSheet}/>
            </BottomSheet>      
        </View>
    )


}


export default HomeScreen