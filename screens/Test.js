import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setColor } from '../redux/slice/colorslice';
const Test = () => {


    const color = useSelector((state) => state?.color?.value); //reading the state 
    console.log(color)
    const dispatch = useDispatch();
    return (
        <>
            <TouchableOpacity
                onPress={() => dispatch(setColor())} //Dispatch action
            >
                <Text style={{ fontSize: 20 }}>Generate Random Color</Text>
            </TouchableOpacity>
            <FlatList
                data={color}
                renderItem={({ item }) => {
                    return (
                        <View style={{ backgroundColor: item, height: 100, width: 100 }} />
                    )
                }}
            /></>
    )
}

export default Test