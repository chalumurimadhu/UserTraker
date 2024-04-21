const mongoose = require('mongoose');
// mongoose.connect("mongodb://localhost:27017/project1")
// .then(()=>{
//     console.log("connected");
// })
// .catch(()=>{
//     console.log("failed");
// })

const newSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    count: {
        type: String,
        default: "0"
    },
    lastLogin :{
        type: String,
        default: "",
    }
})

const collection = mongoose.model("collection",newSchema);

module.exports = collection;