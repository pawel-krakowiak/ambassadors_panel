import {StyleSheet} from 'react-native'

export default styles = (isDarkMode) => StyleSheet.create({
    wrapper: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: isDarkMode ? "#3b3b3b" : '#FCFCFC',
    },
})