import db from './models/index.mjs';
import initFoodItemsController from './controllers/foodItems.mjs';
import { initFridgeItemsController } from './controllers/fridgeItems.mjs';
import initPhotoDataController from './controllers/photoData.mjs';
import initUserController from './controllers/users.mjs';

export default function bindRoutes(app) {
  const FoodItemsController = initFoodItemsController(db);
  const FridgeItemsController = initFridgeItemsController(db);
  const PhotoDataController = initPhotoDataController(db);
  const UserController = initUserController(db);

  app.get('/', (request, response) => {
    // eslint-disable-next-line no-undef
    response.sendFile(resolve('dist', 'main.html'));
  });

  app.get('/foodItems/index', FoodItemsController.index);
  app.get('/reviewItems/:reviewItemIds', FoodItemsController.reviewItems);

  app.get('/fridgeItems/index', FridgeItemsController.index);
  app.post('/fridgeItems/add', FridgeItemsController.add);
  app.post('/fridgeItems/destroy/:itemId', FridgeItemsController.destroy);
  app.post('/fridgeItems/notification/add/:id', FridgeItemsController.addNotification);

  app.post('/photoData', PhotoDataController.addPhotoData);

  app.get('/user/getGoogleAuthUrl', UserController.getGoogleAuthUrl);
  app.post('/user/getAccessToken', UserController.getAccessToken);
  app.post('/user/logout', UserController.logout);
}
