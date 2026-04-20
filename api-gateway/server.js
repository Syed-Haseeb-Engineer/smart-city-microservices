const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); 

// FIX: Using 127.0.0.1 forces IPv4 routing, fixing the connection hang!
mongoose.connect('mongodb://127.0.0.1:27017/SmartCityDB')
    .then(() => console.log("[Database] MongoDB connected securely."))
    .catch(err => console.error("[Database Error] ", err));

const citizenSchema = new mongoose.Schema({
    name: { type: String, required: true },
    nationalId: { type: String, required: true, unique: true }, 
    email: { type: String, required: true }
});
const Citizen = mongoose.model('Citizen', citizenSchema);

app.post('/api/register', async (req, res) => {
    console.log("\n[API] Incoming Citizen Registration:", req.body); // Logs the data to terminal
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

app.listen(3000, '127.0.0.1',  () => console.log("Node Gateway running on port 3000"));
