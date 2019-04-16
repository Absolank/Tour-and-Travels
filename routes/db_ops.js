const mysql = require('mysql');


const hostname = "localhost";
const username = "root";
const passwd = "password";
const database_name = "TourAndTravels";

const connection = mysql.createConnection(
    {
        host: hostname,
        user: username,
        password: passwd,
        database: database_name
    }
);

connection.connect((err) => {
    if(err) {
        console.log('ERROR::Unable to connect to mysql database ' + database_name + '!!!');
        throw err;
    }
    console.log('Connection Successfull!!');
});


exports.addlocation = function(req, res){
        var location = [
            0,
            req.body.name,
            req.body.location_name
        ];
        connection.query('select max(ID) as max from Location', (err, results, fields)=>{
            if(err || results.length == 0) throw err;
            if(results[0].max == null){
                location[0] = 0;
            }
            else
                location[0] = results[0].max + 1;


            connection.query('insert into Location values (?, ?, ?)', location, (err, results, fields) => {
                if (err) {
                    console.log("error ocurred",err);
                    res.send({
                      "code":400,
                      "failed":"error ocurred"
                    });
                  }else{
                      res.send({'code' : 200, 'message' : 'location successfully added'});
                  }
            });
        });
};
exports.getLocation = function(req, res){
    const location = req.query.name;
    connection.query('select * from Location where Name = ?', location, (err, results, fields) => {
        if (err) {
            console.log("error ocurred",err);
            res.send({
              "code":400,
              "failed":"error ocurred"
            });
          }else{
            console.log('The solution is: ', results);
            res.json(results);
          }
    });
};
exports.deleteLocation = function(req, res){
    const location = req.params.lname;
    console.log(location);
    connection.query('delete from Location where Name = ?', location, (err, results, fields) => {
        if (err) {
            console.log("error ocurred",err);
            res.send({
              "code":400,
              "failed":"error ocurred"
            });
          }else{
            res.json(results);
          }
    });

};

exports.addUser = function(req, res){
    const username = req.body.username;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;


    console.log(username + " " + firstname + " " + lastname + " " + email + " " + password);
    if(username == null || firstname == null || lastname == null || email == null || password == null)
    {
        res.send({
            'error' : '400',
            'message' : 'empty fields'
        });
        return;
    }
    const queryUrl = 'insert into Users (Username, FirstName, LastName, Email, Password) values (?, ?, ?, ?, PASSWORD(?))';

    connection.query(queryUrl, [username, firstname, lastname, email, password], (err, results, fields) => {
        if (err) {
            console.log("error ocurred",err.code);
            res.send({'err':[err.errno, err.code]});
          }else{
            res.json(results);
          }
    });
};

exports.searchUser = function(req, res){
    var queryUrl = 'select * from Users ';
    var toAppend = 'where ';
    const username = req.query.username;
    const firstname = req.query.firstname;
    const lastname = req.query.lastname;
    const email = req.query.email;

    console.log(username + " " + firstname + " " + lastname + " " + email);

    var list = [];
    if(username != null){
        toAppend += "Username = ? ";
        list.push(username);
    }
    if(firstname != null){
        if(list.length > 0)
            toAppend += " and ";

        toAppend += "FirstName = ?";
        list.push(firstname);
    }
    if(lastname != null){
        if(list.length > 0)
            toAppend += " and ";
        toAppend += "and LastName = ?";
        list.push(lastname);
    }

    if(email != null){
        if(list.length > 0)
            toAppend += "Email = ?";
        toAppend += "and Email = ?";
        list.push(email);
    }
    console.log(list);
    console.log(toAppend);
    if(list.length > 0)
        queryUrl += toAppend;
    console.log(queryUrl);

    
    
    connection.query(queryUrl, list, (err, results, fields) => {
        if (err) {
            console.log("error ocurred",err);
            res.send({
              "code":400,
              "failed":"error ocurred"
            });
          }else{
            res.json(results);
          }
    });
};