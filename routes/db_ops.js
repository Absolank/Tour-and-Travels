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
    if(!req.body)
        return res.send({"status" : "error"});
    if(!req.body.name || !req.body.image_location) {
        return res.send({"status": "error", "message": "missing a parameter"});
    }
        var location = [
            0,
            req.body.name
        ];
        var image = [
            0,
            0,
            req.body.image_location
        ];
        var id;
        connection.query('select max(ID) as max from Location', (err, results, fields)=>{
            if(err) throw err;
            if(results[0].max == '')
                lid = 1;
            else
                lid = results[0].max + 1;
        });

        connection.query('select max(ID) as max from Images', (err, results, fields)=>{
            if(err) throw err;
            if(results[0].max == '')
                iid = 1;
            else
                iid = results[0].max + 1;
        });

        location[0] = lid;
        image[0] = iid;
        image[1] = lid;

        connection.query('insert into Location values ?', location, (err, results, fields) => {
            if (err) {
                console.log("error ocurred",error);
                res.send({
                  "code":400,
                  "failed":"error ocurred"
                });
              }else{
                console.log('The solution is: ', results);

              }
        });
};
exports.getLocation = function(req, res){
    var location = req.params.lname;
    console.log(location);
    connection.query('select * from Location inner join Images on Location.ID = Images.LocationID where Location.Name = ?', location, (err, results, fields) => {
        if (err) {
            console.log("error ocurred",error);
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

