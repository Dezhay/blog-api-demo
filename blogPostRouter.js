const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');

BlogPosts.create('Travel Cheap', 'text & image', 'Larissa', 'September 2018')
BlogPosts.create('Tattoo Tuesday', 'text & image', 'Brandon', 'September 2018');
BlogPosts.create('Guide to gluten free', 'text', 'Garrett', 'July 2018');



router.get('/', (req, res) => {
	res.json(BlogPosts.get());
});


router.post('/', jsonParser, (req, res) => {
	const requiredFields = ['title', 'content', 'author', 'publishDate'];
	for (let i =0; i<requiredFields.length; i++) {
		const field= requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing \`${field}\` in request body`
			console.error(message);
			return res.status(400).send(message);
		}

	}
	const item = ShoppingList.create(req.body.name, req.body.checked);
	res.status(201).json(item);
});

	router.delete('/:id', (req, res) => {
		ShoppingList.delete(req.params.id);
		console.log(`Deleted shoppinglist item \`$req.params.ID}\``);
		res.status(204).end();
	});

	router.put('/:id', jsonParser, (req, res) => {
		const requiredFields = ['title', 'content', 'author', 'publishDate'];
		for (let i=0; i<requiredFields.length; i++) {
			const field = requiredFields[i];
			if (!(field in req.body)) {
				const message = `Missing \`${field}\` in request body`
				console.error(message);
				return res.status(400).send(message);
			}
		}
		if (req.params.id !== req.body.id) {
			const message = (
				`Request path id (${req.params.id}) and request body id `
				`(${req.body.id}) must match`);
			console.error(message);
			return res.status(400).send(message);
		}
		console.log(`Updating shopping list item \`${req.params.id}\``);
		const updatedItem = BlogPosts.update({
			id: req.params.id,
			title: req.body.title,
			content: req.body.content,
			author: req.body.author,
			publishDate: req.body.publishDate,
		});
		res.status(204).end();
	})
	
module.exports = router;

