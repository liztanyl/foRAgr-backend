import db from './models/index.mjs';
import initFoodItemsController from './controllers/foodItems.mjs';
import initFridgeItemsController from './controllers/fridgeItems.mjs';
import initPhotoDataController from './controllers/photoData.mjs';

export default function bindRoutes(app) {
  const FoodItemsController = initFoodItemsController(db);
  const FridgeItemsController = initFridgeItemsController(db);
  const PhotoDataController = initPhotoDataController(db);

  app.get('/', (request, response) => {
    response.sendFile(resolve('dist', 'main.html'));
  });

  app.get('/foodItems/index', FoodItemsController.index);
  app.get('/reviewItems/:reviewItemIds', FoodItemsController.reviewItems);

  app.get('/fridgeItems/index', FridgeItemsController.index);
  app.post('/fridgeItems/addItems', FridgeItemsController.addItems);

  app.post('/photoData', PhotoDataController.addPhotoData);
}
