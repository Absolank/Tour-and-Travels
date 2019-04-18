use TourAndTravels;


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
create Table Location(
    ID integer primary key auto_increment,
    Name varchar(256) unique
);

create table Images(
    LocationID integer not null auto_increment,
    ImgLocation  text not null,
    FOREIGN KEY (LocationID) REFERENCES Location(ID)
);

create table Hotel(
    ID integer unique key auto_increment,
    Name varchar(256) not null, 
    LocationID integer not null,
    PerPersonCost float not null,
    FOREIGN KEY (LocationID) REFERENCES Location(ID),
    PRIMARY KEY (Name, LocationID)

);

create table Transaction(
    ID integer primary key auto_increment,
    Amount integer not null,
    TransactionDate Date not null
);

create table Tour(
    ID integer unique auto_increment,
    SourceID integer not null,
    DestinationID integer not null,
    FOREIGN KEY (SourceID) REFERENCES Location(ID),
    FOREIGN KEY (DestinationID) REFERENCES Location(ID),
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
    TravellingMedium integer not null,
    TravelingMediumID integer not null,
    BookingType integer not null 
    --  1 for travel Package, 2 for bus, 3 for train
);

create table TravelPackage(
    ID integer primary key auto_increment,
    TravelInfoID integer,
    -- Data Redundancy toh nahi ho rahi tourID add karke?, flight/bus/traain mei bhi hogi yeh info
    TourID integer not null,  
    HotelID integer,
    NumDays integer not null,
    NumNights integer not null,
    TravelCost integer not null,
    OtherCost integer not null,
    Discount integer not null,
    FOREIGN KEY (TravelInfoID) REFERENCES TravelInfo(ID),
    FOREIGN KEY (HotelID) REFERENCES Hotel(ID)
);

create table BookingInfo(
    ID integer primary key,
    TravelInfoID integer,
    NumPersons integer not null,
    DateFrom date not null,
    DateTo date not null,
    FOREIGN KEY (TravelInfoID) REFERENCES TravelInfo(ID),
    FOREIGN KEY (HotelID) REFERENCES Hotel(ID)
);


create table Invoice(
    ID integer primary key auto_increment,
    UserID integer not null,
    TravelPackageID integer not null,
    TransactionID integer not null,
    FOREIGN KEY (UserID) REFERENCES Users(ID),    
    FOREIGN KEY (TravelPackageID) REFERENCES TravelPackage(ID),
    FOREIGN KEY (TransactionID) REFERENCES Transaction(ID)
);
