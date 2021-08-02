const { json } = require('express');
const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
/* Show all blog post */
router.get('/', (req, res) => {
	Blog.find({}, (err, allBlogs) => {
		if (err) return console.log(err);
		// console.log(allBlogs);
		res.json(allBlogs);
	});
});

/* Show single blog post */
router.get('/:id', (req, res) => {
	const id = req.params.id;
	Blog.findById(id)
		.populate('comments')
		.exec((err, foundBlog) => {
			if (err) return console.log(err);
			res.json(foundBlog);
		});
});

/* POST Route for creating a new blog */
router.post('/blog', (req, res) => {
	const { title, author, body, hidden, votes, favs } = req.body;
	const doc = new Blog({
		title: title,
		author: author,
		body: body,
		date: Date(),
		hidden: hidden,
		meta: {
			votes: votes,
			favs: favs,
		},
	});
	doc.save((err, doc) => {
		if (err) return console.log(err);
		return;
	});
	res.redirect('/');
});

/* Edit a blog Post */

/* Delete blog post */
module.exports = router;
