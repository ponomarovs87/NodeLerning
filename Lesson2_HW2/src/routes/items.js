const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const router = express.Router();

const url = 'mongodb://localhost:27017';
const dbName = 'mydb';

async function connectDB() {
    const client = new MongoClient(url, { useUnifiedTopology: true });
    await client.connect();
    return client.db(dbName);
}

router.post('/', async (req, res) => {
    try {
        const db = await connectDB();
        const collection = db.collection('items');
        const result = await collection.insertOne(req.body);
        res.status(201).json(result.ops[0]);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const db = await connectDB();
        const collection = db.collection('items');
        const items = await collection.find({}).toArray();
        res.json(items);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const db = await connectDB();
        const collection = db.collection('items');
        const item = await collection.findOne({ _id: new ObjectId(req.params.id) });
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json(item);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const db = await connectDB();
        const collection = db.collection('items');
        const result = await collection.updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: req.body }
        );
        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json({ message: 'Item updated successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const db = await connectDB();
        const collection = db.collection('items');
        const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
