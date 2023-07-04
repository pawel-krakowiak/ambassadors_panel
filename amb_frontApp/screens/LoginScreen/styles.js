import {StyleSheet, Dimensions} from 'react-native'
const { height, width } = Dimensions.get('window');

export default styles = StyleSheet.create({
    content: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    contentContainer: {
        position: 'relative',
        top: 0,
        left: 0,
        width: width,
        height: height,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    logoImg: {
        marginTop: width > 600 ? '20%' : '30%',
    },
    formContainer: {
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
    },
    logInTitle: {
        color: 'white',
        textAlign: 'left',
        fontSize: width > 700 ? 45 : 28,
        fontWeight: 400,
    },
    navContainer: {
        width: '80%',
        alignItems: 'flex-start',
        position: 'absolute',
        left: '10%',
        bottom: width < 650 ? '5%' : '10%',
    },
    loginBtn: {
        padding: 12,
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 10,
    },
    loginBtn2: {
        padding: 12,
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: '#9e9e9e',
        width: '35%',
        marginLeft: '5%',
    },
    loginBtnText: {
        fontSize: 20,
        color: 'white',
    },
    resetContainer: {
        width: '100%',
        height: 20,
        overflow: 'hidden',
        marginBottom: 10,
    },
    resetContainerTxt: {
        fontSize: 14,
        textAlign: 'center',
        color: '#b5b5b5'
    },
    btnContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        overflow: 'hidden',
    },
    termsBtn: {
        position: 'absolute',
        top: '7.5%',
        right: '5%',
    },
    backBtn: {
        position: 'absolute',
        top: '7.5%',
        right: '5%',
        // right: '15%',
    },
    inputContainer: {
        width: '80%',
        padding: 12,
        borderColor: '#b5b5b5',
        borderStyle: 'solid',
        borderWidth: 2,
        borderRadius: 10,
        marginTop: '15%',
    },
    inputContainer2: {
        width: '80%',
        padding: 12,
        borderColor: '#b5b5b5',
        borderStyle: 'solid',
        borderWidth: 2,
        borderRadius: 10,
        marginTop: '5%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    input: {
        color: '#b5b5b5',
        width: '85%',
    },
    errorContainer: {
        width: '80%',
        marginTop: '5%',
    },
    errorTxt: {
        color: '#eb4034',
        textAlign: 'center',
        fontSize: 14,
    }
})