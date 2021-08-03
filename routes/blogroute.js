const { json } = require('express');
const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(cors());
/* Show all blog post */
router.get('/', (req, res) => {
	Blog.find({}, (err, allBlogs) => {
		if (err) return console.log(err);
		// console.log(allBlogs);
		res.json(allBlogs);
	});
});

/* Show single blog post */
router.get('/blog', (req, res) => {
	const id = req.body._id;
	Blog.findById(id)
		.populate('comments')
		.exec((err, foundBlog) => {
			if (err) return console.log(err);
			res.json(foundBlog);
		});
});
/* Edit route for a blog */
router.post('/edit', (req, res) => {
	const doc = req.body;
	Blog.findByIdAndUpdate(doc._id, doc, err => {
		if (err) return console.log(err);
	});
	console.log(`Server Responded with StatusCode:`, res.statusCode);
	res.status(200).json(doc);
});

/* POST Route for creating a new blog */
router.post('/blog', (req, res) => {
	const newBlog = req.body;
	const { title, author, body, hidden, img } = newBlog;
	const doc = new Blog({
		title: title,
		author: author,
		body: body,
		picture: img,
		date: Date(),
		hidden: hidden,
	});
	doc.save((err, doc) => {
		if (err) return console.log(err);
		return doc;
	});
	console.log(`Server Responded with StatusCode:`, res.statusCode);
	res.status(200).json(doc);
});

/* Edit a blog Post */
/* POST route for editing a blog post */

/* Delete blog post */
module.exports = router;
