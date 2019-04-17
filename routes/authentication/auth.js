const express = require('express');
const jwt = require('jsonwebtoken');
const connection = require('../connection.js');
const key = 'this_is_the_secret_key';
const tokenDuration = '600s';
// const app = express();


// app.post('/api/posts', verifyToken, (req, res)=>{
//     jwt.verify(req.token, 'secretkey', (err, authdata)=>{
//         if(err){
//             res.sendStatus(403);
//         } else { 
//            res.json({
//                message: 'Post created ...',
//                authdata: authdata
//            });
//         }
//     });
    
// });

exports.verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined')
    {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }else{
        res.json({
           message: 'Authorization failed.' 
        });
    }
};

exports.verify = (req, res) => {
    var resp;
    jwt.verify(req.token, key, (err, authdata)=>{
        console.log(err);
        if(!err){
            resp = authdata;
        }
    });
    return resp;
};

exports.checkPassword = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const query = 'select * from Users where Username = ? and Password = PASSWORD(?)';

    connection.query(query, [username, password], (err, records, fields)=>{
        if(err || records.length == 0 || records[0].username === undefined){
            res.json({
                status : 403,
                error : err,
                message : 'Username or password is incorrect'
            });
            return false;
        }
        else {
            res.json({
                status : 200,
                message : 'Username and password is correct'
            });
            return true;
        }
    });
};

exports.login =  (req, res) =>{
    const username = req.body.username;
    const password = req.body.password;
    const query = 'select * from Users where Username = ? and Password = PASSWORD(?)';

    connection.query(query, [username, password], (err, records, fields)=>{
        if(err || records.length == 0 || records[0].Username === undefined){
            res.json({
                error : err,
                message : 'Username or password is incorrect'
            });
            return;
        }
        const user = {
            userid: records[0].ID,
            username: records[0].Username,
            firstname: records[0].FirstName,
            lastname: records[0].LastName,
            email: records[0].Email
        };
        jwt.sign({user: user}, key, { expiresIn: tokenDuration}, (err, token)=>{
            res.json({
                token
            });
        });    
    });
    
};