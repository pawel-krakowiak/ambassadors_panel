import {StyleSheet} from 'react-native'

export default styles = (isDarkMode) => StyleSheet.create({
    productItem: {
        width: '45%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',     
   },
   productItemImgContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 6,  
        backgroundColor: isDarkMode ? "#2e2e2e" : '#F1F1F1',
        borderRadius: 15,
   },
   productItemImg: {
        width: '80%',
        aspectRatio: '1 / 2',
        
   },
   productItemTitle: {
        fontSize: 16,
        color: isDarkMode ? '#ffffff' : "#000",
   },
   productItemCost: {
        color: '#34A3CF',
        fontWeight: 700,
        fontSize: 18,
   },
   productItemDescriptionContainer: {
        width: '100%',
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop: 10,
   },
   productItemDescriptionLeft: {
        paddingLeft: 5,
        width: '75%',
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
   },
   productItemBtn: {
        width: '20%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        aspectRatio: '1 / 1',
        backgroundColor: '#34A3CF',
        borderRadius: 5,

   },
})