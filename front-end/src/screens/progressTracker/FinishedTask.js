import React, { useContext, useState } from 'react'
import { View, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { FloatingAdd } from '../../components/index'

export default function Finished({ navigation }) {
    const [milestones, setMilestones] = useState([
        { id: "1", title: "Assignment 1", status: "ungraded" },
        { id: "2", title: "Midterm", status: "notGraded" },
        { id: "3", title: "Online quiz", status: "graded", mark: "98" },
        { id: "4", title: "Final", status: "notGraded" },
        { id: "5", title: "Final", status: "notGraded" },
        { id: "6", title: "Final", status: "notGraded" },
        { id: "7", title: "Final", status: "notGraded" },
        { id: "8", title: "Final", status: "notGraded" },
        { id: "9", title: "Final", status: "notGraded" },
        { id: "10", title: "Final", status: "notGraded" },
        { id: "11", title: "Final", status: "notGraded" }
    ]);

    const map = { ungraded: "Ungraded", notGraded: "Not Graded Yet", graded: "Graded" }

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <TouchableOpacity onPress={() => navigation.navigate('Edit Finished', item)}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>{item.title}</Text>
                    <Text style={{ fontSize: 15 }}>{map[item.status]}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <FlatList
                    keyExtractor={(item) => item.id.toString()}
                    data={milestones}
                    renderItem={renderItem}
                />

                <FloatingAdd onPress={() => navigation.navigate("Add Finished")} />
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "center"
    },
    item: {
        backgroundColor: 'white',
        padding: "3%",
        borderColor: 'coral',
        borderBottomWidth: 1
    },
    addButton: {
        backgroundColor: 'red',
        color: 'white'
    },
    stat: {
        color: 'coral'
    }
});
