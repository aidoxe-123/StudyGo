import React, { useState } from 'react';
import { Searchbar } from 'react-native-paper';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native'


// props:   allOptions      (array of all data to query on), 
//          onChoose        (action to perform on the chosen data's id) 
//          dataExtractor   (data to query on), 
//          keyExtractor    (id of items)

export default function (props) {
    const [suggest, setSuggest] = useState([]);
    const { allOptions, dataExtractor, renderOption, onChoose, keyExtractor } = props;
    const [text, setText] = useState("")

    const onChangeSearch = (query) => {
        setText(query);
        const newSuggest = allOptions.filter(item => {
            const itemData = (dataExtractor(item).toString().toUpperCase());
            return itemData.indexOf(query.toUpperCase()) > -1;
        }).slice(0, 4);
        setSuggest(newSuggest);
    }


    return (
        <View>
            <Searchbar
                onChangeText={onChangeSearch}
                value={text}
            />

            <FlatList
                {...props}
                data={suggest}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => { onChoose(keyExtractor(item)); setSuggest([]); setText(dataExtractor(item)) }} style={styles.item}>
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


