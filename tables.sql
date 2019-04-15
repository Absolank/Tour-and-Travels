use TourAndTravels;

create Table Location(
    ID integer primary key,
    Name varchar(256) unique
);

create table Images(
    ID integer primary key,
    LocationID integer not null,
    ImgLocation  text not null,
    FOREIGN KEY (LocationID) REFERENCES Location(ID)
);

create table Hotel(
    ID integer primary key,
    Name text not null, 
    LocationID integer not null,
    PerPersonCost float not null
);

create table Transaction(
    ID integer primary key,
    Amount integer not null,
    CardNumber integer not null,
    TransactionDate Date not null
);

create table Tour(
    ID integer primary key,
    SourceID integer not null,
    DestinationID integer not null,
    FOREIGN KEY (SourceID) REFERENCES Location(ID),
    FOREIGN KEY (DestinationID) REFERENCES Location(ID),

);

create table StayDetails(
    ID integer primary key,
    NumDays integer not null,
    NumNights integer not null
);

create table TravelInfo(
    ID integer primary key,
    TourID integer,
    HotelID integer,
    NumAdults integer not null,
    NumChildren integer not null,
    StayDetailsID integer not null,
    FOREIGN KEY (TourID) REFERENCES Tour(ID),
    FOREIGN KEY (HotelID) REFERENCES Hotel(ID),
    FOREIGN KEY (StayDetailsID) REFERENCES StayDetails(ID),
);

create table Invoice(
    ID integer primary key,
    TravelInfoID integer not null,
    TransactionID integer not null,
    FOREIGN KEY (TravelInfoID) REFERENCES TravelInfo(ID),
    FOREIGN KEY (TransactionID) REFERENCES Transaction(ID)
);
