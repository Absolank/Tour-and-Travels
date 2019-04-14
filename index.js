const express = require('express')
const morgan = require('morgan');
const app = express()
const bodyParser = require('body-parser')
const con = require('./routes/mysql_connection.js')
const port = 80;

app.use(express.static('./public'))
app.use(morgan('short'))



app.listen(port, () => {
    console.log('Listening on port ' + port);
})