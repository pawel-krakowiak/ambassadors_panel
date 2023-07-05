import {StyleSheet, Dimensions} from 'react-native'
const { height, width } = Dimensions.get('window');

export default styles = (isDarkMode) => StyleSheet.create({
    backBtnContainer: {
        backgroundColor: isDarkMode ? "#2e2e2e" : '#F1F1F1',
        width: '100%',
        height: '10%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingRight: '5%',

    },
    backBtn: {
        height: '50%',
        aspectRatio: '1/1',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:  isDarkMode ? "#3b3b3b" : '#B4B4B4',
    },
})