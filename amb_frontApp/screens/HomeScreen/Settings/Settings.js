import * as React from 'react';
import 'react-native-reanimated'
import { MotiView, MotiText, AnimatePresence } from 'moti'
import { View, Text, TextInput, TouchableWithoutFeedback, Linking, Switch} from 'react-native';
import styles from './styles';
import * as Icons from "react-native-heroicons/solid";
import * as Icons2 from "react-native-heroicons/outline";
import InViewPort from "@coffeebeanslabs/react-native-inviewport";
import userStore from '../../../zustand/user';
import productsStore from '../../../zustand/products';
import optionsStore from '../../../zustand/options';
import { useNavigation } from '@react-navigation/native';

const Settings = ({isBottomInView, setIsBottomInView}) => {  
    const navigation = useNavigation()
    const logOut = userStore(state => state.logOut)
    const isDarkMode = optionsStore(state => state.isDarkMode)
    const setIsDarkMode = optionsStore(state => state.setIsDarkMode)
    const getUser = userStore(state => state.getUser)
    const user = userStore(state => state.user)
    const getItems = productsStore(state => state.getItems)

    const [isMsgEditing, setIsMsgEditing] = React.useState(false)
    const [isShowInfo, setIsShowInfo] = React.useState(false)
    const [isMsgSend, setIsMsgSend] = React.useState(false)
    const [inputValue, setInputValue] = React.useState("")
    const [isRefreshlicked, setIsRefreshClicked] = React.useState(false)


    React.useEffect(() => {
        setInputValue("")
    }, [isMsgEditing])

    const handleSendMsg = () => {
        if(inputValue.length > 0) {
            ///send msg
            setIsMsgSend(true)
            setTimeout(() => {
                setInputValue("")
                setIsMsgEditing(false)
                setIsMsgSend(false)
            }, 300)
        }
    }
    
    const handleRateApp = async () => {
        const url = "https://www.youtube.com/watch?v=DsC8jQXRbQE"

        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        }
    }

    const handleRefreshData = () => {
        getUser(navigation)
        getItems(user)
        setIsRefreshClicked(true)
        setTimeout(() => {setIsRefreshClicked(false)}, 250)
    }

    return (
        <View style={styles(isDarkMode).wrapper}>
            <InViewPort onChange={(isVisible) => isVisible && setIsBottomInView(true)}>
            <MotiView style={styles(isDarkMode).optionContainer}
            from={{translateY: 20, opacity: 0}} 
            animate={{translateY: isBottomInView ? 0 : 20, opacity: isBottomInView ? 1 : 0}} >
                <Text style={styles(isDarkMode).optionTitle}>Oceń aplikacje</Text>
                <TouchableWithoutFeedback onPress={handleRateApp}>
                    <View style={styles(isDarkMode).rateAppContainer}>
                        <Icons.StarIcon color="#FFD600" size={16} />
                        <Text style={{...styles(isDarkMode).optionTxt, fontSize: 16, marginLeft: 3, }}>5/5</Text>
                        <Icons.ChevronDownIcon color={isDarkMode ? "#fff" : "#000"} size={16} />
                    </View>
                </TouchableWithoutFeedback>
            </MotiView>
            <MotiView style={styles(isDarkMode).optionContainer}
            from={{translateY: 20, opacity: 0}} 
            animate={{translateY: isBottomInView ? 0 : 20, opacity: isBottomInView ? 1 : 0}} >
                <Text style={styles(isDarkMode).optionTitle}>Tryb nocny</Text>
                <Switch
                    trackColor='#D9D9D9'
                    thumbColor='#34A3CF'
                    ios_backgroundColor="#D9D9D9"
                    onValueChange={setIsDarkMode}
                    value={isDarkMode}
                />
            </MotiView>
            {/* Wysyłanie wiadomości */}
            {/* <MotiView style={styles(isDarkMode).msgContainer} 
             from={{height: 60, translateY: 20, opacity: 0}} 
             animate={{translateY: isBottomInView ? 0 : 20, opacity: isBottomInView ? 1 : 0, 
             height: isMsgEditing ? 160 : 60}}>
                <MotiView style={{...styles(isDarkMode).optionContainer, marginTop: 0}}>
                    <Text style={{fontSize: 16, fontWeight: 700}}>Zadaj pytanie</Text>
                    <AnimatePresence>
                        {!isMsgEditing && <TouchableWithoutFeedback onPress={() => setIsMsgEditing(true)}>
                            <MotiView style={styles(isDarkMode).btnContainer} 
                            from={{translateY: -20, opacity: 0}}
                            animate={{translateY:  0, opacity:1}}
                            exit={{translateY: -20, opacity: 0}}>
                                <Icons2.ChatBubbleBottomCenterTextIcon color="#34A3CF" size={25}/>
                            </MotiView>
                        </TouchableWithoutFeedback> } 
                    </AnimatePresence>
                    <AnimatePresence>
                        {isMsgEditing && <TouchableWithoutFeedback onPress={() => setIsMsgEditing(false)}>
                            <MotiView style={{...styles(isDarkMode).btnContainer, right: 70}} 
                            from={{translateY: 20, opacity: 0}}
                            animate={{translateY:  0, opacity:1}}
                            exit={{translateY: 20, opacity: 0}}>
                                <Icons2.TrashIcon color="#34A3CF" size={25}/>
                            </MotiView>
                        </TouchableWithoutFeedback> } 
                    </AnimatePresence>
                    <AnimatePresence>
                        {isMsgEditing && <TouchableWithoutFeedback onPress={handleSendMsg}>
                            <MotiView style={styles(isDarkMode).btnContainer} 
                            from={{translateY: 20, opacity: 0}}
                            animate={{translateY:  0, opacity:1}}
                            exit={{translateY: 20, opacity: 0}}>
                                <MotiView from={{translateX: 0}} animate={{translateX: isMsgSend ? 150 : 0}}>
                                    <Icons2.PaperAirplaneIcon color="#34A3CF" size={25}/>
                                </MotiView>
                            </MotiView>
                        </TouchableWithoutFeedback> } 
                    </AnimatePresence>
                </MotiView>
                <TextInput 
                    placeholder='Wpisz treść wiadomości' 
                    keyboardType='default'
                    style={styles(isDarkMode).input}
                    placeholderTextColor="#b5b5b5"
                    value={inputValue}
                    multiline={true}
                    textAlignVertical={'top'}
                    numberOfLines={5}
                    onChangeText={(e) => setInputValue(e)}
                />
            </MotiView> */}
            <MotiView style={{...styles(isDarkMode).optionContainer}}
            from={{translateY: 20, opacity: 0}} 
            animate={{translateY: isBottomInView ? 0 : 20, opacity: isBottomInView ? 1 : 0}} >
                <Text style={styles(isDarkMode).optionTitle}>Odśwież dane</Text>
                <TouchableWithoutFeedback  onPress={handleRefreshData}>
                    <View style={styles(isDarkMode).btnContainer}>
                        <MotiView style={styles(isDarkMode).settingsBtn} from={{scale: 1, rotate: '0deg'}} 
                        animate={{scale: isRefreshlicked ? 0.75 : 1, rotate: isRefreshlicked ? '-30deg' : '0deg'}}
                        transition={{
                            type: 'timing',
                            duration: 200,
                        }}>
                            <Icons.ArrowPathIcon size={25} color="#34A3CF"/>
                        </MotiView>
                    </View>
                </TouchableWithoutFeedback>
            </MotiView>
            <MotiView style={styles(isDarkMode).infoContainer} 
             from={{height: 60, translateY: 20, opacity: 0}} 
             animate={{translateY: isBottomInView ? 0 : 20, opacity: isBottomInView ? 1 : 0, 
             height: isShowInfo ? 200 : 60}}>
                <MotiView style={{...styles(isDarkMode).optionContainer, marginTop: 0}}>
                    <Text style={styles(isDarkMode).optionTitle}>Więcej informacji</Text>
                    <AnimatePresence>
                        {!isShowInfo && <TouchableWithoutFeedback onPress={() => setIsShowInfo(true)}>
                            <MotiView style={styles(isDarkMode).btnContainer} 
                            from={{translateY: -20, opacity: 0}}
                            animate={{translateY:  0, opacity:1}}
                            exit={{translateY: -20, opacity: 0}}>
                                <Icons2.QuestionMarkCircleIcon color="#34A3CF" size={25}/>
                            </MotiView>
                        </TouchableWithoutFeedback> } 
                    </AnimatePresence>
                    <AnimatePresence>
                        {isShowInfo && <TouchableWithoutFeedback onPress={() => setIsShowInfo(false)}>
                            <MotiView style={{...styles(isDarkMode).btnContainer}} 
                            from={{translateY: 20, opacity: 0}}
                            animate={{translateY:  0, opacity:1}}
                            exit={{translateY: 20, opacity: 0}}>
                                <Icons.XMarkIcon color="#34A3CF" size={25}/>
                            </MotiView>
                        </TouchableWithoutFeedback> } 
                    </AnimatePresence>
                </MotiView>
                <View style={styles(isDarkMode).infoContainerContent}>
                    <View style={styles(isDarkMode).infoItem}>
                        <Icons.UserIcon size={20} color="#616161"/>
                        <Text style={styles(isDarkMode).infoItemValue}>{user.name} {user.surname}</Text>
                    </View>
                    <View style={styles(isDarkMode).infoItem}>
                        <Icons.EnvelopeIcon size={20} color="#616161"/>
                        <Text style={styles(isDarkMode).infoItemValue}>{user.email}</Text>
                    </View>
                    <View style={styles(isDarkMode).infoItem}>
                        <Icons.MapPinIcon size={20} color="#616161"/>
                        <Text style={styles(isDarkMode).infoItemValue}>{user.location_name}</Text>
                    </View>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('Terms')}>
                        <View style={styles(isDarkMode).infoItem}>
                                <Icons.ClipboardIcon size={20} color="#616161"/>
                                <Text style={{...styles(isDarkMode).infoItemValue, textDecorationLine: "underline"}}>Regulamin oraz klauzula RODO</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    {user.is_staff && 
                        <View style={styles(isDarkMode).infoItem}>
                            <Icons.ClipboardIcon size={20} color="#616161"/>
                            <Text style={{...styles(isDarkMode).infoItemValue, color: "#22ab03"}}>Obsługa sklepu</Text>
                        </View>}
                </View>
            </MotiView>
            <MotiView style={{...styles(isDarkMode).optionContainer}}
            from={{translateY: 20, opacity: 0}} 
            animate={{translateY: isBottomInView ? 0 : 20, opacity: isBottomInView ? 1 : 0}} >
                <Text style={styles(isDarkMode).optionTitle}>Wyloguj się</Text>
                <TouchableWithoutFeedback onPress={() => logOut(navigation)}>
                    <View style={styles(isDarkMode).btnContainer}>
                        <Icons.ArrowRightOnRectangleIcon color="#34A3CF" size={25}/>
                    </View>
                </TouchableWithoutFeedback>
            </MotiView>
            </InViewPort>
        </View>
    )
}

export default Settings