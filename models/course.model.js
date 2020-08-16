var mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

var courseSchema = new mongoose.Schema({
    id: ObjectId,
    name: String,
    price: String,
    image: String,
    studentNumber: String,
    description: String,
    startDate: Date,
    level: String,
    starNumber: String,
    reviewNumber: String,
    categoryId: String,
    topicId: String,
    reviewId: String,
    teacherId: String
});

var Courses = mongoose.model('Courses', courseSchema, 'courses')

module.exports = Courses;