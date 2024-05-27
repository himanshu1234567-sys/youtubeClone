import { ActivityIndicator, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Text } from 'react-native';
import Video from 'react-native-video';
const VideoItem = ({
    item,
    index,
    onVideoPressed,
}) => {


    console.log("item0 , ",item?.url , index)
    return (
            <View
                style={{
                    flex: 1,
                }}
            >
                <View style={{ alignItems: 'center' }}>
                    <Video
                        controls={false}
                        paused
                        style={{
                            width: '100%',
                            height: 180,
                        }}
                        onLoad={() => {
                            console.log('loaded');
                        }}
                        source={{ uri: item?.url }}
                        resizeMode="cover" // required in ios
                        poster={item?.url} // required in android
                        posterResizeMode="cover" // required in android
                    />
                </View>
            </View>
    );
};

export default VideoItem;

const styles = StyleSheet.create({
    productImage: {
        width: '100%',
        height: 180,
        // marginVertical: 2,
        backgroundColor: 'white',
        borderRadius: 8,
    },

    productTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    productPrice: {
        fontSize: 14,
        color: 'gray',
    },
    button: {
        borderRadius: 14,
    },
    playIcon: {
        width: 44,
        height: 44,
        resizeMode: 'contain',
        // tintColor: colors.white,
    },
});