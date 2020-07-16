import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { TouchableWithoutFeedback } from "react-native-gesture-handler";


// props:   allOptions      (array of all data to query on), 
//          onChoose        (action to perform on the chosen data's id) 
//          dataExtractor   (data to query on), 
//          keyExtractor    (id of items)

export default function (props) {
    let { allOptions, labelExtractor, renderOption, onChoose } = props;
    const [text, setText] = useState("Mon")
    const [isSearch, setIsSearch] = useState(false);

    renderOption = renderOption || ((item) => <Text>{labelExtractor(item)}</Text>)
    labelExtractor = labelExtractor || ((item) => (item));

    return (
        <View>
            <TouchableOpacity onPress={() => setIsSearch(true)}>
                <View style={styles.item}><Text>{text}</Text></View>
            </TouchableOpacity>

            <FlatList
                {...props}
                data={isSearch ? allOptions : []}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => {
                        onChoose(item);
                        setText(labelExtractor(item));
                        setIsSearch(false);
                    }} style={styles.item}>
                        {renderOption(item)}
                    </TouchableOpacity>
                )}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "center"
    },
    choose: {
        backgroundColor: 'white',
        padding: "3%",
        borderColor: 'black',
        borderBottomWidth: 1
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


