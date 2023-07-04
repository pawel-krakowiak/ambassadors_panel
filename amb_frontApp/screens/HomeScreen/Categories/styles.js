import {StyleSheet, Dimensions} from 'react-native'
const { height, width } = Dimensions.get('window');

export default styles = (isDarkMode) => StyleSheet.create({
    wrapper: {
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 10,
        
    },
    title: {
         marginVertical: 20,
         fontSize: 24,
         fontWeight: 700,
         color: isDarkMode ? '#ffffff' : "#000"
    },
    categoriesWrapper: {
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 1,
        height: width > 700 ? 50 : 40,
    },
    categoriesItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-around",
        paddingVertical: width > 700 ? 10 : 6,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginRight: 20,
    },
    categoriesItemImg: {
        width: width > 700 ? 30 : 20,
        height: width > 700 ? 30 : 20,
        marginRight: 20,
    },
})