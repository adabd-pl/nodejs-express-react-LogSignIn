const express = require("express")
const User = require("../models/User.model")
const controller = require("../controllers/auth.controller");
const verifySignUp = require("../middlewares/verifySignUp");
const config = require("../config/auth.config");

var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const router = express.Router()
const { authJwt } = require("../middlewares");
router.get("/users", async (req, res) => {
    try{
    const users = await User.find();
    res.send(users)
}
    catch (err) {
        console.log(err);
        return;
    }
  
})

router.get("/users/:name", [authJwt.verifyToken], async (req, res) => {
	const user = await User.findOne({ name: req.params.name })
	res.send(user)
})

router.post("/api/auth/signin/:name/:password",async(req, res) => {
   // console.log(req.params);
    
  
    const user = await User.findOne({
      name: req.params.name,
      
    }).then( user=> {
        
       //console.log(req.params);
       
     //  console.log(res.headers);
        if (!user) {
         res.status(404).send({ message: "User Not found." });
          return;
        } 
        
       
        var passwordIsValid = bcrypt.compareSync(
        req.params.password,
        user.password
        );
  
        if (!passwordIsValid) {
          return res.status(401).send({
            token: null,
            message: "Invalid Password!"
          });
        }
  
        var token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400 // 24 hours
        });
       
        console.log(token);
        res.send({user, token: token})
      });
   
    })

router.post( "/api/auth/signup",
[  verifySignUp.checkDuplicateUsernameOrEmail],
 async (req, res) => {
     try{
    console.log(req.query);
   
     }
     catch (err) {
        console.log(err);
        return;
    }
  
    const user = new User({
        name: req.query.name,
        email: req.query.email,
        password: bcrypt.hashSync(req.query.password, 8),
        description : "test",
        sexPreference: req.query.sexPreference,
        sex:  req.query.sex,
        location: req.query.location,
        age: req.query.age
  
      });
    await user.save((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
        res.send({ message: "User was registered successfully!" });
    });

})

module.exports = router