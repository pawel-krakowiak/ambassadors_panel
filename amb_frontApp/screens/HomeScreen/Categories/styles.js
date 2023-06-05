import {StyleSheet} from 'react-native'

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
        height: 40,
    },
    categoriesItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-around",
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginRight: 20,
    },
    categoriesItemImg: {
        width: 20,
        height: 20,
        marginRight: 20,
    },
})