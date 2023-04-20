import * as React from 'react';
import 'react-native-reanimated'
import { MotiView, MotiText, AnimatePresence } from 'moti'
import { View, Text, TextInput, TouchableWithoutFeedback, Linking, Switch} from 'react-native';
import styles from './styles';
import * as Icons from "react-native-heroicons/solid";
import * as Icons2 from "react-native-heroicons/outline";
import InViewPort from "@coffeebeanslabs/react-native-inviewport";
import userStore from '../../../zustand/user';
import { useNavigation } from '@react-navigation/native';

const Settings = () => {  
    const navigation = useNavigation()
    const [isInView, setIsInView] = React.useState(false)
    const [isMsgEditing, setIsMsgEditing] = React.useState(false)
    const [isMsgSend, setIsMsgSend] = React.useState(false)
    const [inputValue, setInputValue] = React.useState("")
    const logOut = userStore(state => state.logOut)
    const isDarkMode = userStore(state => state.isDarkMode)
    const setIsDarkMode = userStore(state => state.setIsDarkMode)


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

    return (
        <View style={styles.wrapper}>
            <InViewPort onChange={(isVisible) => isVisible && setIsInView(true)}>
            <MotiView style={styles.optionContainer}
            from={{translateY: 20, opacity: 0}} 
            animate={{translateY: isInView ? 0 : 20, opacity: isInView ? 1 : 0}} >
                <Text style={{fontSize: 16, fontWeight: 700}}>Oceń aplikacje</Text>
                <TouchableWithoutFeedback onPress={handleRateApp}>
                    <View style={styles.rateAppContainer}>
                        <Icons.StarIcon color="#FFD600" size={16} />
                        <Text style={{fontSize: 16, marginLeft: 3}}>5/5</Text>
                        <Icons.ChevronDownIcon color="black" size={16} />
                    </View>
                </TouchableWithoutFeedback>
            </MotiView>
            <MotiView style={styles.optionContainer}
            from={{translateY: 20, opacity: 0}} 
            animate={{translateY: isInView ? 0 : 20, opacity: isInView ? 1 : 0}} >
                <Text style={{fontSize: 16, fontWeight: 700}}>Tryb nocny</Text>
                <Switch
                    trackColor='#D9D9D9'
                    thumbColor='#34A3CF'
                    ios_backgroundColor="#D9D9D9"
                    onValueChange={setIsDarkMode}
                    value={isDarkMode}
                />
            </MotiView>
            <MotiView style={styles.msgContainer} 
             from={{height: 60, translateY: 20, opacity: 0}} 
             animate={{translateY: isInView ? 0 : 20, opacity: isInView ? 1 : 0, 
             height: isMsgEditing ? 160 : 60}}>
                <MotiView style={{...styles.optionContainer, marginTop: 0}}>
                    <Text style={{fontSize: 16, fontWeight: 700}}>Zadaj pytanie</Text>
                    <AnimatePresence>
                        {!isMsgEditing && <TouchableWithoutFeedback onPress={() => setIsMsgEditing(true)}>
                            <MotiView style={styles.btnContainer} 
                            from={{translateY: -20, opacity: 0}}
                            animate={{translateY:  0, opacity:1}}
                            exit={{translateY: -20, opacity: 0}}>
                                <Icons2.ChatBubbleBottomCenterTextIcon color="#34A3CF" size={25}/>
                            </MotiView>
                        </TouchableWithoutFeedback> } 
                    </AnimatePresence>
                    <AnimatePresence>
                        {isMsgEditing && <TouchableWithoutFeedback onPress={() => setIsMsgEditing(false)}>
                            <MotiView style={{...styles.btnContainer, right: 70}} 
                            from={{translateY: 20, opacity: 0}}
                            animate={{translateY:  0, opacity:1}}
                            exit={{translateY: 20, opacity: 0}}>
                                <Icons2.TrashIcon color="#34A3CF" size={25}/>
                            </MotiView>
                        </TouchableWithoutFeedback> } 
                    </AnimatePresence>
                    <AnimatePresence>
                        {isMsgEditing && <TouchableWithoutFeedback onPress={handleSendMsg}>
                            <MotiView style={styles.btnContainer} 
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
                    style={styles.input}
                    placeholderTextColor="#b5b5b5"
                    value={inputValue}
                    multiline={true}
                    textAlignVertical={'top'}
                    numberOfLines={5}
                    onChangeText={(e) => setInputValue(e)}
                />
            </MotiView>
            <MotiView style={{...styles.optionContainer, marginTop: 0}}
            from={{translateY: 20, opacity: 0}} 
            animate={{translateY: isInView ? 0 : 20, opacity: isInView ? 1 : 0}} >
                <Text style={{fontSize: 16, fontWeight: 700}}>Wyloguj się</Text>
                <TouchableWithoutFeedback onPress={() => logOut(navigation)}>
                    <View style={styles.btnContainer}>
                        <Icons.ArrowRightOnRectangleIcon color="#34A3CF" size={25}/>
                    </View>
                </TouchableWithoutFeedback>
            </MotiView>
            </InViewPort>
        </View>
    )
}

export default Settings