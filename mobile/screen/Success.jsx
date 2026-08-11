import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import successMusic from '../screen/assest/success.mp3'
import successAnimation from '../screen/assest/success.json'

const Success = () => {
    useEffect(() => {
        const audio = new Audio(successMusic)
        audio.play()
        return () => {
            audio.pause()
        }
    }, [])
    return (
        <View style={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
            <Text style={{}}>Exam Submitted Successfully</Text>
            <View style={{ height: 400, width: 400 }}>
                <Lottie
                    source={successAnimation}
                    autoPlay
                    loop
                />
            </View>
        </View >
    )
}

export default Success

const styles = StyleSheet.create({})