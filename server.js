const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;
const connectionString = 'mongodb+srv://fanaticks:fanaticks@cluster0.4umhp0j.mongodb.net/';
const dbName = 'fanaticks'; 
const collectionName = 'events'; 

async function connectToDatabase() {
    try {
        const client = new MongoClient(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log('Connected to MongoDB');
        return client.db(dbName).collection(collectionName);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

app.use(express.json());

app.post('/createEvent', async (req, res) => {
    try {
        const eventData = req.body; 

        const eventCollection = await connectToDatabase();

        const result = await eventCollection.insertOne(eventData);

        res.status(201).json(result.ops[0]);
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/getEvents', async (req, res) => {
    try {
        const eventCollection = await connectToDatabase();

        const result = await eventCollection.find({}).toArray();

        res.status(200).json(result);
    } catch (error) {
        console.error('Error getting events:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
