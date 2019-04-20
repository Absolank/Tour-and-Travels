const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const port = 80;
const db_ops = require('./routes/db_ops');
const auth = require('./routes/authentication/auth');
const jwt = require('jsonwebtoken');

app.use(express.static('./public'));
const router = express.Router();
const sessionRouter = express.Router();
app.use(morgan('short'));
app.use(bodyParser.urlencoded({extended: false}));



router.get('/delete/location/:lname', db_ops.deleteLocation);
router.post('/add/location', db_ops.addlocation);
router.post('/add/user', db_ops.addUser);
router.get('/search/location', db_ops.getLocation);
router.get('/search/user', auth.verifyToken, db_ops.searchUser);
router.post('/add/flight', db_ops.addFlight);
router.post('/add/train', db_ops.addTrain);
router.post('/add/bus', db_ops.addBus);
router.post('/add/hotel', db_ops.addHotel);

sessionRouter.get('/verify', auth.verifyToken, db_ops.verifyUser);
sessionRouter.post('/login', auth.login);
app.use('/api', router);
app.use('/', sessionRouter);




app.listen(port, '172.19.15.95',() => {
    console.log('Listening on port ' + port);
});
