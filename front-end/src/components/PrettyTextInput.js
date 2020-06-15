import React, { useState } from 'react'
import { TextInput } from 'react-native'

export default PrettyTextInput = (props) => {
    const [color, setColor] = useState("grey");
    return (
        <TextInput
            {...props}
            onFocus={() => setColor("coral")}
            onBlur={() => setColor("grey")}
            style={{ borderBottomColor: color, borderBottomWidth: 3 }}
        />
    )
}