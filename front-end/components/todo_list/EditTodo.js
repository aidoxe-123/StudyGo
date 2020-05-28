import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native'
import DatePicker from '../../shared component/DatePicker'
import { Fontisto, Ionicons } from '@expo/vector-icons'
import { AddTodoStyles } from '../../style/AddTodoStyles'

export default function EditTodo({ route, navigation }) {
    const { item, handleEdit, handleDelete } = route.params
    const [task, setTask] = useState(item.task)
    const [date, setDate] = useState(item.date)
    const [editDate, setEditDate] = useState(false)

    var dateString = date.getDate() + '/' + date.getMonth() + '/' + (date.getYear() + 1900)
    function deleteItem() {
        navigation.pop()
        handleDelete(item.id)
    }
    function handleSubmit() {
        if (task.length > 0) {
            handleEdit(item.id, task, date)
        }
        navigation.pop()
    }
    
    function handleChangeDateTimePicker(event, date) {
        setEditDate(false)
        if (typeof date !== 'undefined') {
            setDate(date)
        }
    }

    return (
        // <View style={TodoStyles.task}>
        //     <TextInput 
        //         style={TodoStyles.editTodoInput}
        //         placeholder='e.g edited task'
        //         value={task}
        //         onChangeText={value => setTask(value)}
        //     />
        //     <View style={TodoStyles.dateView}>
        //         <Text style={TodoStyles.dateContainer}>{dateString}</Text>
        //         <Fontisto name='date' size={18} color='#333' onPress={() => setEditDate(true)}/>
        //         <DatePicker showDatePicker={editDate} date={date} handleChange={handleChangeDateTimePicker}/>
        //     </View>
        //     <TouchableOpacity 
        //         style={TodoStyles.button}
        //         onPress={() => handleFormSubmit(task, date)}
        //     >
        //         <Text style={TodoStyles.buttonText}>Save changes</Text>
        //     </TouchableOpacity>
        // </View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={AddTodoStyles.container}>
                <View style={AddTodoStyles.header}>
                    <TouchableOpacity style={AddTodoStyles.whiteButton} onPress={() => navigation.pop()}>
                        <View style={AddTodoStyles.insideWhiteButton}>
                            <Ionicons name='ios-arrow-back' size={18} />
                            <Text style={AddTodoStyles.whiteButtonText}>Cancel</Text>
                        </View> 
                    </TouchableOpacity>
                    <Text h1 style={AddTodoStyles.headerText}>Edit Task</Text>
                    <TouchableOpacity style={styles.whiteButton} onPress={deleteItem}>
                        <View style={AddTodoStyles.insideWhiteButton}>
                            <Text style={{fontSize: 16}}>Delete</Text>
                        </View> 
                    </TouchableOpacity>
                </View>
                <View style={AddTodoStyles.form}>
                    <Text style={AddTodoStyles.label}>Task name:</Text>
                    <TextInput
                        style={AddTodoStyles.input}
                        placeholder='e.g Do homework'
                        onChangeText={(value) => setTask(value)}
                        value={task}
                    />
                    
                    <Text style={AddTodoStyles.label}>{"\n"}Add date:</Text>
                    <View style={AddTodoStyles.dateView}>
                        <Text style={AddTodoStyles.dateBox}>{dateString}</Text>
                        <Fontisto name='date' size={28} color='#333' onPress={() => setEditDate(true)}/>
                        <DatePicker showDatePicker={editDate} date={date} handleChange={handleChangeDateTimePicker}/>
                    </View>
                </View>
                <View style={AddTodoStyles.bottomRow}>
                    <TouchableOpacity style={AddTodoStyles.button} onPress={handleSubmit}> 
                        <Text style={AddTodoStyles.buttonText}>Save changes</Text>
                    </TouchableOpacity>
                </View>       
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    whiteButton: {
        borderRadius: 3,
        backgroundColor: '#fff',
        right: 10,
        position: 'absolute',
    },
})