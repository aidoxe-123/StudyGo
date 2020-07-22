import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet} from 'react-native'
import { AntDesign } from '@expo/vector-icons'

// @params: props: styling properties
export default FloatingAdd = (props) => {
    return (
        <TouchableOpacity style={styles.fab} {...props} >
            <AntDesign name="pluscircle" size={50} style={styles.addBtn} />
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
    },
    addBtn: {
        color: '#e76f51',
    }
})