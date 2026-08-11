import { StyleSheet, View } from 'react-native'
import React from 'react'
import { ActivityIndicator, Text } from 'react-native-paper'

const Loading = () => {
    return <View style={{
        flexDirection: "row",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }}>
        <Text variant='titleLarge'>please Wait...</Text>
        <ActivityIndicator></ActivityIndicator>
    </View>
}

export default Loading

const styles = StyleSheet.create({})