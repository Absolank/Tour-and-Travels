use TourAndTravels;

create table CityImage(
    ID primary key auto_increment,
    CityID integer not null,
    Url text not null,
    FOREIGN KEY (CityID) REFERENCES City(ID)
);

create table PlaceImage(
    ID integer primary key auto_increment,
    PlaceID intger primary key,
    Url text not null,
    FOREIGN KEY (PlaceID) REFERENCES Place(ID)
);

create table HotelImage(
    ID primary key auto_increment,
    HotelID integer not null,
    Url text not null,
    FOREIGN KEY (HotelID) REFERENCES HOtel(ID)
);

create table Country(
    ID integer primary key auto_increment,
    Name varchar(256) unique;
);

create Table City(
    ID integer primary key auto_increment,
    CountryID integer not null,
    Name varchar(256) not null,
    Code varchar(256) not null,
    FOREIGN KEY (CountryID) REFERENCES Country(ID),

);

create Table Place(
    ID integer primary key auto_increment,
    CityID integer not null,
    Name varchar(256) not null,
    FOREIGN KEY (City) REFERENCES City(ID),
);


create table PlaceCityCountry(
    PlaceID integer not null,
    CityID integer not null,
    CountryID integer not null,
    FOREIGN KEY (Place) REFERENCES Place(ID),
    FOREIGN KEY (CountryID) REFERENCES Country(ID),
    FOREIGN KEY (CityID) REFERENCES City(ID),
    FOREIGN KEY (CountryID) REFERENCES Country(ID),
    primary key (PlaceID, CityID, CountryID)
);

create table Hotel(
    ID integer primary key key auto_increment,
    Name varchar(256) not null, 
    PlaceID integer not null,
    PerPersonCost float not null,
    Star integer not null,
    FOREIGN KEY (PlaceID) REFERENCES Place(ID)
);

create table HotelReviews{
    ID integer primary key auto_increment,
    HotelID integer not null,
    Review text not null,
    Rating integer not null,
    FOREIGN KEY (HotelID) REFERENCES Hotel(ID)
};

create table Transaction(
    ID integer primary key auto_increment,
    Amount integer not null,
    TransactionDate Date not null
);

create table Tour(
    ID integer unique auto_increment,
    SourceID integer not null,
    DestinationID integer not null,
    FOREIGN KEY (SourceID) REFERENCES City(ID),
    FOREIGN KEY (DestinationID) REFERENCES City(ID),
    Primary key (SourceID, DestinationID)
);

create table Flight(
    ID integer primary key auto_increment,
    TourID integer not null,
    Cost integer not null,
    StartTime time not null, 
    TravelTime time not null,
    FOREIGN KEY (TourID) REFERENCES Tour(ID)
    
);

create table Train(
    ID integer primary key auto_increment,
    TourID integer not null,
    Cost integer not null,
    StartTime time not null, 
    TravelTime time not null,
    FOREIGN KEY (TourID) REFERENCES Tour(ID)

);

create table Bus(
    ID integer primary key auto_increment,
    TourID integer not null,
    Cost integer not null,
    StartTime time not null, 
    TravelTime time not null,
    FOREIGN KEY (TourID) REFERENCES Tour(ID)
);

-- We'll take the below info as input from the user when he books the package
create table TravelInfo(
    ID integer primary key auto_increment,
    DepartureDate date not null,
    FlightID integer not null,
    TravelPackageID integer not null,
    DayNum integer not null,
    --  1 for travel Package, 2 for bus, 3 for train
);

create table PackageSightSeeing(
    ID integer primary key,
    TravelPackageID integer not null,
    PlaceID varchar(256),
    DayNum integer not null,
    FOREIGN KEY (TravelPackageID) REFERENCES TravelPackage(ID),
    FOREIGN KEY (PlaceID) REFERENCES Place(ID)
);

create table TravelPackageHotels(
    ID integer primary key auto_increment,
    TravelPackageID integer not null,
    HotelID integer not null,
    DayNum integer not null,
    FOREIGN KEY (HotelID) REFERENCES Hotel(ID),
    FOREIGN KEY (TravelPackageID) REFERENCES TravelPackage(ID)
    
);

create table TravelPackage(
    ID integer primary key auto_increment,
    PackageTag text not null,
    Description text not null,
    NumDays integer not null,
    NumNights integer not null,
    TravelCost integer not null,
    OtherCost integer not null,
    Discount integer not null
);

create table PackageInvoice(
    ID integer primary key auto_increment,
    UserID integer not null,
    TravelPackageID integer not null,
    TransactionID integer not null,
    FOREIGN KEY (UserID) REFERENCES Users(ID),    
    FOREIGN KEY (TravelPackageID) REFERENCES TravelPackage(ID),
    FOREIGN KEY (TransactionID) REFERENCES Transaction(ID)
);
create table FlightInvoice(
    ID integer primary key auto_increment,
    UserID integer not null,
    FlightID integer not null,
    TransactionID integer not null,
    FOREIGN KEY (UserID) REFERENCES Users(ID),    
    FOREIGN KEY (FlightID) REFERENCES Flight(ID),
    FOREIGN KEY (TransactionID) REFERENCES Transaction(ID)
);

create table HotelInvoice(
    ID integer primary key auto_increment,
    UserID integer not null,
    HotelID integer not null,
    NumPerson integer not null,
    TransactionID integer not null,
    FOREIGN KEY (UserID) REFERENCES Users(ID),    
    FOREIGN KEY (HotelID) REFERENCES Hotel(ID),
    FOREIGN KEY (TransactionID) REFERENCES Transaction(ID)
);


create table Users{
    ID integer primary key auto_increment,
    Username varchar(256) not null,
    FirstName varchar(256) not null,
    LastName varchar(256) not null,
    Email varchar(256) not null,
    PhoneNumber varchar(13) not null,
    Address text not null,
    PlaceID integer not null,
    Password varchar(41) not null,
    FOREIGN KEY (PlaceID) REFERENCES Place(ID)
};