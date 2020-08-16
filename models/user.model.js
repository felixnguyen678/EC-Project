var mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

var userSchema = new mongoose.Schema({
    id: ObjectId,
    name: String,
    password: String,
    image: String,
    email: String,
    phone: String,
    DayofBirth: Date,
    carts: [String],
    courses: [String]
});

var Users = mongoose.model('Users', userSchema, 'users')

module.exports = Users;