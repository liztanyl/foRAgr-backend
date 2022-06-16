import db from './models/index.mjs';
export default function bindRoutes(app) {
	app.get('/', (request, response) => {
		response.sendFile(resolve('dist', 'main.html'));
	});
	app.get('/item', async (req, res) => {
		try {
			const item = await db.FoodItem.findAll({
				where: { name: 'beef stock' },
				include: {
					model: db.Category,
					include: db.Storage,
				},
			});
			res.send(item);
		} catch (error) {
			console.log(error);
			res.status(404).send('Something went wrong');
		}
	});
	app.get('/shelfLifeItems', async (req, res) => {
		try {
			const items = await db.ShelfLifeItem.findAll();
			res.send(items);
		} catch (error) {
			console.log(error);
			res.status(404).send('Something went wrong');
		}
	});
}
