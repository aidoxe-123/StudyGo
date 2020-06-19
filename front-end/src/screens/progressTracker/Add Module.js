import React, { useState, useContext, useEffect } from 'react'
import { View, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import { SuggestInput, PrettyTextInput, UserIdContext } from '../../components/index'
import { addModule, updateModulesData, getModulesData } from '../../utils/data-fetchers/ProgressTracker'
import { Searchbar } from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';
import { TodoStyles } from '../../../style/TodoStyles.js'
import wrapper from '../../utils/data-fetchers/fetchingWrapper';

export default function Finished({ navigation }) {
    const userId = useContext(UserIdContext);
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([]);

    useEffect(() => {
        wrapper(async () => {
            await updateModulesData();
            return await getModulesData();
        }, data => { setData(data); });
    }, [])

    const handleAdd = (moduleCode) => {
        setLoading(true);
        let title = data.filter(item => item.moduleCode === moduleCode)[0].title;
        addModule(userId, moduleCode, title).then(() => setLoading(false)).then(() => navigation.goBack()).catch(error => console.log(error));
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <View style={{ flex: 1 }}>
                <Spinner
                    visible={loading}
                    textContent='Loading...'
                    textStyle={TodoStyles.spinner}
                />
                {/*Add title textbox*/}
                <View style={styles.InputWithTitle}>
                    <SuggestInput
                        allOptions={data}
                        onChoose={(choice) => handleAdd(choice)}
                        keyExtractor={item => item.moduleCode}
                        dataExtractor={item => item.moduleCode + " - " + item.title}
                        renderOption={(item) => (<Text>{item.moduleCode} - {item.title}</Text>)}
                    />
                </View>

            </View>
        </TouchableWithoutFeedback>

    )
}


const styles = StyleSheet.create({
    InputWithTitle: {
        flex: 1,
        padding: "10%"
    },
    DoneButton: {
        alignItems: "center",
        aspectRatio: 5 / 2,
        backgroundColor: "coral",
        padding: 10
    }
}
)