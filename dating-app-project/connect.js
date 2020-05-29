const { MongoClient } = require("mongodb");
require("dotenv").config();
// Replace the following with your Atlas connection string

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/test?retryWrites=true&w=majority`;

const client = new MongoClient(url, {
  useUnifiedTopology: true,
});

const dbName = "myDatingApp";

async function run() {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("books");

    console.log("Connected correctly to server");
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

module.exports = run;
