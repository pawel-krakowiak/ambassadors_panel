import {StyleSheet} from 'react-native'

export default styles = StyleSheet.create({
    wrapper: {
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        marginTop: 30,
    },
    optionContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 10,
        backgroundColor: '#F1F1F1',
        marginTop: 10,
        height: 60,
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        overflow: 'hidden',
        position: 'relative'
    },
    btnContainer: {
        position: 'absolute',
        height: '70%',
        aspectRatio: "1 /1",
        backgroundColor: '#D9D9D9',
        borderRadius: 1000,
        justifyContent: 'center',
        alignItems: 'center',
        right: 20,
        overflow: 'hidden'
    },
    msgContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        borderRadius: 10,
        backgroundColor: '#F1F1F1',
        marginVertical: 10,
    },
    input: {
        flex: 1,
        padding: 6,
    },
    rateAppContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
})