const connection = require('./connection.js');
const jwt = require('jsonwebtoken');
const auth = require('./authentication/auth');

exports.addlocation = (req, res)=>{
    var location = req.body.name;
        connection.query('insert into Location (Name) values (?)', location, (err, results, fields) => {
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
};

exports.getLocation = (req, res)=>{
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

exports.deleteLocation = (req, res)=>{
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

exports.addUser = (req, res)=>{
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

exports.searchUser = (req, res)=>{
    console.log();
    var authentication = auth.verify(req, res);
    console.log(authentication);
    if(authentication != null)
    {
        var queryUrl = 'select ID, Username, Email, FirstName, LastName from Users ';
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
        return;
    }
    res.json({err: 403, message: 'cannot authenticate'});
};

exports.addFlight = (req, res) => {
    const source = req.body.source;
    const destination = req.body.destination;
    const cost = req.body.cost;
    const startDate = req.body.date;
    const startTime = req.body.startTime;
    const travelTime = req.body.travelTime;

    var sourceID, destinationID;

    connection.query('select * from Location where Name = ?', [source], (err, records, fields)=>{
        sourceID = records[0].ID;
        connection.query('select * from Location where Name = ?', [destination], (err, records, fields)=>{
            destinationID = records[0].ID;
            
            var query = 'insert into Tour (SourceID, DestinationID) values (?, ?)';
            connection.query(query, [sourceID, destinationID], (err, records, fields)=>{
        
                var querySelectTour = 'select * from Tour where SourceID = ? and DestinationID = ?';
                console.log(sourceID + " " + destinationID);
                connection.query(querySelectTour, [sourceID, destinationID], (err, records, fields) => {

                    const queryInsertFlight = 'insert into Flight (TourID, Cost, StartDate, StartTime, TravelTime) values (?, ?, ?, ?, ?) ';
                    connection.query(queryInsertFlight, [records[0].ID, cost, startDate, startTime, travelTime], (err, results, fields) => {
                        res.json({
                            err,
                            results
                        });
                    });
                });
            });
        });
    });
};

exports.addTrain = (req, res) => {
    const source = req.body.source;
    const destination = req.body.destination;
    const cost = req.body.cost;
    const startDate = req.body.date;
    const startTime = req.body.startTime;
    const travelTime = req.body.travelTime;


    var sourceID, destinationID;

    connection.query('select * from Location where Name = ?', [source], (err, records, fields)=>{
        sourceID = records[0].ID;
        connection.query('select * from Location where Name = ?', [destination], (err, records, fields)=>{
            destinationID = records[0].ID;
            
            var query = 'insert into Tour (SourceID, DestinationID) values (?, ?)';
            connection.query(query, [sourceID, destinationID], (err, records, fields)=>{
        
                var querySelectTour = 'select * from Tour where SourceID = ? and DestinationID = ?';
                console.log(sourceID + " " + destinationID);
                connection.query(querySelectTour, [sourceID, destinationID], (err, records, fields) => {

                    const queryInsertFlight = 'insert into Train (TourID, Cost, StartDate, StartTime, TravelTime) values (?, ?, ?, ?, ?) ';
                    connection.query(queryInsertTrain, [records[0].ID, cost, startDate, startTime, travelTime], (err, results, fields) => {
                        res.json({
                            err,
                            results
                        });
                    });
                });
            });
        });
    });
};

exports.addBus = (req, res) => {
    const source = req.body.source;
    const destination = req.body.destination;
    const cost = req.body.cost;
    const startDate = req.body.date;
    const startTime = req.body.startTime;
    const travelTime = req.body.travelTime;

    var sourceID, destinationID;

    connection.query('select * from Location where Name = ?', [source], (err, records, fields)=>{
        sourceID = records[0].ID;
        connection.query('select * from Location where Name = ?', [destination], (err, records, fields)=>{
            destinationID = records[0].ID;
            
            var query = 'insert into Tour (SourceID, DestinationID) values (?, ?)';
            connection.query(query, [sourceID, destinationID], (err, records, fields)=>{
        
                var querySelectTour = 'select * from Tour where SourceID = ? and DestinationID = ?';
                console.log(sourceID + " " + destinationID);
                connection.query(querySelectTour, [sourceID, destinationID], (err, records, fields) => {

                    const queryInsertBus = 'insert into Bus (TourID, Cost, StartTime, StartDate, TravelTime) values (?, ?, ?, ?, ?) ';
                    connection.query(queryInsertBus, [records[0].ID, cost, startTime, startDate, travelTime], (err, results, fields) => {
                        res.json({
                            err,
                            results
                        });
                    });
                });
            });
        });
    });
};

exports.addHotel = (req, res) => {
    const hotelName = req.body.name;
    const locationName = req.body.location;
    const perPersonCost = req.body.cost;
    const query = 'select * from Location where Name = ?';
    connection.query(query, [locationName], (err, records, fields)=>{
        const id = records[0].ID;
        const insertHotel = 'insert into Hotel (Name, LocationID, PerPersonCost) values (?, ?, ?)';
        connection.query(insertHotel, [hotelName, id, perPersonCost], (err, records, fields)=>{
            res.json({err, records, fields});
        });
    });
};

exports.addPackage = (req, res) =>{
    const tourId = req.body.tourId;
    const numDays = req.body.numDays;
    const numNights = req.body.numNights;
    const hotelId = req.body.hotelId;
    const otherCost = req.body.otherCost;
    const discount = req.body.discount;
    const query = 'insert into TravelPackage(tourId, numDays, numNights, hotelId, otherCost, discount) values (?, ?, ?, ?, ?, ?)';
    connection.query(query, [tourId, numDays, numNights, hotelId, otherCost, discount], (err, results, fields)=>{
        res.json({
            err, 
            results
        });
    });
}
