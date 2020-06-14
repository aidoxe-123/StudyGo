import React, { useContext, useState } from 'react'
import { View, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { FAB } from 'react-native-paper'


export default function Finished({ navigation }) {
    const [milestones, setMilestones] = useState([
        { id: "1", title: "task 1", progress: "60%" },
        { id: "2", title: "task 2", progress: "75%" },
        { id: "3", title: "task 3", progress: "25%" },
        { id: "4", title: "task 4", progress: "100%" },
        { id: "5", title: "task 4", progress: "100%" },
        { id: "6", title: "task 4", progress: "100%" },
        { id: "7", title: "task 4", progress: "100%" },
        { id: "8", title: "task 4", progress: "100%" },
        { id: "9", title: "task 4", progress: "100%" },
        { id: "10", title: "task 4", progress: "100%" },
        { id: "11", title: "task 4", progress: "100%" },
        { id: "12", title: "task 4", progress: "100%" },
        { id: "13", title: "task 4", progress: "100%" },
    ]);

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <TouchableOpacity onPress={() => navigation.navigate('Edit Unfinished', item)}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View>
                        <Text>{item.title}</Text>
                        <Text style={styles.stat} >50 others have finished this.</Text>
                    </View>
                    <Text style={{ fontSize: 20 }}>{item.progress}</Text>
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

                <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate("Add Unfinished")}>
                    <AntDesign name="pluscircle" size={50} color="coral" />
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback >
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
    },
    fab: {
        color: "red",
        position: "absolute",
        margin: 16,
        right: 0,
        bottom: 0,
    }
});
