/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import * as SecureStore from 'expo-secure-store';
import { v4 as uuidv4 } from 'uuid';

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [ deviceID, setDeviceID ] = useState(null)

    useEffect(() => {
        let deviceKey = checkID()
        if (!deviceKey) {
            setNewID()
        }
        else {
            setDeviceID(deviceKey)
        }
    },[deviceID])

    const setNewID = async () => {
        try {
            let newKey = uuidv4();
            await SecureStore.setItemAsync(Scriptify, newKey)
        }
        catch (e) {
            console.log(e)
        }
    }

    const checkID = async () => {
        try {
            let result = await SecureStore.getItemAsync(Scriptify)
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