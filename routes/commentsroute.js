const { json } = require('express');
const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');
const Comment = require('../models/comment');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

/* Create New Comment */
router.post('/api/:id/comment', (req, res) => {
	const { commentBody, author } = req.body;
	const id = req.params.id;
	const commentNew = new Comment({
		author: author,
		body: commentBody,
		date: Date(),
	});
	commentNew.save((err, commentNew) => {
		if (err) return console.log(err);
		return;
	});
	Blog.findById(id, (err, blog) => {
		if (err) return console.log(err);
		blog.comments.push(commentNew);
		blog.save();
	});
	res.redirect('/');
});

/* Edit Comment */
/* Delete Comment */

module.exports = router;
