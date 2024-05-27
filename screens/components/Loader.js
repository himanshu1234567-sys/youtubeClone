import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';



export const Loader = ({
    isLoading,
    message,
    msgNoOfLines = 1,
    children,
    messageComp,
    loaderContainer = {},
}) =>
    isLoading ? (
        <View
            style={{
                ...styles.mainView,
                ...loaderContainer,
            }}
        >
            <View style={styles.loadingcontainer}>
                {children !== undefined ? (
                    children
                ) : (
                    <ActivityIndicator color='white' size={'large'} />
                )}
                {message !== '' && message !== undefined ? (
                    <Text
                        style={[
                            styles.loaderMessage,
                            !children && {
                                backgroundColor: 'white',
                                fontSize: 12,
                                fontFamily: 'Manrope-SemiBold',
                                color: 'black',
                            },
                        ]}
                        numberOfLines={msgNoOfLines}
                    >
                        {message}
                    </Text>
                ) : (
                    messageComp && messageComp()
                )}
            </View>
        </View>
    ) : (
        <></>
    );


const styles = StyleSheet.create({
    mainView: {
        // backgroundColor: 'rgba(255,255,255,0.5)',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        ...StyleSheet.absoluteFill,
    },
    absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    loadingcontainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 110,
    },
    loaderMessage: {
        backgroundColor: 'white',
        fontSize: 12,
        fontFamily: 'Manrope-SemiBold',
        color: 'black',
        textAlign: 'center',
        paddingHorizontal: 32,
    },
});