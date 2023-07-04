import {StyleSheet, Dimensions} from 'react-native'
const { height, width } = Dimensions.get('window');

export default styles = (isDarkMode) => StyleSheet.create({
    wrapper: {
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        marginTop: 20,
    },
    title: {
        marginVertical: 20,
        
        fontSize: 24,
        fontWeight: 700,
        color: isDarkMode ? "#fff" : "#000",

   },
   historyItemsContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',

   },
   showMoreBtn: {
    marginHorizontal: '15%',
    marginTop: 40,
    width: '70%',
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#34A3CF',
    paddingVertical: 10,
  },
  showMoreBtnText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
  }
})