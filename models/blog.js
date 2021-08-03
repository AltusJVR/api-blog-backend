const mongoose = require('mongoose');
const { Schema } = mongoose;
const Comment = require('./comment');

const blogSchema = new Schema({
	title: String, // String is shorthand for {type: String}
	author: String,
	body: String,
	picture: String,
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: Comment,
		},
	],
	date: { type: Date, default: Date() },
	hidden: { type: Boolean, default: false },
	meta: {
		votes: Number,
		favs: Number,
	},
});

const Blog = mongoose.model('blogSchema', blogSchema);

module.exports = Blog;
