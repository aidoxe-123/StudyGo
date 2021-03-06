import React, { useContext, useState, useEffect } from 'react'
import { View, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import { FloatingAdd, UserIdContext } from '../../components/index'
import { YellowLine } from '../../../style/yellowLine'
import { getTasks, getPublicTasks } from '../../utils/data-fetchers/ProgressTracker';
import wrapper from '../../utils/data-fetchers/fetchingWrapper'
import Spinner from 'react-native-loading-spinner-overlay';
import { TodoStyles } from '../../../style/TodoStyles.js'
import { Ionicons, Entypo } from '@expo/vector-icons'

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
            return completed + '/' + (registered - 1) + ' other(s) completed'
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
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <View style={{ flexDirection: 'row' }}>
                        <Entypo name="dot-single" size={24} color="black" />
                        <View>
                            <Text style={styles.itemName}>{item.title}</Text>
                            <Text style={styles.stat} >{stat(item)} {item.isHost ? "(host)" : ""}</Text>
                        </View>
                    </View>
                    <Text style={{ fontSize: 20, fontFamily: 'sourcesanspro-regular' }}>{item.details}</Text>
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
                            <Ionicons name='ios-arrow-back' size={18} style={YellowLine.whiteButtonIcon} />
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
        alignContent: "center",
        backgroundColor: '#fff',
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
        fontFamily: 'sourcesanspro-regular',
        color: '#e76f51',
        fontSize: 18,
    },
    itemName: {
        fontFamily: 'sourcesanspro-regular',
        fontSize: 20,
    }
});
