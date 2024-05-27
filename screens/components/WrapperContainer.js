import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Loader } from './Loader'

const WrapperContainer = ({ children, isLoading, containerStyle }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
            <StatusBar backgroundColor={'black'} barStyle={'light-content'} translucent={true} />
            <View style={{ flex: 1, backgroundColor: 'black', ...containerStyle, marginTop: 10 }}>{children}</View>
            <Loader isLoading={isLoading} />
        </SafeAreaView>
    )
}

export default WrapperContainer

const styles = StyleSheet.create({})