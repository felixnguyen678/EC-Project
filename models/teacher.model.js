var mongoose = require('mongoose');
const { ObjectId, Int32, Double } = require('mongodb');

var teachersSchema = new mongoose.Schema({
    id: ObjectId,
    name: String,
    description: String,
    studentNumber: String,
    starNumber: String,
    courses: [String],
    avatar: String
});

var Teachers = mongoose.model('Teachers', teachersSchema, 'teachers');
module.exports = Teachers;