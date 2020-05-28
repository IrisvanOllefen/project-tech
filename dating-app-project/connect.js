const { MongoClient } = require("mongodb");
const dotEnv = require("dotenv").config();

const db = require("db");
db.connect({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
});

// Replace the following with your Atlas connection string

const url =
  "mongodb+srv://myUser:myPassword1@cluster0-kskci.azure.mongodb.net/test?retryWrites=true&w=majority";

const client = new MongoClient(url, {
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
