import {StyleSheet} from 'react-native'

export default styles = (isDarkMode) => StyleSheet.create({
    wrapper: {
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        marginTop: 20,
    },
    topContainer: {
        width: "100%",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 700,
        color: isDarkMode ? '#ffffff' : "#000"
   },
   sortContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
   },
   sortTitle: {
        fontSize: 20,
        color: '#8E8E8E',
   },
   sortValue: {
        fontSize: 20,
        color: isDarkMode ? '#ffffff' : "#000"
   },
   productsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: "flex-start",
        flexWrap: "wrap",
        width: "100%",
   },
   noItems: {
     color: '#8E8E8E',
     fontWeight: 700,
     fontSize: 18,
     width: '70%',
     marginHorizontal: '15%',
     textAlign: 'center',
     marginTop: 20,
   }, 
})