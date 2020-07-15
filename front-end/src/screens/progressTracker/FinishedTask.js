import React, { useContext, useState, useEffect } from 'react'
import { View, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import { getTasks } from '../../utils/data-fetchers/ProgressTracker';
import { FloatingAdd, UserIdContext } from '../../components/index'
import {YellowLine} from '../../../style/yellowLine'
import Spinner from 'react-native-loading-spinner-overlay';
import { TodoStyles } from '../../../style/TodoStyles.js'
import wrapper from '../../utils/data-fetchers/fetchingWrapper'
import { useIsFocused } from '@react-navigation/native'
import {Ionicons, Entypo} from '@expo/vector-icons'

export default function Finished({ navigation, route }) {
    const [milestones, setMilestones] = useState([]);
    const isFocus = useIsFocused();
    const userId = useContext(UserIdContext);
    const [loading, setLoading] = useState(true);
    const { moduleId } = route.params;

    useEffect(() => {
        if (isFocus) {
            setLoading(true);
            return wrapper(() => getTasks(userId, moduleId, true),
                response => { setMilestones(response); setLoading(false) })
        }
    }, [isFocus])

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <TouchableOpacity onPress={() => navigation.navigate('Edit Finished', item)}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{flexDirection: 'row',  justifyContent: 'center'}}>
                        <Entypo name="dot-single" size={24} color="#e76f51" />
                        <Text style={styles.text}>{item.title}</Text>
                    </View>
                    <Text style={styles.text}>{item.details}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={YellowLine.header}>
                    <TouchableOpacity style={YellowLine.leftWhiteButton} onPress={() => navigation.pop()}>
                        <View style={YellowLine.insideWhiteButton}>
                            <Ionicons name='ios-arrow-back' size={18} style={YellowLine.whiteButtonIcon}/>
                            <Text style={YellowLine.whiteButtonText}>Back</Text>
                        </View> 
                    </TouchableOpacity>
                    <Text h1 style={YellowLine.headerText}>{moduleId}</Text>
                </View>
                <Spinner
                    visible={loading}
                    textContent='Loading...'
                    textStyle={TodoStyles.spinner}
                />
                <FlatList
                    keyExtractor={(item) => item.taskId.toString()}
                    data={milestones}
                    renderItem={renderItem}
                />

                <FloatingAdd onPress={() => navigation.navigate("Add Finished", { moduleId: moduleId })} />
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "center",
        backgroundColor: '#fff'
    },
    item: {
        backgroundColor: 'white',
        padding: "3%",
    },
    addButton: {
        backgroundColor: 'red',
        color: 'white'
    },
    stat: {
        color: 'coral'
    },
    text: {
        fontFamily: 'sourcesanspro-regular',
        fontSize: 18
    }
});
