import {StyleSheet, StatusBar} from 'react-native'

export default styles = (isDarkMode) => StyleSheet.create({
    wrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: "#34A3CF",
        paddingBottom: 10,
        paddingHorizontal: 20,
        paddingTop: StatusBar.currentHeight + 20,
        // borderBottomEndRadius: 15,
        // borderBottomLeftRadius: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: 700,
        color: "#fff",
   },
   descWrapper: {
        overflow: 'hidden',
   }
})