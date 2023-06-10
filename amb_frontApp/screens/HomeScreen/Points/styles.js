import {StyleSheet} from 'react-native'

export default styles = (isDarkMode) => StyleSheet.create({
    wrapper: {
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
    },
    topContainer: {
        width: '100%',
        height: 50,
        backgroundColor: "#34A3CF",
        padding: 20,
        paddingTop: 75,
    },
    title: {
        fontSize: 24,
        fontWeight: 700,
        color: "#fff",
   },
   bottomContainer: {
        width: "100%",
        display: 'flex',
        height: 200,
   },
   pointsContainer: {
        width: '90%',
        marginHorizontal: '5%',
        transform: [{translateY: -50}],
        height: 150, 
        position: "relative",

   },
   pointsContent: {
          width: '100%',
          height: 150,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          left: 0,
          top: 0,
          backgroundColor: isDarkMode ? "#2e2e2e" : '#F1F1F1',
          borderRadius: 20,
          overflow: 'hidden',
   },

   pointsAmount: {
        fontSize: 48,
        color: "#34A3CF",
        fontWeight: 700,
   },
   pointsDesc: {
        fontSize: 12,
        color: '#616161',
        marginTop: 12,
   },
   bottomBtn: {
        width: '90%',
        paddingVertical: 10,
        paddingHorizontal: 15,
        height: 60,
        marginHorizontal: '5%',
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: isDarkMode ? "#2e2e2e" : '#F1F1F1',
        transform: [{translateY: -25}],
   },
   bottomBtnTitle: {
        fontWeight: 700,
        fontSize: 17,
        color: isDarkMode ? "#fff" : '#000',
   },
   bottomBtnDesc: {
        fontSize: 12,
        color: isDarkMode ? "#fff" : '#000',
   },
   bottomBtnDescContainer: {
        height: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
   },
   bottomBtnIconContainer: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
   },
})