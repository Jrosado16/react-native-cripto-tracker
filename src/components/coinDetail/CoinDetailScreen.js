import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, SectionList, FlatList, Pressable, Alert } from 'react-native';
import Colors from '../../res/colors';
import Http from '../../libs/Http';
import CoinMarketIitem from './CoinMarketItem';
import Storage from '../../libs/Storage';

class CoinDetailScrren extends Component {

    state = { 
        coin: {},
        markets: [],
        isFavorite: false
     }

     toogleFavorite = () => {
        if(this.state.isFavorite){
            this.removeFavorite();
        }else{
            this.addFavorite();
        }
     }

    addFavorite = async () => {
        const coin = JSON.stringify(this.state.coin);
        const key = `favorite-${this.state.coin.id}`;

        const stored = await Storage.instance.store(key, coin);
        console.log('stored', stored)
        if(stored){
            this.setState({ isFavorite: true })
        }
    }
    removeFavorite = () => {
        Alert.alert('Remove Favorite', 'Are you sure?',
        [
            {
                text: 'Cancel',
                onPress: () => {},
                style: 'cancel'
            },
            {
                text: 'Remove',
                onPress: async () => {
                    const key = `favorite-${this.state.coin.id}`;
                    await Storage.instance.remove(key);
                    this.setState({ isFavorite: false })
                },
                style: 'destructive'
            }
        ]
        )



    }

    getFavorite = async () => {

        try {
            const key = `favorite-${this.state.coin.id}`;
            const favStr = await Storage.instance.get(key);
    
            console.log(favStr)
            if(favStr != null){
                this.setState({ isFavorite: true })
            }
        } catch (error) {

            console.log('error get favorite', error)
            
        }
       

    }
    componentDidMount(){
        const { coin } =  this.props.route.params;
        this.props.navigation.setOptions({ title: coin.name})
        this.getMarkets(coin.id);
        this.setState({ coin }, () => {
            this.getFavorite()
        });
    }

    getImgSymbol = (name) => {
        if(name){
            const symbol = name.toLowerCase().replace(' ', '-');
            return `https://c1.coinlore.com/img/25x25/${symbol}.png`
        }

    }

    getMarkets = async (coinId) => {

        const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`
        const markets = await Http.instance.get(url);
        this.setState({markets})

    }

    getSection = (coin) => {
        const section = [
            {
                title: 'Market cap',
                data: [coin.market_cap_usd]
            },
            {
                title: 'Volume 24h',
                data: [coin.volume24]
            },
            {
                title: 'Change 24 hrs',
                data: [coin.percent_change_24h]
            }
        ];

        return section;
    }
    render() { 
        const { coin, markets, isFavorite } = this.state;

        return ( 
            <View style={styles.container}>
                <View style={styles.subHeader}>
                    <View style={styles.row}>
                        <Image
                            style={styles.iconImage}
                            source={{ uri: this.getImgSymbol(coin.name)}}
                            />
                        <Text style={styles.titleText}> { coin.name } </Text>
                    </View>

                    <Pressable
                        onPress={this.toogleFavorite}
                        style={[
                            styles.btnFavorite,
                            isFavorite ? 
                            styles.btnFavoriteRemove :
                            styles.btnFavoriteAdd
                        ]}
                    >
                        <Text style={styles.btnFavoriteText}>{ isFavorite ? 'Remove favorite' : 'Add favorite'}</Text>
                    </Pressable>
                </View>

                <SectionList
                    style={styles.section}
                    sections={this.getSection(coin)}
                    keyExtractor={(item) => item}
                    renderItem={({item}) => 
                        <View style={styles.sectionItem}>
                            <Text style={styles.sectionText}> {item} </Text>
                        </View>
                    }
                    renderSectionHeader={({section}) => 
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionText}> {section.title} </Text>
                        </View>
                    }
                />

                <Text style={styles.marketTitle}>Markets</Text>
                <FlatList 
                    style={styles.list}
                    horizontal={true}
                    data={markets}
                    renderItem={({item}) => <CoinMarketIitem item={item}/>}
                />
            </View>
         );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.charade
    },
    subHeader: {
        backgroundColor: 'rgba(0,0,0, 0.1)',
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // alignSelf: 'center'
    }, 
    row: {
        flexDirection: 'row'
    },   
    section: {
        maxHeight: 220
    },  
    list: {
        maxHeight: 100,
        paddingLeft: 16
    },
    marketTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingBottom: 16, 
        color: '#fff'
    },  
    titleText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 8
    },  
    iconImage: {
        width: 25,
        height: 25
    },
    sectionHeader: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        padding: 8
    },
    sectionItem: {
        padding: 8
    },
    itemText: {
        color: '#fff',
        fontSize: 14
    },
    sectionText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold'
    },
    btnFavorite: {
        padding: 8,
        borderRadius: 8
    },
    btnFavoriteText: {
        color: Colors.white,
    },
    btnFavoriteAdd: {
        backgroundColor: Colors.picton
    },
    btnFavoriteRemove: {
        backgroundColor: Colors.carmine
    }
})
 
export default CoinDetailScrren;