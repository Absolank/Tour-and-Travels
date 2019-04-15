const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const port = 80;
const db_ops = require('./routes/db_ops');

const router = express.Router();
app.use(express.static('./public'));
app.use(morgan('short'));

router.post('/add/location', db_ops.addlocation);
router.get('/search/location/:lname', db_ops.getLocation);

app.use('/api', router);




app.listen(port, () => {
    console.log('Listening on port ' + port);
});