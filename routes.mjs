import db from './models/index.mjs';
import initFoodItemsController from './controllers/foodItems.mjs';
import initPhotoDataController from './controllers/photoData.mjs';

export default function bindRoutes(app) {
	const FoodItemsController = initFoodItemsController(db);
	const PhotoDataController = initPhotoDataController(db);

	app.get('/', (request, response) => {
		response.sendFile(resolve('dist', 'main.html'));
	});

	app.get('/foodItems/index', FoodItemsController.index);
	app.get('/reviewItems/:reviewItemIds', FoodItemsController.reviewItems);
	app.post('/photoData', PhotoDataController.addPhotoData);
}
