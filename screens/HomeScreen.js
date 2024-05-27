import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Image, Animated, Easing } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { videoListThunk } from '../redux/slice/videoListThunk';
import WrapperContainer from './components/WrapperContainer';

const HomeScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [searchTextState, setSearchTextState] = useState('');
    const [pageNo, setPageNo] = useState(1);
    const dispatch = useDispatch();
    const videoList = useSelector((state) => state.videoListSlice?.videoListData);
    const entries = Object.entries(videoList);

    // Create initial state for showMore for each category
    const initialShowMoreState = entries.reduce((acc, [category, items]) => {
        acc[category] = false;
        return acc;
    }, {});
    console.log("initialShowMoreState", initialShowMoreState)
    const [showMoreState, setShowMoreState] = useState(initialShowMoreState);

    useEffect(() => {
        dispatch(videoListThunk(pageNo)).then(() => {
            setIsLoading(false);
        }).catch(() => {
            setIsLoading(false); // Corrected from setIsLoading*false
        });
    }, [pageNo]);

    const handleSearch = () => {
        console.log(searchTextState);
    };

    const toggleShowMore = (category) => {
        setShowMoreState(prevState => ({
            ...prevState,
            [category]: !prevState[category]
        }));
    };

    const AnimatedGradient = () => {
        const gradientAnim = useRef(new Animated.Value(0)).current;

        useEffect(() => {
            Animated.loop(
                Animated.timing(gradientAnim, {
                    toValue: 1,
                    duration: 2000,
                    easing: Easing.linear,
                    useNativeDriver: false,
                })
            ).start();
        }, [gradientAnim]);

        const backgroundColor = gradientAnim.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: ['rgb(192,4,10)', 'rgb(255,255,255)', 'rgb(183,0,0)'],
        });

        return <Animated.View style={[styles.gradient, { backgroundColor }]} />;
    };

    const renderItemHead = ({ item }) => {
        const category = item[0];
        const itemArr = item[1] || [];
        const showMore = showMoreState[category];
        console.log("showMore", showMore)
        const displayedItems = showMore ? itemArr : itemArr.slice(0, 3);

        return (
            <View style={{ justifyContent: 'center' }}>
                <View style={{ marginTop: 10, borderBottomWidth: 1, borderTopWidth: 1, borderColor: 'white' }}>
                    <Text style={{ alignItems: 'center', alignSelf: 'center', color: 'white', fontWeight: 'bold', padding: 20 }}>{category}</Text>
                </View>
                <FlatList
                    data={displayedItems}
                    renderItem={renderItem}
                />
                {itemArr.length > 3 && (
                    <TouchableOpacity onPress={() => toggleShowMore(category)} style={styles.showMoreButton}>
                        <AnimatedGradient />
                        <Text style={styles.showMoreText}>
                            {showMore ? 'Show Less' : 'Show More'}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    };

    const videoDetail = (item) => {
        navigation.navigate('videoDetails', {
            videoDetails: item
        })
    }

    const renderItem = ({ item }) => {
        return (
            <View style={styles.videoContainer}>
                <TouchableOpacity onPress={() => videoDetail(item)}>
                    <Image source={{ uri: item?.p_image }} style={styles.video} />
                    {/* <Text style={styles.title}>{item?.p_name}</Text> */}
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <WrapperContainer isLoading={isLoading} containerStyle={{ paddingHorizontal: 12, backgroundColor: 'black' }}>
          <>
          <View style={{ flexDirection: 'row' }}>
                <TextInput
                    value={searchTextState}
                    style={styles.input}
                    placeholder="search"
                    onChangeText={(searchString) => setSearchTextState(searchString)}
                    underlineColorAndroid="transparent"
                    returnKeyType="search"
                    onSubmitEditing={handleSearch}
                />
            </View>
            <FlatList
                data={entries}
                renderItem={renderItemHead}
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
                />
                </>
        </WrapperContainer>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    searchSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    searchIcon: {
        padding: 10,
        position: 'absolute',
        right: 10,
        height: 30,
        width: 30,
        top: 10
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        backgroundColor: '#fff',
        color: '#424242',
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 10,
    },
    videoContainer: {
        padding: 5,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'gray',
        marginVertical: 10,
    },
    video: {
        width: '100%',
        height: 180,
        borderRadius: 20,

    },

    errorText: {
        color: 'white',
        textAlign: 'center',
        marginTop: 20,
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
    showMoreButton: {
        margin: 10,
        padding: 10,
        alignSelf: 'center',
        width: '30%',
        borderRadius: 5,
        overflow: 'hidden',
    },
    showMoreText: {
        color: 'black',
        fontWeight: 'bold',
        alignSelf: 'center',
        zIndex: 1,
    },
    gradientTextContainer: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    gradientText: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    categoryText: {
        color: 'white',
        fontWeight: 'bold',
        padding: 20,
        textAlign: 'center',
        zIndex: 1,
    },
});