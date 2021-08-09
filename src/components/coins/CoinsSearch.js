import React from 'react';
import { useState } from 'react';
import { View, TextInput, StyleSheet, Platform } from 'react-native'
import colors from '../../res/colors';
const CoinsSearch = (props) => {

    const [query, setQuery] = useState('');

    const handelText = (text) => {
        console.log(text)
        setQuery(text)

        if(props.onChange){
            props.onChange(text)
        }
    }

    return ( 
        <View>
            <TextInput
                style={[
                    styles.textInput,
                    Platform.OS == 'ios' ?
                    styles.textInputIOS : 
                    styles.textInputAndroid
                ]}
                onChangeText={handelText}
                value={query}
                placeholder='Search coin'
                placeholderTextColor='#fff'
                
            />
        </View>
     );
}
 
const styles = StyleSheet.create({
    textInput: {
        height: 46,
        backgroundColor: colors.charade,
        paddingLeft: 16,
        color: '#fff',
    },
    textInputAndroid: {
        borderBottomWidth: 2,
        borderBottomColor: colors.zircon
    },
    textInputIOS: {
        margin: 8,
        borderRadius: 8
    }

})
export default CoinsSearch;