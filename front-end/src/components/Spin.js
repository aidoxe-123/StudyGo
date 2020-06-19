import Spinner from 'react-native-loading-spinner-overlay';
import { TodoStyles } from '../../style/TodoStyles';
import React from 'react'

export default Spin = (props) => {
    return (<Spinner
        {...props}
        textContent='Loading...'
        textStyle={TodoStyles.spinner}
    />)
}