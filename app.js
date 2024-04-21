const express = require('express');
const cors = require('cors');
const collection = require('./mongo');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended:true}))
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/project1")

app.get("/collections", (req, res) => {
    collection.find()
    .then(users => res.json(users))
    .catch(err => res.json(err));
})
app.get("/collections/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const user = await collection.findById(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

app.put("/collections/:id", async (req, res) => {
    const id = req.params.id;
    const { name, email, password, count ,lastLogin} = req.body;

    try {
        const updatedUser = await collection.findByIdAndUpdate(id, { name, email, password, count,lastLogin }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(404).json({ error: "User not found" });
    }
});


app.post("/", async (req, res) => {
    const { name, email, password, count,lastLogin } = req.body;
    const data = {
        name: name,
        email: email,
        password: password,
        count: count,
        lastLogin: lastLogin
    };
    // Assuming `collection` is your MongoDB collection
    await collection.insertMany(data);
    res.send("Data inserted successfully");
});

app.listen(8000,()=>{
    console.log("port listening"); 
});
