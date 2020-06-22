import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

//props: title, onPress
export default function (props) {
    let { backLabel, title, onPressBack } = props;
    if (backLabel === undefined) backLabel = "Back";

    return (
        <View style={YellowLine.header}>
            <TouchableOpacity style={YellowLine.leftWhiteButton} onPress={onPressBack}>
                <View style={YellowLine.insideWhiteButton}>
                    <Ionicons name='ios-arrow-back' size={18} style={YellowLine.whiteButtonIcon} />
                    <Text style={YellowLine.whiteButtonText}>{backLabel}</Text>
                </View>
            </TouchableOpacity>
            <Text h1 style={YellowLine.headerText}>{title}</Text>
        </View>
    )
}

const YellowLine = StyleSheet.create({
    header: {
        padding: 10,
        backgroundColor: 'rgb(245,199,26)',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    leftWhiteButton: {
        borderRadius: 3,
        backgroundColor: '#fff',
        left: 10,
        position: 'absolute',
    },
    rightWhiteButton: {
        borderRadius: 3,
        backgroundColor: '#fff',
        right: 10,
        position: 'absolute',
    },
    insideWhiteButton: {
        paddingVertical: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    whiteButtonText: {
        fontSize: 16,
        paddingHorizontal: 5,
    },
    whiteButtonIcon: {
        paddingHorizontal: 5,
    },
    headerText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    },
})