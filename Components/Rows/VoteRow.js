import {
    StyleSheet,
    View,
    Text,
    useWindowDimensions
} from 'react-native'
import {
  doc,
  getDoc,
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { 
    useState,
    useEffect
} from 'react'
import { Entypo } from '@expo/vector-icons';

export function VoteRow ({ option, roundRef }) {
    const [key, value] = option
    const [ voteCount, setVoteCount ] = useState(0)

     useEffect(() => {
        const unsubscribe = onSnapshot(roundRef, (doc) => {
            if (doc.exists()) {
                const roundsData = doc.data()
                const voteArray = roundsData?.options[key]
                if (voteArray) setVoteCount(voteArray.length)
            }
        },
        (error) => {
            console.log(error)
            setError(true)
        })
        return () => unsubscribe()
    },[voteCount])

    return(
        <View style={styles.rowWrapper}>
            <View style={styles.wrapper}>
                <Text style={styles.choiceTxt}>{key}</Text>
                <View style={{flex: 1, alignItems: 'flex-end', flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <Text style={[styles.choiceTxt, { marginHorizontal: 5}]}>{voteCount}</Text>
                    <Entypo name="thumbs-up" size={24} color="#F0ECE5" />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    rowWrapper:{
        width: '100%',
        backgroundColor: '#161A30',
        borderBottomWidth: 2.5,
        borderColor: '#F0ECE5'
    },
    middleTxt: {
        color: '#B6BBC4',
        fontSize: 20,
        fontWeight: '200'
    },
    wrapper: {
        width: '100%',
        height: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
    },
    choiceTxt: {
        color: '#F0ECE5',
        fontWeight: 'bold',
        fontSize: 15,
    }
})

