import { db } from "../firebase"
import {
  doc,
  getDoc,
} from "firebase/firestore";

const fetchDoc = async (category, id) => {
    try {
        const docRef = doc(db, category, id)
        const docSnap = await getDoc(docRef)
        if (!docSnap.exists()) return false
        const docData = docSnap.data()
        return docData
    }
    catch (e) {
        console.log(e)
        return false
    }
}

export {
    fetchDoc
}