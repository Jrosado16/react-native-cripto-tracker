import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from "react-native";
import Storage from '../../libs/Storage';
import colors from '../../res/colors';
import FavoritesEmpty from './FavoritesEmpty';
import CoinItem from '../coins/CoinItem';


class FavoritesScreen extends Component {

    state = { 
        favorites: []
    }

    componentDidMount(){
        this.props.navigation.addListener('focus', this.getFavorites)
    }

    componentWillUnmount(){
        this.props.navigation.removeListener('focus', this.getFavorites)
    }

    getFavorites = async () => {
        try {
            const allKeys = await Storage.instance.getAllKeys();
            const keys = allKeys.filter((key) => key.includes('favorite-'));

            const favs = await Storage.instance.multiGet(keys);
            const favorites = favs.map(fav => JSON.parse(fav[1]));

            this.setState({favorites});


        } catch (error) {
            
        }
    }

    handlePress = (coin) => {
        this.props.navigation.navigate('CoinDetail', {coin})
    }
    render() { 
        const {favorites} = this.state;
        return ( 
            <View style={styles.container}>
                {
                    favorites.length === 0 ?
                    <FavoritesEmpty /> :
                    null

                }
                {
                    favorites.length > 0 ?
                    <FlatList 
                        data={favorites}
                        renderItem={({item}) => 
                            <CoinItem 
                                item={item} 
                                onPress={() => this.handlePress(item)}

                            />
                        }
                    /> :
                    null
                }
            </View>
         );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.charade
    }
})
 
export default FavoritesScreen;