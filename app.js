const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 9000;

/* Connect to local DB */
mongoose.connect('mongodb://localhost:27017/test', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log('DB Connected');
	// console.log(process.env);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const blogs = require('./routes/blogs');
app.get('/api', blogs);

const newBlog = require('./routes/newblog');
app.post('/api', newBlog);

/* Wildcard */
app.get('*', (req, res) => {
	res.send('hello');
});

app.listen(PORT, () => {
	console.log(`Example app listening at http://localhost:${PORT}`);
});
