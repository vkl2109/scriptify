import { createContext, useState, useEffect } from "react";
import * as SecureStore from 'expo-secure-store';
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid';
import {
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [ deviceID, setDeviceID ] = useState(null)
    const [ currentUser, setCurrentUser ] = useState(null)

    useEffect(() => {
        const initializeDeviceID = async () => {
            let deviceKey = await checkID();
            if (!deviceKey) {
                let newDeviceKey = await setNewID();
                if (newDeviceKey) {
                    setDeviceID(newDeviceKey);
                    checkUser(newDeviceKey)
                }
            } else {
                setDeviceID(deviceKey);
                checkUser(deviceKey)
            }
        };

        initializeDeviceID();
    },[])

    const checkUser = async (key) => {
        try {
            const userRef = doc(db, "users", key);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                const userData = userDoc.data()
                setCurrentUser(userData?.name)
            }
        }
        catch (e) {
            console.log(e)
        }
    }

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
                deviceID,
                currentUser,
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