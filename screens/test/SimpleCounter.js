import * as React from 'react';
import { Text, TextInput, TouchableOpacity, View } from "react-native"
import { incrementAction, decrementAction, changeByAmount } from "../utilities/Redux/Reducers/Test/Actions"
import { connect, useSelector } from 'react-redux';

const SimpleCounter = (props) => {

    const increment = () => {
        props.dispatch(incrementAction());
    };

    const decrement = () => {
        props.dispatch(decrementAction());
    };

    const handleInputChange = (event) => {
        props.dispatch(changeByAmount(event.nativeEvent.text));
    };

    return (
        <View>
            <Text style={[{fontSize:30}]}>Test: {props.test}</Text>
            <Text style={[{fontSize:30}]}>Counter: {props.amount}</Text>
            <View>
                <TouchableOpacity onPress={increment}>
                <Text style={[{fontSize:50}]}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={decrement}>
                <Text style={[{fontSize:100}]}>-</Text>
                </TouchableOpacity>
            </View>
            <TextInput onSubmitEditing = {handleInputChange} keyboardType = 'numeric' placeholder= "change amount"/> 
        </View>
    )

}

const mapStateToProps = (state, props) => {
    return {
        amount : state.test.amount,
        test : state.test.test
    };
}

export default connect(mapStateToProps)(SimpleCounter);