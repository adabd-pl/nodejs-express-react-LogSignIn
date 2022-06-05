const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const {Server} = require("socket.io");


const route = require("./routes/routes");


app.use(cors());
app.use(route)
//MongoDB
const mongoose = require("mongoose");
const db = require("./connection");
// Mongo Schema
const Room = require("./models/Room.model");
const User = require("./models/User.model")
const Message = require("./models/Message.model");

const Rooms = mongoose.model("Room");
const Users = mongoose.model("User");

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:4000",
        methods: ["GET","POST"],
    }
})


io.on("connection", (socket) => {
    console.log("connected user: ",socket.id);
    // Message.find().then( result => {
    //     socket.emit("output_messages", result)
    // })

    // Rooms.find({},{messages: 1}, (err, data) => {
    //     console.log(err, data, data.length)
    // })

    // Rooms.find({}, (err, data) => {
    //     console.log(err,data)
    // })

    // Rooms.updateOne(
    //     {
    //     roomID: "12345"
    //     },
    //     {
    //         $push:{
    //             messages: {
    //                 sender: "user1",
    //                 receiver: "user2",
    //                 senderAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cG9ydHJhaXR8ZW58MHx8MHx8&w=1000&q=80",
    //                 receiverAvatar: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    //                 message: "Lorem ipsum data 123",
    //                 date: new Date()
    //
    //             }
    //             ,
    //         }
    //     },
    // ).then((e )  => {console.log(e)})

    // new TMP USER
    // const user = new User({
    //     name: "Di",
    //     email: "sasha@gmail.com",
    //     password: "sasha1",
    //     rooms: [],
    //     age: 36,
    //     location: "Warsaw",
    //     sex: "man",
    //     sexPreference: "women",
    //     description: "netflix & chill",
    //     gallery: []
    // })
    // user.save().then((e) => console.log(e))


    // Users.updateOne(
    //     {_id:"62825b67f5c2addc780c65e1"},
    //     {$push: {
    //         rooms: "62825b67f5c2addc780c65e1"
    //         }}
    // )
    // Users.updateOne(
    //     {_id:"62825ab320087ff2ff20d238"},
    //     {$push: {
    //             rooms: "62825ab320087ff2ff20d238"
    //         }}
    // )


    // Users.updateOne(
    //     {_id:"62825b67f5c2addc780c65e1"},
    //     {$push : {
    //         rooms: "62825ab320087ff2ff20d238"
    //         }
    // }).then((er, data) => {
    //     console.log(er, data)
    // })

    // const room = new Room({roomID:"1235easd", messages: []})
    // room.save().then(() => console.log("saved"))

    // const room = new Room({roomID:"1235easd", messages: []})
    // room.save().then(() => console.log("saved"))


    // loading single room with messages
    socket.on("load_room", (roomID) => {
        Rooms.findOne({roomID: roomID},{messages: 1}, (err, data) => {
            io.emit("messages", data)
        })
    })

    socket.on("new_message", (user1,user2, msg) => {

    })

    socket.on("hello", () => {
        console.log("HELLO :)")
    })


    socket.on("disconnect", () => {
        console.log("disconnected user: ", socket.id)
    })
})


server.listen(4001, () => {
    console.log("server running")
})
