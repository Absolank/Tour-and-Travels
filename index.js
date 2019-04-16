const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const port = 80;
const db_ops = require('./routes/db_ops');

const router = express.Router();
app.use(express.static('./public'));
app.use(morgan('short'));
app.use(bodyParser.urlencoded({extended: false}));


router.get('/delete/location/:lname', db_ops.deleteLocation);
router.post('/add/location', db_ops.addlocation);
router.post('/add/user', db_ops.addUser);
router.get('/search/location', db_ops.getLocation);
router.get('/search/users', db_ops.searchUser);

app.use('/api', router);




app.listen(port, () => {
    console.log('Listening on port ' + port);
});