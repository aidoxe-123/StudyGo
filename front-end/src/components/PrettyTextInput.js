import React, { useState } from 'react'
import { TextInput } from 'react-native'

export default PrettyTextInput = (props) => {
    const [color, setColor] = useState("grey");
    return (
        <TextInput
            {...props}
            onFocus={() => setColor("#e76f51")}
            onBlur={() => setColor("grey")}
            style={{ 
                borderBottomColor: color, 
                borderBottomWidth: 1,
                fontFamily: 'sourcesanspro-regular',
                fontSize: 20
            }}
        />
    )
}