import {StyleSheet, Dimensions} from 'react-native'
const { height, width } = Dimensions.get('window');

export default styles = (isDarkMode) => StyleSheet.create({
    historyItemsContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
   },
   historyItem: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 10,        
   },
   historyItemImgContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: isDarkMode ? "#2e2e2e" : '#F1F1F1',
        padding: 5,
        height: 60,
        width: 50,
   },
   historyItemImg: {
        width: '100%',
        aspectRatio: '1 /1 '
   },
   historyItemDescriptionContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        marginLeft: 10,
   },
   historyItemTitle: {
        color: isDarkMode ? "#fff" : "#000",
        fontWeight: 700,
        fontSize: 18,
   },
   historyItemCost: {
        color: '#34A3CF',
        fontSize: 14,
   },
   historyItemDate: {
     color: isDarkMode ? "#fff" : "#000",
        fontSize: 10,
   },

})