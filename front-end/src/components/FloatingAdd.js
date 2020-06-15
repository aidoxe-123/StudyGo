import React, { useState } from 'react'
import { TouchableOpacity, TextInput, StyleSheet, Text } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

export default FloatingAdd = (props) => {
    const [color, setColor] = useState("blue");
    return (
        <TouchableOpacity style={styles.fab} {...props} >
            <AntDesign name="pluscircle" size={50} color="coral" />
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    fab: {
        color: "red",
        position: "absolute",
        margin: 16,
        right: 0,
        bottom: 0,
    }
})