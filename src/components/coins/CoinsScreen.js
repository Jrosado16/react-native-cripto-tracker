import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, Pressable, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import Http from '../../libs/Http';
import CoinItem from './CoinItem';
import Colors from '../../res/colors';
import CoinsSearch from './CoinsSearch';


const URL = "https://api.coinlore.net/api/tickers/"
const CoinsScreen = (props) => {

    const [ coins, setCoins ] = useState([])
    const [ allCoins, setAllCoins ] = useState([])
    const [ loading, setLoading ] = useState(false)

    useEffect(  () => {

        const getCoins = async () => {
            setLoading(true);
            const coins = await  Http.instance.get(URL);
            setCoins(coins.data)
            setAllCoins(coins.data)
            setLoading(false)

        }
        getCoins();
    }, [])

    const handleSearch = (query) => {

        const coinsFilter = allCoins.filter((coin) => {
            return coin.name.toLowerCase().includes(query.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(query.toLowerCase())
        });

        setCoins(coinsFilter);

    }

    const handelPress = (coin) => {
        props.navigation.navigate('CoinDetail', {coin})
    }
    return ( 
        <View style={styles.container}>
            {/* <Text style={styles.titleText}>Coins Screen</Text>
            <Pressable style={styles.btn} onPress={handelPress}>
                <Text style={styles.btnText}>Ir a Detail</Text>
            </Pressable> */}

            <CoinsSearch 
                onChange={handleSearch}
            />

            {
                loading ? 
                <ActivityIndicator 
                    style={styles.loader}
                    color="#ff5500"
                    size="large"
                />
                : null
            }

            <FlatList 
                data={coins}
                renderItem={({item}) => 
                <CoinItem 
                    item={item}
                    onPress={() => handelPress(item)}
                />
            }
            />
        </View>
     );
}

const styles = StyleSheet.create({
    loader: {
        marginTop: 60
    },
    container: {
        flex: 1,
        backgroundColor: Colors.charade,
    },
    titleText: {
        textAlign: 'center'
    },
    btn: {
        padding: 8,
        backgroundColor: '#ff5500',
        borderRadius: 8,
        margin: 16,
    },
    btnText: {
        color: '#fff',
        textAlign: 'center'
    }
})
export default CoinsScreen;