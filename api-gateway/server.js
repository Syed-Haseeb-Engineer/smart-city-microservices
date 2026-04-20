require('dotenv').config(); // Professional standard: Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); 


const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/SmartCityDB';
const PORT = process.env.PORT || 3000;


mongoose.connect(MONGO_URI)
    .then(() => console.log("[Database] MongoDB connected securely via Environment Config."))
    .catch(err => console.error("[Database Error] ", err));

const citizenSchema = new mongoose.Schema({
    name: { type: String, required: true },
    nationalId: { type: String, required: true, unique: true }, 
    email: { type: String, required: true }
});
const Citizen = mongoose.model('Citizen', citizenSchema);

app.post('/api/register', async (req, res) => {
    // Logging the incoming payload to verify the Angular frontend is sending data correctly
    console.log("\n[API] Processing new registration payload:", req.body); 
    try {
        const newCitizen = new Citizen(req.body);
        await newCitizen.save();
        console.log("[API] Success: Citizen saved to MongoDB!");
        res.status(201).json({ message: "Registration successful!" });
    } catch (error) {
        console.log("[API] Error:", error.message);
        res.status(400).json({ error: "Validation failed or duplicate ID." });
    }
});

app.listen(PORT, '127.0.0.1', () => console.log(`Node Gateway running securely on port ${PORT}`));
