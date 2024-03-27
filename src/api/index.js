import { auth } from "../config/firebase.config";
import { onSnapshot, setDoc, doc, query } from "firebase/firestore";
import { db } from "../config/firebase.config";
import { collection, orderBy } from "firebase/firestore";



export const getUserDetail = () => {

    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged((userCred) => {
            if (userCred) {
                const userData = userCred.providerData[0];

                const unsubscribe = onSnapshot(
                    doc(db, "users", userData?.uid),
                    (_doc) => {
                        if (_doc.exists()) {
                            resolve(_doc.data());
                        } else {
                            setDoc(doc(db, "users", userData?.uid), userData)
                                .then(() => {
                                    resolve(userData);
                                })
                        }
                    }
                );


                return unsubscribe;
            } else {
                reject(new Error("User is not authenticated"));
            }
            unsubscribe(); // Stop listening for auth state changes
        });
    });
}


export const getTemplates = () => {
    return new Promise((resolve, reject) => {
        const templateQuery = query(
            collection(db, "templates"),
            orderBy("timestamp", "asc")
        );
        const unsubscribe = onSnapshot(templateQuery, (querySnap) => {
            const templates = querySnap.docs.map((doc) => doc.data());
            resolve(templates);
        }, reject);

        // Return the unsubscribe function
        return unsubscribe;
    });
};


