var adminFirebase = require("firebase-admin");

var serviceAccount = require("./config/anthonystoreproject-firebase-adminsdk-t5und-422ee90412.json");

adminFirebase.initializeApp({
  credential: adminFirebase.credential.cert(serviceAccount)
});

let dbFirebase = adminFirebase.firestore()

export { dbFirebase };