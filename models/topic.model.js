var mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

var topicSchema = new mongoose.Schema({
    id: ObjectId,
    name: String
});

var Topics = mongoose.model('Topics', topicSchema, 'topics');
module.exports = Topics;