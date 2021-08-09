import React from 'react';
import { View, Text, StyleSheet } from "react-native";
const FavoritesEmpty = () => {
    return ( 
        <View style={styles.container}>
            <Text style={styles.text}>You don't have any favorite yet</Text>
        </View>
     );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center'
    },
    text: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center'
    }
})
 
export default FavoritesEmpty;