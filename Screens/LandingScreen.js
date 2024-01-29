import { 
    StyleSheet, 
    View,
    Image,
    KeyboardAvoidingView,
    useWindowDimensions
} from "react-native";
import { 
  useState,
  useContext,
  useEffect
} from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { 
    PrimaryButton,
    JoinGameModal,
    AuthModal,
    MainCarousel,
} from "../Components"
import { useNavigation } from "@react-navigation/native";
import logo from "../assets/logo.png"
import { AuthContext } from "../Context";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { getFunctions, httpsCallable } from "firebase/functions";
import { generateScenario } from '../constants'

export function LandingScreen () {
    const {height, width} = useWindowDimensions();
    const navigation = useNavigation();
    const [ joinGame, setJoinGame ] = useState(false)
    const { currentUser } = useContext(AuthContext)
    const [ isAuth, setIsAuth ] = useState(false)

    const handleStart = async () => {
        navigation.navigate("Categories")
        // testing only hehehehe
        // try { 
        //     const functions = getFunctions();
        //     const testScriptGenerator = httpsCallable(functions, 'testScriptGenerator');
        //     const result = await testScriptGenerator({
        //       scenario: generateScenario
        //     })
        //     console.log(result.data)
        // }
        // catch (e) {
        //   console.log(e)
        // }
    }

    useEffect(() => {
        if (currentUser == "") setIsAuth(true)
    },[currentUser])

    return(
        <SafeAreaView style={styles.container}>
            <JoinGameModal 
                isVisible={joinGame}
                setIsVisible={setJoinGame}
                />
            <AuthModal
                isVisible={isAuth}
                setIsVisible={setIsAuth}
                />
            <Image 
              source={logo}
              style={styles.logoImg(width)}
              />
            <MainCarousel />
            <View style={styles.lowerHalf(width)}>
                <PrimaryButton
                    onPress={handleStart}
                    text={"Start Game"}
                    />
                <View style={{ height: 20 }} />
                <PrimaryButton
                    variant="secondary"
                    onPress={()=>setJoinGame(true)}
                    text={"Join Game"}
                    />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#31304D",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 25,
  },
  lowerHalf:(w) => ({
    width: w,
    justifyContent: "center",
    alignItems: "center",
  }),
  title: {
    fontSize: 50,
    fontWeight: "bold",
    color: "white",
  },
  joinText: {
    margin: 5,
  },
  logoImg: (w) => ({
    width: w * 0.8,
    height: w * 0.3,
    resizeMode: "contain",
  })
});