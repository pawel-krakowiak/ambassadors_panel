import {StyleSheet} from 'react-native'

export default styles = (isDarkMode) => StyleSheet.create({
    wrapper: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    title: {
        width: '100%',
        textAlign: 'center',
        fontWeight: 700,
        fontSize: 18,
        marginTop: 10,
        color: isDarkMode ? "#fff" : "#000",
    },
    content: {
        width: '100%',
        height: '50%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    btn: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
    },
    btnTxt: {
        color: '#8E8E8E',
        fontSize: 14,
    },
    itemContainer: {
        width: '80%',
        marginHorizontal: '5%',
        height: '30%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
    },
    iconContainer: {
        height: '70%',
        aspectRatio: '1/1',
        borderRadius: 1000,
        backgroundColor: isDarkMode ? "#3b3b3b" : "#fff",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemDesc: {
        marginLeft: 15, 
        flexGrow: 1,
        fontSize: 16,
        color: isDarkMode ? "#fff" : "#000",
    },
    itemIcon: {
        height: '80%',
        width: '80%',
    }
})