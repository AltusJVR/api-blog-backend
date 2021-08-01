const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
	author: String,
	body: String,
	date: { type: Date, default: Date() },
});

const Comment = mongoose.model('commentSchema', commentSchema);

module.exports = Comment;
