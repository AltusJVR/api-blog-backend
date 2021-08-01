const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 9000;

/* Connect to local DB */
mongoose.connect('mongodb://localhost:27017/blog-api', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log('DB Connected');
	// console.log(process.env);

	/* 	mongoose.connection.collections['blog-api'].drop( function(err) {
    console.log('collection dropped');
}); */
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const blogRoute = require('./routes/blogroute');
/*===== Blog Routes =====*/
/* Show All Blog Posts */
app.get('/', blogRoute);
/* Add a new Blog Post */
app.post('/blog', blogRoute);
/* Show single blog post */
app.get('/:id', blogRoute);

const apitest = require('./routes/blogroute');
app.get('/apitest', apitest);

const newComment = require('./routes/commentsroute');
app.post('/api/:blogid/comment', newComment);
/* Wildcard */
/* app.get('*', (req, res) => {
	res.send('hello');
}); */

app.listen(PORT, () => {
	console.log(`Example app listening at http://localhost:${PORT}`);
});
