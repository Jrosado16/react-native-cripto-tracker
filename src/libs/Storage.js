import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage {

    static instance = new Storage();

    store = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value) 
            return true
        } catch (error) {
            console.log('storage store err', error)
            return false
        }
    } 

    get = async (key) => {
        try {
            return await AsyncStorage.getItem(key) 
        } catch (error) {
            console.log('storage get err', error)
            
            throw Error(err)
        }
    }

    multiGet = async (keys) => {
        try {
            return await AsyncStorage.multiGet(keys) 
        } catch (error) {
            console.log('storage multiget err', error)
            
            throw Error(err)
        }
    }

    getAllKeys = async () => {
        try {
            return await AsyncStorage.getAllKeys() 
        } catch (error) {
            console.log('storage getAllKeys err', error)
            
            throw Error(err)
        }
    }
    
    remove = async (key) => {
        try {
            await AsyncStorage.removeItem(key) 
            return true
        } catch (error) {
            console.log('storage remove err', error)
            
            return false
        }
    }
}

export default Storage;