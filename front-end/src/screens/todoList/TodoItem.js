import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons, Feather } from '@expo/vector-icons'

export default function TodoItem({ item, navigation, inDeleteMode, 
    selected, changeDeleteState, openDeleteMode }) {
    var dateString = item.date.getDate() + '/' + (item.date.getMonth() + 1) + '/' + (item.date.getYear() + 1900)
        + ' ' + toTwoDigitString(item.date.getHours()) + ':' + toTwoDigitString(item.date.getMinutes())

    const alreadyHappened = item.date - new Date() < 0

    function toTwoDigitString(num) {
        return num >= 10 ? "" + num : "0" + num
    }

    const notiList = typeof item.noti === 'undefined' ? {} : item.noti

    function toDeadline() {
        navigation.navigate('EditDeadline', {
            itemId: item.id,
            itemTask: item.task,
            itemDate: item.date.toString(),
            itemNoti: notiList
        })
    }

    function handlePress() {
        if (inDeleteMode) changeDeleteState(item.id, !selected, notiList)
        else toDeadline()
    }

    function handleLongPress() {
        if (!inDeleteMode) openDeleteMode(item.id, notiList)
    }
    return (
        <TouchableOpacity 
            onPress={handlePress}
            onLongPress={handleLongPress}
        >
            <View style={styles.task}>
                <View>
                    <Text style={[styles.text, alreadyHappened && {textDecorationLine: 'line-through', color: '#d3d3d3'}]}>{item.task}</Text>
                    <Text style={[styles.text, alreadyHappened && {textDecorationLine: 'line-through', color: '#d3d3d3'}]}>{dateString}</Text>
                </View>
                {   inDeleteMode 
                // check box
                ?   <View style={styles.rightColumn}>
                        <View style={styles.checkbox}>
                            { selected &&
                                <Feather name='check' color='#000' size={20}/>
                            }
                        </View>
                    </View>
                // 'more' label
                :   <View style={styles.rightColumn}>
                        <Text style={[styles.text, {marginRight: 10}, alreadyHappened && {color: '#d3d3d3'}]}>More</Text>
                        <Ionicons name='ios-arrow-forward' size={18} color={alreadyHappened ? '#d3d3d3' : 'black'}/>
                    </View>
                }
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    task: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        marginTop: 16,
        borderColor: '#bbb',
        borderWidth: 1,
        borderRadius: 1,
        borderRadius: 10,
    },
    text: {
        fontFamily: 'sourcesanspro-regular',
        fontSize: 20,
    },
    rightColumn: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        right: 20,
    },
    checkbox: {
        height: 20,
        width: 20,
        borderWidth: 1,
        borderColor: '#bbb',
        justifyContent: 'center',
        alignItems: 'center'
    }
})