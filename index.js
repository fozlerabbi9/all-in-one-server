const express = require('express');
const cors = require('cors');
require('dotenv').config()
// var jwt = require('jsonwebtoken');
// const res = require('express/lib/response');
const app = express()
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.BD_USER}:${process.env.DB_PASS}@cluster0.hdkgq.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const dataCollection = client.db("pabnaBikeCorner").collection("bikeData");
        
        let email;
        app.get('/bikeData', async (req, res) => {
            email = req?.query?.email;
            console.log(email);
            const query = {};
            const cursor = dataCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })

    }
    catch {

    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send("website is running")
})

    // For port running
app.listen(port, () => {
    console.log("listening port:", port);
})