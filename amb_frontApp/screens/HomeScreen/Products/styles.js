import {StyleSheet} from 'react-native'

export default styles = StyleSheet.create({
    wrapper: {
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        marginTop: 20,
    },
    topContainer: {
        width: "100%",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 700,
   },
   sortContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
   },
   sortTitle: {
        fontSize: 20,
        color: '#8E8E8E',
   },
   sortValue: {
        fontSize: 20,
        color: 'black',
   },
   productsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: "flex-start",
        flexWrap: "wrap",
        width: "100%",
   },
   productItem: {
        width: '45%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',     
   },
   productItemImgContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 6,  
        backgroundColor: '#F1F1F1',
        borderRadius: 15,
   },
   productItemImg: {
        width: '80%',
        aspectRatio: '1 / 2',
        
   },
   productItemTitle: {
        fontSize: 16,
   },
   productItemCost: {
        color: '#34A3CF',
        fontWeight: 700,
        fontSize: 18,
   },
   productItemDescriptionContainer: {
        width: '100%',
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop: 10,
   },
   productItemDescriptionLeft: {
        paddingLeft: 5,
        width: '75%',
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
   },
   productItemBtn: {
        width: '20%',
        aspectRatio: '1 / 1',
        backgroundColor: '#34A3CF',
        borderRadius: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
   },
   noItems: {
     color: '#8E8E8E',
     fontWeight: 700,
     fontSize: 18,
     width: '70%',
     marginHorizontal: '15%',
     textAlign: 'center',
     marginTop: 20,
   }, 
})