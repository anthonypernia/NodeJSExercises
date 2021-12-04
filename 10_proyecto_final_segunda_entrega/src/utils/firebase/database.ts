var adminFirebase = require("firebase-admin");

var serviceAccount = require("./config/anthonystoreproject.json");

adminFirebase.initializeApp({
  credential: adminFirebase.credential.cert(serviceAccount)
});

let dbFirebase = adminFirebase.firestore()

export { dbFirebase };