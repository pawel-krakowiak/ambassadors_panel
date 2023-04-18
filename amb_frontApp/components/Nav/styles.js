import {StyleSheet, StatusBar} from 'react-native'

export default styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: "#34A3CF",
        padding: 15,
        paddingTop: StatusBar.currentHeight + 5,
        borderBottomEndRadius: 15,
        borderBottomLeftRadius: 15,
    },
    topNavContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    navLeft: {
        width: '75%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    helloText: {
        fontSize: 14,
        color: 'white',
    },  
    PointsText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 700, 
    },  
    PointsTextBlack: {
        fontSize: 14,
        color: 'black',
        fontWeight: 700, 
    },  
    navRight: {
        width: '25%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    navLogo: {
        height: 50,
        width: 50,
    },
    bottomNavContainer: {
        marginTop: 20,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    searchContainer: {
        width: '75%',
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: '#F4F4F4',
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 15,
    },
    searchInput: {
        width: '90%',
        marginLeft: 5,
    },
    bottomNavRight: {
        width: '25%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    settingsBtnContainer: {
        height: 50,
        width: 50,
        backgroundColor: '#F4F4F4',
        borderRadius: 15,
    },
    settingsBtn: {
        height: 50,
        width: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
})