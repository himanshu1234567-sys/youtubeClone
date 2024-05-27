import { View, StyleSheet, Text } from 'react-native';
import React, { useEffect, useState } from 'react';

import Video from 'react-native-video';
import WrapperContainer from './components/WrapperContainer';




const VideoDetails = ({ route }) => {
    const [videoDetail, setVideoDetail] = useState(null);

    useEffect(() => {
        const details = route?.params?.videoDetails;
        if (details) {
            setVideoDetail(details);
            console.log('Video Details:', details);
        } else {
            console.log('No video details found in route params');
        }
    }, [route]);

    return (
        <WrapperContainer isLoading={false} containerStyle={{ paddingHorizontal: 12, backgroundColor: 'black' }}>
            {videoDetail ? (
                <Video
                    source={{ uri: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" }}
                    style={styles.video}
                    controls={true}
                    paused
                    resizeMode="cover"
                    poster={videoDetail?.p_image}
                    useTextureView={false}
                    posterResizeMode="contain"
                    onLoad={(data) => {
                        console.log('Video loaded:', data);
                    }}
                    onBuffer={(buffer) => {
                        console.log('Video buffering:', buffer);
                    }}
                    onError={(error) => {
                        console.log('Video Error:', error);
                    }}
                />

            ) : (
                <Text style={styles.errorText}>Video details not available</Text>
            )}
            <View style={styles.textContainer}>

                <Text style={styles.title}>{videoDetail?.p_name}</Text>
                <Text style={styles.title}>Created at :{videoDetail?.create_at}</Text>

            </View>
        </WrapperContainer>
    );
};

export default VideoDetails;

const styles = StyleSheet.create({
    video: {
        width: '100%',
        height: 250,
    },
    errorText: {
        // color: 'white',
        textAlign: 'center',
        marginTop: 20,

    },
    title: {
        color: 'white',
        // marginTop: 5,
        textAlign: 'center',
        fontWeight: '400',

    },
    textContainer: {
        marginTop: 5,
        borderWidth: 1,
        borderColor: 'white',
        padding: 10
    }
});

