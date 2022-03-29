const express = require('express');
const morgan = require('morgan');
const path = require('path');
const {mongoose} = require('./database');
const app = express();


// setting
app.set('port', process.env.PORT || 3001)

//middleware
app.use(morgan ('dev'));
app.use(express.json());

//routes
app.use('/api/users', require('./routes/user-routes'));

//staties files
//console.log(__dirname + 'public');
app.use(express.static(path.join(__dirname, 'public')));

//starting the server
app.listen(app.get('port'), () => {
  console.log( `server on port ${app.get('port')}`);
});