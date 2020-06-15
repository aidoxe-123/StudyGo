import React, { useState, Children } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'

// props: style, selected, onPress
function RadioButton(props) {
    return (
        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={props.onPress} >
            <View style={[{
                height: 24,
                width: 24,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: '#000',
                alignItems: 'center',
                justifyContent: 'center'
            }, props.style]}>
                {
                    props.selected ?
                        <View style={{
                            height: 12,
                            width: 12,
                            borderRadius: 6,
                            backgroundColor: '#000',
                        }} />
                        : null
                }
            </View>
        </TouchableOpacity>
    );
}

// props: onPressIndex, initialChoice
export default function RadioButtons(props) {
    const [value, setValue] = useState(props.initialChoice);
    return (
        Children.map(props.children, (child, index) => (
            <View style={{ flexDirection: "row", alignItems: 'center' }}>
                <View style={{ padding: "5%" }}>
                    <RadioButton selected={value === index} onPress={() => {
                        setValue(index);
                        props.onPressIndex(index);
                    }}
                    />
                </View>
                {child}
            </View>
        ))
    )
}
