import {StyleSheet} from 'react-native'

export default styles = (isDarkMode) => StyleSheet.create({
    content: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: 10,
    },
    copyRight: {
        width: '100%',
        textAlign: 'center', 
        color: 'gray',
        marginTop: 20,
    }
})