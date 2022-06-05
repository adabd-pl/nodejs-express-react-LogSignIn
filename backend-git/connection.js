const mongoose = require("mongoose");
const {Room} = require("./models/Room.model");
const routes = require("./routes/routes");
const express = require("express");
const app = express();
var cors = require('cors')
const auth_routes = require("./routes/auth.router");
require("./routes/auth.router")(app);
// mongoDB connection
app.use(cors());

const corsOptions ={
    origin:'http://localhost:8081', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));


app.use(function(req, res, next) {
    console.log("set headers");
    res.setHeader("Access-Control-Allow-Origin", "*"); 
  
    res.setHeader(
       "Access-Control-Allow-Methods",
       "GET, POST, PATCH, PUT, DELETE, OPTIONS"
     )
     res.setHeader("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    if ('OPTIONS' === req.method) 
     { return res.send(200); }
  
    next();
  });
  
  


const mongoDB = "mongodb+srv://tinder-app:tinder-app@tinder-app.9fhqw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(mongoDB).then( () => {
   

		//app.use(express.json()) // new
		app.use("/api", routes)
        //app.use("/api1" , auth_routes)
		app.listen(5000, () => {
			console.log("Server has started!")
		})
});




