const connection = require('./connection.js');
const auth = require('./authentication/auth');
const jwt = require('jsonwebtoken');
exports.addlocation = (req, res) => {
    var location = req.body.name;
    connection.query('insert into Location (Name) values (?)', location, (err, results, fields) => {
        if (err) {
            console.log("error ocurred", err);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            });
        } else {
            res.send({
                'code': 200,
                'message': 'location successfully added'
            });
        }
    });
};

exports.getLocation = (req, res) => {
    const location = req.query.name;
    connection.query('select * from Location where Name = ?', location, (err, results, fields) => {
        if (err) {
            console.log("error ocurred", err);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            });
        } else {
            console.log('The solution is: ', results);
            res.json(results);
        }
    });
};

exports.deleteLocation = (req, res) => {
    const location = req.params.lname;
    console.log(location);
    connection.query('delete from Location where Name = ?', location, (err, results, fields) => {
        if (err) {
            console.log("error ocurred", err);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            });
        } else {
            res.json(results);
        }
    });

};


exports.addCountry = (req, res) => {
    const countryName = req.body.country_name;
    const insertCountry = 'insert into Country (Name) values (?)';
    connection.query(insertCountry, [countryName], (err, records, fields) => {
        if (err) {
            res.json({
                code: 400,
                message: 'could not insert country'
            });
        } else {
            res.json(records);
        }
    });
};
exports.addCity = (req, res) => {
    const countryId = req.body.country_id;
    const name = req.body.city_name;
    const code = req.body.city_code;
    const insertCity = 'insert into City (CountryID, Name) values (?, ?)';
    connection.query(insertCity, [countryId, name], (err, records, fields) => {
        if (err) {
            res.json({
                code: 400,
                message: 'could not insert country'
            });
        } else {
            res.json(records);
        }
    });
};
exports.addCityPhoto = (req, res) => {
    const cityId = req.body.City_id;
    const url = req.body.place_url;
    const insertCityPhoto = 'insert into CityImage (CityID, Url) values (?, ?)';
    connection.query(insertCityPhoto, [cityId, url], (err, results, fields)=>{
        if(err){
            res.json({
                code: 400,
                message: 'could not add city image'
            });
        }
        res.json({
            code: 200,
            message: 'successfully added city photo'
        });
    });
};
exports.addPlace = (req, res) => {
    const cityId = req.body.city_id;
    const name = req.body.city_name;
    const insertCity = 'insert into Place (CityID, Name) values (?, ?)';
    connection.query(insertCity, [cityId, name], (err, records, fields) => {
        if (err) {
            res.json({
                code: 400,
                message: 'could not add place'
            });
        } else {
            res.json({
                code: 200,
                message: 'successfully added place'
            });
        }
    });
};
exports.addPlacePhoto = (req, res) => {
    const placeId = req.body.place_id;
    const url = req.body.place_url;
    const insertPlacePhoto = 'insert into PlaceImage (PlaceID, Url) values (?, ?)';
    connection.query(insertPlacePhoto, [placeId, url], (err, results, fields)=>{
        if(err){
            res.json({
                code: 400,
                message: 'could not add place image'
            });
        }
        res.json({
            code: 200,
            message: 'successfully added place photo'
        });
    });
};

exports.addUser = (req, res) => {
    const username = req.body.username;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;


    console.log(username + " " + firstname + " " + lastname + " " + email + " " + password);
    if (username == null || firstname == null || lastname == null || email == null || password == null) {
        res.send({
            'error': '400',
            'message': 'empty fields'
        });
        return;
    }
    const queryUrl = 'insert into Users (Username, FirstName, LastName, Email, Password) values (?, ?, ?, ?, PASSWORD(?))';

    connection.query(queryUrl, [username, firstname, lastname, email, password], (err, results, fields) => {
        if (err) {
            console.log("error ocurred", err.code);
            res.send({
                'err': [err.errno, err.code]
            });
        } else {
            res.json(results);
        }
    });
};

exports.verifyUser = (req, res) => {
    var authentication = auth.verify(req, res);
    if (authentication != null) {
        if (authentication.user.username == 'admin')
            res.json({
                type: 'admin',
                status: 200
            });
        else
            res.json({
                type: 'user',
                status: 200
            });
    } else
        res.json({
            status: 400
        });

    console.log(res.body);
};

exports.searchUser = (req, res) => {
    var authentication = auth.verify(req, res);

    if (authentication != null) {
        var queryUrl = 'select ID, Username, Email, FirstName, LastName from Users ';
        var toAppend = 'where ';
        const username = req.query.username;
        const firstname = req.query.firstname;
        const lastname = req.query.lastname;
        const email = req.query.email;

        var list = [];
        if (username != null) {
            toAppend += "Username = ? ";
            list.push(username);
        }
        if (firstname != null) {
            if (list.length > 0)
                toAppend += " and ";

            toAppend += "FirstName = ?";
            list.push(firstname);
        }
        if (lastname != null) {
            if (list.length > 0)
                toAppend += " and ";
            toAppend += "and LastName = ?";
            list.push(lastname);
        }

        if (email != null) {
            if (list.length > 0)
                toAppend += "Email = ?";
            toAppend += "and Email = ?";
            list.push(email);
        }
        if (list.length > 0)
            queryUrl += toAppend;



        connection.query(queryUrl, list, (err, results, fields) => {
            if (err) {
                console.log("error ocurred", err);
                res.send({
                    "code": 400,
                    "failed": "error ocurred"
                });
            } else {
                res.json(results);
            }
        });
        return;
    } else {
        res.json({
            err: 403,
            message: 'cannot authenticate'
        });
    }
};

exports.addFlight = (req, res) => {
    const tourId = req.body.tourId;
    const cost = req.body.cost;
    const startDate = req.body.date;
    const startTime = req.body.startTime;
    const travelTime = req.body.travelTime;
    const queryInsertFlight = 'insert into Flight (TourID, Cost, StartDate, StartTime, TravelTime) values (?, ?, ?, ?, ?) ';
    connection.query(queryInsertFlight, [tourId, cost, startDate, startTime, travelTime], (err, results, fields) => {
        res.json({
            err,
            results
        });
    });
};

exports.addTrain = (req, res) => {
    const tourId = req.body.tourId;
    const cost = req.body.cost;
    const startDate = req.body.date;
    const startTime = req.body.startTime;
    const travelTime = req.body.travelTime;

    const queryInsertTrain = 'insert into Train (TourID, Cost, StartDate, StartTime, TravelTime) values (?, ?, ?, ?, ?) ';
    connection.query(queryInsertTrain, [tourId, cost, startDate, startTime, travelTime], (err, results, fields) => {
        res.json({
            err,
            results
        });
    });
};

exports.addBus = (req, res) => {
    const tourId = req.body.tourId;
    const cost = req.body.cost;
    const startDate = req.body.date;
    const startTime = req.body.startTime;
    const travelTime = req.body.travelTime;

    const queryInsertBus = 'insert into Bus (TourID, Cost, StartTime, StartDate, TravelTime) values (?, ?, ?, ?, ?) ';
    connection.query(queryInsertBus, [tourId, cost, startTime, startDate, travelTime], (err, results, fields) => {
        res.json({
            err,
            results
        });
    });
};

exports.addHotel = (req, res) => {
    const hotelName = req.body.name;
    const place_id = req.body.place_id;
    const perPersonCost = req.body.cost;
    const star = req.body.star;
    const insertHotel = 'insert into Hotel (Name, PlaceID, PerPersonCost, Star) values (?, ?, ?)';
    connection.query(insertHotel, [hotelName, place_id, perPersonCost, star], (err, records, fields) => {
        res.json({
            err,
            records,
            fields
        });
    });
};

exports.addHotelPhoto = (req, res) => {
    const hotelId = req.body.hotelId;
    const image_url = req.body.image_url;
    const insertPhoto = 'insert into HotelImage (HotelID, Url) values (?, ?)';
    connection.query(insertPhoto, [hotelId, image_url], (err, records, fields) => {
        res.json({
            err,
            records,
            fields
        });
    });
};

exports.addHotelReview = (req, res) => {
    const hotelID = req.body.hotelId;
    const review = req.body.review;
    const rating = req.body.rating;
    const insertHotelReview = 'insert into HotelReviews (HotelID, Review, Rating) values (?, ?, ?)';
    connection.query(insertHotelReview, [hotelID, review, rating], (err, records, fields) => {
        res.json({
            err,
            records,
            fields
        });
    });
};

exports.getHotel = (req, res) => {
    const cityId = req.body.city_id;
    const query = "select HotelID, Name, PerPersonCost, Start," +
     "Place.Name as PlaceName, City.Name as CityName, Country.Name as CountryName from Hotel"+
     "inner join Place on Place.CityID = City.ID"+
     "inner join Country on City.CountryID = Country.ID"+
     "where CityID = ?";
    
    connection.query(query, [cityId], (err, results, fields)=>{
        if(err){
            res.json({
                code: 400,
                message: 'could not get the hotel details'
            });
        }
        res.json({
            records
        });
    });
};


exports.addPackage = (req, res) => {
    const numDays = req.body.numDays;
    const numNights = req.body.numNights;
    const hotelId = req.body.hotelId;
    const packageTag = req.body.packageTag;
    const description = req.body.description;
    const otherCost = req.body.otherCost;
    const discount = req.body.discount;
    const query = 'insert into TravelPackage(PackageTag, Description, NumDays, NumNights, HotelId, OtherCost, Discount) values (?, ?, ?, ?, ?, ?, ?)';
    connection.query(query, [packageTag, description, numDays, numNights, hotelId, otherCost, discount], (err, results, fields) => {
        res.json({
            err,
            results
        });
    });
};