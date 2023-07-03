import * as React from 'react';
import 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableWithoutFeedback, TextInput, useColorScheme, Linking, Dimensions } from 'react-native';
import { MotiImage, MotiView, MotiText, AnimatePresence } from 'moti';
import styles from './styles';
import Background from './Background/Background';
import * as Icons from "react-native-heroicons/solid";
import * as Icons2 from "react-native-heroicons/outline";
import userStore from '../../zustand/user';
import BottomSheet, { useBottomSheetTimingConfigs } from '@gorhom/bottom-sheet';
import optionsStore from '../../zustand/options.js';

const LoginScreen = () => {
    const navigation = useNavigation()
    const loginUser = userStore(state => state.loginUser)
    const verifyUser = userStore(state => state.verifyUser)
    const checkDarkMode = optionsStore(state => state.checkDarkMode)
    const theme = useColorScheme();
    const { height, width } = Dimensions.get('window');
    const [responsiveMarginTop, setResponsiveMarginTop] = React.useState(0)

    React.useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
        checkDarkMode(theme)

        console.log('width', width)
        if(width < 400){
            setResponsiveMarginTop(10)
        }else if(width > 400 && width < 600) {
            setResponsiveMarginTop(20)
        }

    }, [])

    const [loginStep, setLoginStep] = React.useState(1)
    const [isPressing, setIsPressing] = React.useState(false)
    const [isPressing2, setIsPressing2] = React.useState(false)
    const [isPassViewable, setIsPassViewable] = React.useState(false)
    const [isBottomSheetOpen, setIsBottomSheetOpen] = React.useState(false)
    const [errorMsg, setErrorMsg] = React.useState("")

    const [inputValues, setInputValues] = React.useState({
        mail: "",
        password: "",
        authCode: "",
    })

    const animationConfigs = useBottomSheetTimingConfigs({
        duration: 500,
      });

    const bottomSheetRef = React.useRef()

    const handleFormAction = () => {
        if(loginStep === 1){
            verifyUser(setLoginStep, navigation)
        }else if(loginStep === 2){
            if(inputValues.mail.length > 0 && inputValues.password.length > 0){
                loginUser(inputValues, setErrorMsg, navigation)
            }else{
                setErrorMsg('Pola formularza nie mogą być puste')
            }
        }else if(loginStep === 3){
            if(inputValues.mail.length > 0 && inputValues.password.length > 0 && inputValues.authCode.length > 0 ){

            }else{
                setErrorMsg('Pola formularza nie mogą być puste')
            }
        }
    }

    React.useEffect(() => {
        setInputValues({...inputValues, password: ""})
    }, [loginStep])

    React.useEffect(() => {
        setErrorMsg("")
    }, [inputValues])

    const handleSwitchBottomSheet = (value) => {
        setIsBottomSheetOpen(value)
        if(value){
            bottomSheetRef.current.snapToIndex(0)
        }else{
            bottomSheetRef.current.close()
        }
    }

    const handleResetPassword = async () => {
        // logowanie w ramach apki
        // setLoginStep(3)

        // logowanie w ramach panelu admin
        const url = "https://web-production-f464.up.railway.app/reset-password/"

        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        }
    }

    return (
        <View style={{flex: 1}}>
            <Background />
            <View style={styles.content}>
                <View style={styles.contentContainer}>
                    <TouchableWithoutFeedback onPress={() => setLoginStep(1)} >
                        <MotiView style={styles.backBtn} 
                        from={{opacity: 0}} 
                        animate={{opacity: loginStep > 1 ? 1 : 0}}>
                            <Icons.ArrowUturnLeftIcon size={30} color="white" />
                        </MotiView>
                    </TouchableWithoutFeedback>
                    {/* <TouchableWithoutFeedback onPress={() => handleSwitchBottomSheet(!isBottomSheetOpen)} >
                        <MotiView style={styles.termsBtn} 
                        from={{opacity: 0}} 
                        animate={{opacity: isBottomSheetOpen ? 0 : 1}}>
                            <Icons2.InformationCircleIcon size={35} color="white" />
                        </MotiView>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => handleSwitchBottomSheet(!isBottomSheetOpen)} >
                        <MotiView style={styles.termsBtn} 
                        from={{opacity: 0}} 
                        animate={{opacity: isBottomSheetOpen ? 1 : 0}}>
                            <Icons2.XMarkIcon size={35} color="white" />
                        </MotiView>
                    </TouchableWithoutFeedback> */}
                    <MotiImage resizeMode="contain" style={styles.logoImg}
                    from={{height: '20%'}} 
                    animate={{height: loginStep > 1 ? '0%' : '40%'}}
                    transition={{type: 'timing', duration: 700}}
                    source={require('../../assets/logoJV.png')} />
                    <MotiView style={styles.formContainer}
                    from={{marginTop: `${responsiveMarginTop}%`}} transition={{type: 'timing', duration: 700}}
                    animate={{marginTop: loginStep > 1 ? '0%' : `${responsiveMarginTop}%`}}>
                        <Text style={styles.logInTitle}>Witaj Ambasadorze!{"\n"}program
                        <Text style={{fontWeight: 700}}> partnerski </Text>
                         {"\n"}justVAPE</Text>
                    </MotiView>
                    {loginStep > 1 && <MotiView style={styles.inputContainer} 
                    from={{opacity: 0, translateY: 20}}
                    animate={{opacity: 1, translateY: 0}}
                    transition={{ delay: 700}}>
                        <TextInput 
                            textContentType='emailAddress'
                            keyboardType='email-address'
                            autoCapitalize='none'
                            autoCompleteType='email'
                            placeholder='Wpisz swojego maila' 
                            style={styles.input}
                            placeholderTextColor="#b5b5b5"
                            value={inputValues.mail}
                            onChangeText={(e) => setInputValues({...inputValues, mail: e})}
                        />
                    </MotiView>}
                    {loginStep > 1 && <MotiView style={styles.inputContainer2} 
                        from={{opacity: 0, translateY: 20}}
                        animate={{opacity: 1, translateY: 0}}
                        transition={{ delay: 800}} >
                        <TextInput 
                            placeholder={loginStep > 2 ? 'Wpisz nowe hasło' : 'Wpisz hasło' }
                            keyboardType='default'
                            autoCapitalize="none"
                            style={styles.input}
                            placeholderTextColor="#b5b5b5"
                            secureTextEntry={!isPassViewable}
                            value={inputValues.password}
                            onChangeText={(e) => {setInputValues({...inputValues, password: e})}}
                        />
                        <TouchableWithoutFeedback onPress={() => setIsPassViewable(!isPassViewable)} >
                            <View>
                                {isPassViewable ? <Icons.EyeIcon size={25} color="#b5b5b5" /> :
                                <Icons.EyeSlashIcon size={25} color="#b5b5b5" />}
                            </View>
                        </TouchableWithoutFeedback>
                    </MotiView>}
                    {loginStep > 2 && <MotiView style={{...styles.inputContainer, marginTop: '5%'}} 
                    from={{opacity: 0, translateY: 20}}
                    animate={{opacity: 1, translateY: 0}}
                    transition={{ delay: 700}}>
                        <TextInput 
                            placeholder='Wpisz kod resetujący'
                            keyboardType='default'
                            style={styles.input}
                            placeholderTextColor="#b5b5b5"
                            value={inputValues.authCode}
                            onChangeText={(e) => setInputValues({...inputValues, authCode: e})}
                        />
                    </MotiView>}
                    <View style={styles.errorContainer}> 
                        <AnimatePresence>
                            {errorMsg.length > 0 && <MotiText style={styles.errorTxt}
                            from={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            >{errorMsg}</MotiText>}
                        </AnimatePresence>
                    </View>
                    <View style={styles.navContainer}>
                        <View style={styles.resetContainer}> 
                            <TouchableWithoutFeedback onPress={handleResetPassword} >
                                <MotiText style={styles.resetContainerTxt}
                                from={{translateY: 20}} 
                                animate={{translateY: loginStep === 2 ? 0 : 20}}> 
                                Zapomniałeś hasła? <Text style={{color: '#dbdbdb'}}>Zresetuj je!</Text>
                                </MotiText>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={styles.btnContainer}>
                            <TouchableWithoutFeedback onPress={handleFormAction} 
                            onPressIn={() => setIsPressing(true)} 
                            onPressOut={() => setIsPressing(false)}>
                                <MotiView  style={styles.loginBtn}
                                from={{width: '60%', backgroundColor: '#34A3CF'}}
                                animate={{width: loginStep === 2 ? '100%' : '60%', 
                                backgroundColor: isPressing ? '#0cb1f2' : '#34A3CF'}}
                                transition={{duration: 300}}>
                                    <Text style={styles.loginBtnText}>
                                        {loginStep === 3 ? 'Zresetuj' : 'Zaloguj'}
                                    </Text>
                                </MotiView>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => setLoginStep(2)} 
                            onPressIn={() => setIsPressing2(true)} 
                            onPressOut={() => setIsPressing2(false)}>
                                <MotiView  style={styles.loginBtn2}
                                from={{opacity: 0.6, translateX: 300}}
                                animate={{opacity: isPressing2 ? 1 : 0.6, 
                                translateX: loginStep === 1 ? 300 : 0}}>
                                    <Text style={styles.loginBtnText}>Anuluj</Text>
                                </MotiView>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>
            </View>
            {/* <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            snapPoints={['40%', '66%']}
            enablePanDownToClose={true}
            animationConfigs={animationConfigs}
            >
                <View>
                    <Text>dfadgfas</Text>
                </View>
            </BottomSheet>       */}
        </View>
    )


}


export default LoginScreen