import {StyleSheet} from 'react-native'

export default styles = StyleSheet.create({
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
   },
   historyItemsContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
   },
   historyItem: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 10,
   },
   historyItemImgContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#F1F1F1',
        padding: 5,
        height: 60,
        width: 50,
   },
   historyItemImg: {
        width: '100%',
        aspectRatio: '1 /1 '
   },
   historyItemDescriptionContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        marginLeft: 10,
   },
   historyItemTitle: {
        fontWeight: 700,
        fontSize: 18,
   },
   historyItemCost: {
        color: '#34A3CF',
        fontSize: 14,
   },
   historyItemDate: {
        color: "gray",
        fontSize: 10,
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