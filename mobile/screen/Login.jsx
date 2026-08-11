// import { StyleSheet, View } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { Button, Card, Divider, Text, TextInput } from 'react-native-paper'
// import { useNavigation } from '@react-navigation/native'
// import { useMobileLoginMutation, useOtpSendUserMutation } from '../redus/api/auth.api'
// import Loading from '../components/Loading'
// import { OtpInput } from 'react-native-otp-entry'
// import AsyncStorage from '@react-native-async-storage/async-storage'

// const Login = () => {
//     // console.log(process.env.EXPO_PUBLIC_BACKEND_URL)

//     const { navigate } = useNavigation()
//     const [otp, setOtp] = useState()
//     const [email, setEmail] = useState()
//     const [singin, { isSuccess: loginIsSuccess, isLoading: loginisLoading, isError: loginIsError, error: loginError }] = useMobileLoginMutation()
//     const [sendOTP, { isSuccess: sendOtpIsSuccess, isLoading: sendOtpisLoading, isError: sendOtpIsError, error: sendOtpError }] = useOtpSendUserMutation()



//     const handleLogin = async () => {
//         await AsyncStorage.setItem("user", JSON.stringify(data))
//         navigate("landing")
//     }

//     useEffect(() => {
//         if (loginIsSuccess) {
//             handleLogin()
//         }
//     }, [loginIsSuccess])

//     if (sendOtpIsError) {
//         console.log(sendOtpError);
//     }

//     if (loginIsError) {
//         console.log(loginError);
//     }

//     if (sendOtpisLoading || loginisLoading) {
//         return <Loading />
//     }

//     return <View style={{ flex: 1, margin: 10 }}>
//         <Text>{process.env.EXPO_PUBLIC_BACKEND_URL}</Text>
//         <Card>
//             <Card.Title title='sign In ' />
//             <Card.Content style={{ gap: 15 }}>
//                 {
//                     sendOtpIsSuccess
//                         ? <>
//                             <OtpInput numberOfDigits={6} onTextChange={val => setOtp(val)} />
//                             <Button onPress={e => singin({ email, otp })} mode='contained'>Verify</Button>
//                         </>
//                         : <>
//                             <TextInput
//                                 onChangeText={val => setEmail(val)}
//                                 placeholder='Enter Email' label="Email"
//                             />
//                             <Button onPress={e => sendOTP({ username: email })} mode='contained'>Login</Button>
//                         </>
//                 }
//                 <Divider></Divider>
//                 <Button onPress={e => navigate("register")}>Does Have Account? Register </Button>
//             </Card.Content>
//         </Card>

//     </View>
// }

// export default Login

// const styles = StyleSheet.create({})


import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Card, Divider, TextInput } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useMobileLoginMutation, useOtpSendUserMutation } from '../redus/api/auth.api'
import { OtpInput } from 'react-native-otp-entry'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loading from '../components/Loading'

const Login = () => {
    const { navigate } = useNavigation()
    return <View style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        flexDirection: 'row',
    }}>
        <SignIn />
    </View>

}

export default Login

const styles = StyleSheet.create({})



const SignIn = () => {
    // console.log(process.env.EXPO_PUBLIC_BACKEND_URL)

    const { navigate } = useNavigation()
    const [otp, setOtp] = useState()
    const [email, setEmail] = useState()
    const [singin, { data, isSuccess: loginIsSuccess, isLoading: loginisLoading, isError: loginIsError, error: loginError }] = useMobileLoginMutation()
    const [sendOTP, { isSuccess: sendOtpIsSuccess, isLoading: sendOtpisLoading, isError: sendOtpIsError, error: sendOtpError }] = useOtpSendUserMutation()



    const handleLogin = async () => {
        console.log(data)

        await AsyncStorage.setItem("user", JSON.stringify(data))
    }

    useEffect(() => {
        if (loginIsSuccess) {
            handleLogin()
            navigate("landing")
        }
    }, [loginIsSuccess])

    if (sendOtpIsError) {
        console.log(sendOtpError);
    }

    if (loginIsError) {
        console.log(loginError);
    }

    if (sendOtpisLoading || loginisLoading) {
        return <Loading />
    }

    return <View style={{ flex: 1, margin: 10 }}>
        <Text>{process.env.EXPO_PUBLIC_BACKEND_URL}</Text>
        <Card>
            <Card.Title title='sign In ' />
            <Card.Content style={{ gap: 15 }}>
                {
                    sendOtpIsSuccess
                        ? <>
                            <OtpInput numberOfDigits={6} onTextChange={val => setOtp(val)} />
                            <Button onPress={e => singin({ username: email, otp })} mode='contained'>Verify</Button>
                        </>
                        : <>
                            <TextInput
                                onChangeText={val => setEmail(val)}
                                placeholder='Enter Email' label="Email"
                            />
                            <Button onPress={e => sendOTP({ username: email })} mode='contained'>Login</Button>
                        </>
                }
                <Divider></Divider>
                <Button onPress={e => navigate("register")}>Does Have Account? Register </Button>
            </Card.Content>
        </Card>

    </View>
}