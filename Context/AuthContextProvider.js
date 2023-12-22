import { createContext, useState, useEffect } from "react";
import * as SecureStore from 'expo-secure-store';
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid';

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [ deviceID, setDeviceID ] = useState(null)

    useEffect(() => {
        const initializeDeviceID = async () => {
            let deviceKey = await checkID();
            if (!deviceKey) {
                let newDeviceKey = await setNewID();
                if (newDeviceKey) setDeviceID(newDeviceKey);
            } else {
                setDeviceID(deviceKey);
            }
        };

        initializeDeviceID();
    },[])

    const setNewID = async () => {
        try {
            let newKey = uuidv4();
            await SecureStore.setItemAsync('Scriptify', newKey)
            return newKey;
        }
        catch (e) {
            console.log(e)
            return false;
        }
    }

    const checkID = async () => {
        try {
            let result = await SecureStore.getItemAsync('Scriptify')
            return result
        }
        catch (e) {
            console.log(e)
            return false
        }
    }

    return(
        <AuthContext.Provider
            value={{
                deviceID
            }}
            >
            { children }
        </AuthContext.Provider>
    )
}

export {
    AuthContext,
    AuthContextProvider
};