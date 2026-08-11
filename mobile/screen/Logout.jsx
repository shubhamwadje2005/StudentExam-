import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Button, Card, MD3Colors } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useMobileLogoutMutation } from '../redus/api/auth.api'

const Logout = () => {
    const { navigate } = useNavigation()
    const [Logout, { isSuccess, isError, error }] = useMobileLogoutMutation()
    const { user } = useSelector(state => state.auth?.user)
    console.log(user);


    const handleLogout = async () => {
        await AsyncStorage.removeItem("user")
        navigate("login")
    }

    useEffect(() => {
        if (isSuccess) {
            handleLogout()
        }
    }, [isSuccess])

    if (isError) {
        console.log(error);
    }


    return <>
        <Card style={{ marginTop: 50, marginHorizontal: 10 }}>
            <Card.Title title="profile" />
            <Card.Content>
                <Text variant='headlinMedium'>Name:-{user && user.name}</Text>
                <Text>Email:-{user && user.email}</Text>
            </Card.Content>
            <Button
                mode='contained-tonal'
                buttonColor={MD3Colors.error90}
                style={{ marginVertical: 20 }}
                onPress={Logout}>Logout</Button>
        </Card>
    </>
}

export default Logout

const styles = StyleSheet.create({
    image: {
        // width: 100,
        width: 150,
        // height: 100,
        height: 80,
        marginRight: 5,
        borderRadius: 8,
    },
})