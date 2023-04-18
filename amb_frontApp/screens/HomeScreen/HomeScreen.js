import * as React from 'react';
import 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native';
import { View, ScrollView } from 'react-native';
import Nav from '../../components/Nav/Nav.js';
import styles from './styles';
import Categories from './Categories/Categories.js';
import Produsts from './Products/Produsts.js';
import History from './History/History.js';

const HomeScreen = () => {
    const navigation = useNavigation()

    React.useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])

    return (
        <View style={{flex: 1}}>
            <ScrollView showsVerticalScrollIndicator={false}
             stickyHeaderIndices={[0]}>
                <Nav />
                <View style={styles.content}>
                    <Categories />
                    <Produsts />
                    <History />
                </View>
            </ScrollView>         
        </View>
    )


}


export default HomeScreen