import * as React from 'react';
import 'react-native-reanimated'
import { MotiView, MotiText } from 'moti'
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import styles from './styles';
import productsStore from '../../../zustand/products';
import * as Icons from "react-native-heroicons/solid";
import InViewPort from "@coffeebeanslabs/react-native-inviewport";
import optionsStore from '../../../zustand/options';
import ProductsItem from './ProductsItem/ProductsItem';

const Produsts = () => {
    const sortedItems = productsStore(state => state.sortedItems)
    const allItems = productsStore(state => state.allItems)
    const searchValue = productsStore(state => state.searchValue)
    const isLoaded = productsStore(state => state.isLoaded)
    const isDarkMode = optionsStore(state => state.isDarkMode)
    const [sortByHighest, setSortByHighest] = React.useState(true)
    const [isInView, setIsInView] = React.useState(false)
    const [productsList, setProductsList] = React.useState([])

    React.useEffect(() => {
        let newItems = [...sortedItems]
        
        newItems?.filter(i => {
            if(searchValue.length > 0){
                if(i.name.includes(searchValue)){
                    return i
                }
            }else{
                return i
            }
        })
        
        if(newItems.length > 0 && searchValue.length > 0){
            newItems?.filter(i => {
                if(i.name.includes(searchValue)){
                    return i
                }
            })
        }

        newItems.sort((a, b) => {
            if(sortByHighest){
                return  b.points_price - a.points_price 
            }else{
                return  a.points_price - b.points_price 
            }
        })

        setProductsList(newItems)
    }, [sortedItems, sortByHighest])



    return (
        <View style={styles(isDarkMode).wrapper}>
            <InViewPort onChange={(isVisible) => isVisible && setIsInView(true)}>
                <View style={styles(isDarkMode).topContainer}>
                    <MotiText from={{translateY: 20,  opacity: 0}} 
                    animate={{translateY: isInView ? 0 : 20, opacity: isInView ? 1 : 0}}  
                    style={styles(isDarkMode).title}>Nagrody</MotiText>
                    <MotiView from={{translateY: 20,  opacity: 0,}} 
                    animate={{translateY: 0,  opacity: 1}} style={styles(isDarkMode).sortContainer}>
                        <Text style={styles(isDarkMode).sortTitle}>Sortuj:</Text>
                        <TouchableWithoutFeedback onPress={() => setSortByHighest(!sortByHighest)}>
                            <View style={styles(isDarkMode).sortContainer}> 
                                <Text style={styles(isDarkMode).sortValue}> Punkty</Text>
                                <MotiView from={{rotate: '0deg'}} 
                                animate={{rotate: sortByHighest ? '0deg' : '180deg'}}>
                                    <Icons.ChevronDownIcon height={30} color={isDarkMode ? '#ffffff' : "#000"}/>
                                </MotiView>
                            </View>
                        </TouchableWithoutFeedback>
                    </MotiView>
                </View>
            </InViewPort>
            {isLoaded && <View style={styles(isDarkMode).productsContainer}>
                {productsList.length > 0 ? 
                    productsList?.map((item, index) => <ProductsItem item={item} index={index}  key={`${index}, Product${item.name}`}/>) : 
                    <MotiText style={styles(isDarkMode).noItems}from={{scale: 0.5, opacity: 0.3}} animate={{scale: 1, opacity: 1}}>
                        {allItems.length > 0 ? "Brak produktów spełniających wymagania" : "Brak produktów w bazie" }
                    </MotiText>
                }
            </View>}
        </View>
    )
}

export default Produsts