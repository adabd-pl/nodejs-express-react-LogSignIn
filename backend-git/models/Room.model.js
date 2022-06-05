const mongoose = require("mongoose");
const Message = require("./Message.model");

const RoomSchema = new mongoose.Schema({
    roomID: {
        type: String,
        required: true
    },
    messages: [{
        type: MessageSchema
    }]
})

module.exports = mongoose.model("Room", RoomSchema);
