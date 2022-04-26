const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7filv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const volunteerCollection = client
      .db(`${process.env.DB_NAME}`)
      .collection(`${process.env.DB_COLLECTION}`);
    const donateUserCollection = client
      .db(`${process.env.DB_NAME}`)
      .collection(`donateUser`);

    //   get all volunteers
    app.get("/volunteers", async (req, res) => {
      const cursor = volunteerCollection.find({});
      const volunteers = await cursor.toArray();
      res.send(volunteers);
    });

    //  get volunteer by id
    app.get("/volunteer/:id", async (req, res) => {
      const id = req.params.id;
      const cursor = volunteerCollection.find({ _id: ObjectId(id) });
      const volunteer = await cursor.toArray();
      res.send(volunteer);
    });

    // post to donate user
    app.post("/volunteer", async (req, res) => {
      const query = req.body;
      const result = await donateUserCollection.insertOne(query);
      res.send(result);
    });

    // donate volunteer data

    app.get("/donate/:email", async (req, res) => {
      const email = req.params.email;
      const cursor = donateUserCollection.find({ email: email });
      const result = await cursor.toArray();
      res.send(result);
    });
  } finally {
    // client.close();
  }
}
run();
app.get("/", (req, res) => {
  res.send("hey express what's up");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
