const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    identificacion: { type: Number, required: true},
    nombre: {type: String, required: true},
    cargo: {type: String, required: true },
});

module.exports = mongoose.model('user', userSchema);