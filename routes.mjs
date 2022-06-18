import db from './models/index.mjs';
import initFoodItemsController from './controllers/foodItems.mjs';
import initPhotoDataController from './controllers/photoData.mjs';

export default function bindRoutes(app) {
	const FoodItemsController = initFoodItemsController(db);
	const PhotoDataController = initPhotoDataController(db);

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
			console.log(items);
			res.send(items);
		} catch (error) {
			console.log(error);
			res.status(404).send('Something went wrong');
		}
	});

	app.get('/foodItems/index', FoodItemsController.index);
	app.get('/reviewItems/:reviewItemIds', FoodItemsController.reviewItems);
	app.post('/photoData', PhotoDataController.addPhotoData);
}
