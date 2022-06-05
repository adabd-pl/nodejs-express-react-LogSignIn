const mongoose = require("mongoose");

UserSchema = new mongoose.Schema({
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
    rooms: [String],
    age: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    sexPreference: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    gallery: [String]
}, {versionKey: false});

module.exports =  mongoose.model("User", UserSchema);
