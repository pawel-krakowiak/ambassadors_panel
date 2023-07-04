import {StyleSheet, Dimensions} from 'react-native'
const { height, width } = Dimensions.get('window');

export default styles = (isDarkMode) => StyleSheet.create({
    wrapper: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: isDarkMode ? "#3b3b3b" : '#FCFCFC',
    },
    imgContainer: {
        width: '100%',
        height: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: "center",
    },
    categoriesItemImg: {
        maxWidth: '80%',
        resizeMode: 'contain',
    },
    txtContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    title: {
        width: '90%',
        fontWeight: 700,
        marginVertical: 20,
        fontSize: width > 600 ? 36 : 24,
        textAlign: 'center',
        color: isDarkMode ? "#fff" : '#000',
    },
    desc:{
        width: '90%',
        textAlign: 'center',
        fontSize: width > 600 ? 18 : 14,
        color: isDarkMode ? "#fff" : '#000',
    },
    buttonsContainer: {
        width: '100%',
        height: '15%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    updateBtn: {
        width: '60%',
        padding: 18,
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: '#34A3CF',
    },
    updateBtnTxt: {
        color: '#fff',
        fontWeight: 700,
        fontSize: width > 600 ? 18 : 14,
    },
     backBtnContainer: {
        backgroundColor: isDarkMode ? "#3b3b3b" : '#FCFCFC',
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