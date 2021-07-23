var express = require('express');
var router = express.Router();
require('dotenv').config()
var snowflake = require('snowflake-sdk');
var jsonfile = require('jsonfile')
router.get('/', function(req,res){
  res.render('index')
});
// Configuration
var connection = snowflake.createConnection( {
    account:  process.env.DB_ACCOUNT,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
    }
    );
//Establish Connection
connection.connect( 
    function(err, conn) {
        if (err) {
            console.error('Unable to connect: ' + err.message);
            } 
        else {
            console.log('Successfully connected to Snowflake.');
            // Optional: store the connection ID.
            connection_ID = conn.getId();
            }
        }
    );
// Home page
router.get('/home', function(req, res, next) {
  res.render('index');
});
//Get user data
router.get('/getuserdata', function(req,res){
  connection.execute({
    sqlText: "select * from agent",
    complete: function(err, stmt, rows) {
      if (err) {
        console.error('Failed to execute statement due to the following error: ' + err.message);
        res.sendStatus(500)
      } else {
        // res.send(rows)
        var file = './agents.json'
        var obj = rows
        jsonfile.writeFile(file, obj, { spaces: 2, EOL: '\r\n' }, function (err) {
          if (err) console.error(err)
        })
        jsonfile.readFile(file, function (err, obj) {
          if (err) console.error(err)
          res.send(obj);
        })
      }
    }
  });
});
//Insert user data
// router.post('/insertuserdata', function(req,res){
//   // console.log(req.body)
//   connection.execute({
//     sqlText: "INSERT INTO Agent(agent_name) values ('"+req.body.name+"')",
//     complete: function(err, stmt, rows) {
//       if (err) {
//         console.error('Failed to execute statement due to the following error: ' + err.message);
//         res.sendStatus(500)
//       } else {
//         console.log(rows);
//         res.sendStatus(200)
//       }
//     }
//   });
// });
module.exports = router;
