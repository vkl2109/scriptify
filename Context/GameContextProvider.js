import { 
    createContext, 
    useState, 
} from "react";

const GameContext = createContext();

const GameContextProvider = ({ children }) => {
    const [ sessionData, setSessionData ] = useState()

    return(
        <GameContext.Provider
            value={{
                sessionData,
                setSessionData
            }}
            >
            { children }
        </GameContext.Provider>
    )
}

export {
    GameContext,
    GameContextProvider
};