const mongoose = require('mongoose');

const URI = 'mongodb+srv://juanda:0210@cluster0.jjlpj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(URI)
  .then(db => console.log('db is connected'))
  .catch(err =>console.error(err));

  mongoose.exports = mongoose;