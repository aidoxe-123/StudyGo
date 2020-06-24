import React, { useContext, useState, useEffect } from 'react'
import { View, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import { FloatingAdd, UserIdContext, YellowHeader } from '../../components/index'
import { getTasks, getPublicTasks } from '../../utils/data-fetchers/ProgressTracker';
import wrapper from '../../utils/data-fetchers/fetchingWrapper'
import Spinner from 'react-native-loading-spinner-overlay';
import { TodoStyles } from '../../../style/TodoStyles.js'

export default function Unfinished({ navigation, route }) {
    const isFocus = useIsFocused();
    const userId = useContext(UserIdContext);
    const [loading, setLoading] = useState(true);
    const { moduleId } = route.params;
    const [milestones, setMilestones] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        if (isFocus) {
            setLoading(true);

            let callback = async () => {
                setData(await getPublicTasks(moduleId));
                setMilestones(await (getTasks(userId, moduleId, false)))
            }

            return wrapper(callback,
                response => {
                    setLoading(false);
                })
        }
    }, [isFocus])

    const stat = (item) => {
        if (item.reference !== "") {
            let i = data.filter(itemm => itemm.taskId === item.reference)[0];
            const { completed, registered } = i;
            return completed + ' out of ' + registered + ' other(s) completed this'
        } else return "Personal task"
    }

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <TouchableOpacity onPress={() => navigation.navigate('Edit Unfinished', {
                ...item,
                moduleId: moduleId,
                isAdd: false,
                willHost: item.isHost,
                newRefId: item.reference,
                data: data
            })}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View>
                        <Text>{item.title}</Text>
                        <Text style={styles.stat} >{stat(item)} {item.isHost ? "(host)" : ""}</Text>
                    </View>
                    <Text style={{ fontSize: 20 }}>{item.details}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <YellowHeader title={moduleId} onPressBack={() => navigation.pop()} />
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

                <FloatingAdd onPress={() => navigation.navigate("Edit Unfinished", {
                    moduleId: moduleId,
                    title: "",
                    taskId: "",
                    details: "",
                    isAdd: true,
                    reference: "",
                    isHost: false,
                    willHost: false,
                    newRefId: "",
                    data: data
                })} />
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
    }
});
