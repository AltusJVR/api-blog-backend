const { json } = require('express');
const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

/* JSON Parse not working */
router.post('/api', json, (req, res) => {
	res.send('api post route working');
	const body = JSON.parse(req.body);
	console.log(body);
	const doc = new Blog({
		userName: req.body.name,
		firstName: 'Altus',
		lastName: 'Janse Van Rensburg',
		userNo: 1,
	});
});

module.exports = router;
