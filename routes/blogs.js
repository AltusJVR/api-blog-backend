const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');

/* GET users listing. */
router.get('/api', function (req, res, next) {
	res.json([
		{
			userName: 'Altus',
			firstName: 'Altus',
			lastName: 'Janse Van Rensburg',
			userNo: 1,
		},
	]);
});

module.exports = router;
