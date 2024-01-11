import { getFirestore } from "firebase-admin/firestore";
import firebaseConfig from "./config.js";
import serviceAccount from "./serviceAccount.json" assert { type: "json" };
import admin from "firebase-admin";
import * as fs from "fs";

console.log("Initializing Firebase");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: firebaseConfig.databaseURL,
});

const db = getFirestore();

// TODO: replace following with your file
// This will create collection named 'users' with data from users.json
const dataKey = "users";
const dataFile = "./data/users.json";

const data = JSON.parse(fs.readFileSync(dataFile, "utf-8"));

if (
  data &&
  typeof data === "object" &&
  data[dataKey] &&
  typeof data[dataKey] === "object"
) {
  console.log(`${dataFile} - have ${data[dataKey].length} records to process`);
  for (let i = 0; i < data[dataKey].length; i++) {
    try {
      let record = data[dataKey][i];
      db.collection(dataKey).add(record);
    } catch (ex) {
      console.error(`Exception on`);
    }
  }
} else {
  console.error(`ERROR: dataFile (${dataFile})`);
  console.error(`ERROR: typeof data (${typeof data})`);
  console.error(`ERROR: typeof data[${dataKey}] - (${typeof data[dataKey]})`);
}
