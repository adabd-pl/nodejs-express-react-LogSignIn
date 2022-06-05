const config = require("../config/auth.config");
//const db = require("../models");
//const User = db.user;
//const Role = db.role;
const User = require("../models/User.model")
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    age: req.body.age  , 
    location : req.body.location , 
    sex: req.body.sex
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

          res.send({ message: "User was registered successfully!" });
    
  });
};

exports.signin = (req, res) => {
  User.findOne({
    name: req.body.name
  }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }


      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync("B4c0/\/", salt);
     
      
      // Load hash from your password DB.
      var passwordIsValid = bcrypt.compareSync("B4c0/\/", hash);
      console.log(passwordIsValid);
    /*  var hash =bcrypt.hashSync(user.password, 8);
      var hash1= "$2a$08$8zIW4dOYOXDQPbk2Il8F2esfd/hYr2.NkINoJEi114Lej6fJhA7a2";
      var test = "test";
      var passwordIsValid = bcrypt.compareSync(
        //req.body.password,
        //hash
        test,
        hash1
        
      );
*/
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        //accessToken: token,
        location: user.location,
        sex: user.sex,
        sexPreference: user.sexPreference,
        age: user.age
      });
    });
};
