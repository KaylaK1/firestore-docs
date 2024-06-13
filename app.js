// To initialize and get a reference to Firestore Service
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import "dotenv/config";
// To add Data
import { collection, addDoc, setDoc, getDocs, doc } from "firebase/firestore";

// Initialize Cloud Firestore
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


// Add Data
// Will auto-generate an ID
const addData = async () => {
    try {
        const docRef = await addDoc(collection(db, "users"), {
            first: "Alan",
            middle: "Mathison",
            last: "Turing",
            born: 1912
        });
        console.log("Document written with ID: ", docRef.id);
        console.log("The document: ", docRef);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

addData();


// Set Doc
// Creates or overwrites a single document. 
const setADoc = async () => {
    try {
        const docRef = await setDoc(doc(db, "cities", "LA"), {
            name: "Los Angeles",
            state: "CA",
            country: "USA"
        });
        console.log("Document set with ID: ");
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

setADoc();

// Set Doc
// To specify that data should be merged and not overwritten
// For documents containing maps - specifying a set with a field containing an empty map 
// will overwrite the target document's map field.
const setDocMerge = async () => {
    try {
        const cityRef = doc(db, 'cities', 'LA');
        const docRef = await setDoc(cityRef, { cool: true }, { merge: true});
        console.log("Document data was merged with ID: ");
    } catch (e) {
        console.error("Error merging with setDoc: ", e);
    }
}

setDocMerge();

// Read Data
const readData = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
    });
}

readData();

// Se