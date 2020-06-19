import React, { useContext, useState, useEffect } from 'react'
import { View, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import { FloatingAdd, UserIdContext } from '../../components/index'
import { getTasks } from '../../utils/data-fetchers/ProgressTracker';
import wrapper from '../../utils/data-fetchers/fetchingWrapper'
import Spinner from 'react-native-loading-spinner-overlay';
import { TodoStyles } from '../../../style/TodoStyles.js'

export default function Unfinished({ navigation, route }) {
    const isFocus = useIsFocused();
    const userId = useContext(UserIdContext);
    const [loading, setLoading] = useState(true);
    const { moduleId } = route.params;
    const [milestones, setMilestones] = useState([]);

    useEffect(() => {
        if (isFocus) {
            setLoading(true);
            return wrapper(() => getTasks(userId, moduleId, false),
                response => { setMilestones(response); setLoading(false) })
        }
    }, [isFocus])

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <TouchableOpacity onPress={() => navigation.navigate('Edit Unfinished', item)}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View>
                        <Text>{item.title}</Text>
                        <Text style={styles.stat} >50 others have finished this.</Text>
                    </View>
                    <Text style={{ fontSize: 20 }}>{item.details}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
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

                <FloatingAdd onPress={() => navigation.navigate("Add Unfinished", { moduleId: moduleId })} />
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
