import { Sequelize } from 'sequelize';

const formatFoodItem = (foodItem) => {
  const shelfLifeItems = foodItem.shelf_life_items.map((item) => ({
    categoryId: item.categoryId,
    categoryName: item.category.name,
    shelfLifeDays: item.shelfLifeDays,
    storageId: item.storageId,
    storageName: item.storage.name,
  }));

  return {
    id: foodItem.id,
    name: foodItem.name,
    shelfLifeItems,
  };
};

export default function initFoodItemsController(db) {
  const index = async (request, response) => {
    try {
      const foodItems = await db.FoodItem.findAll({
        attributes: ['id', 'name'],
      });
      response.send(foodItems);
    } catch (error) {
      console.log(error);
      response.status(500).send();
    }
  };

  const reviewItems = async (request, response) => {
    try {
      let { reviewItemIds } = request.params;
      reviewItemIds = reviewItemIds.split(',');
      const foodItems = await db.FoodItem.findAll({
        where: {
          id: reviewItemIds,
        },
        include: [
          {
            model: db.ShelfLifeItem,
            include: [db.Category, db.Storage],
          },
        ],
      });

      const dataToClient = foodItems.map((foodItem) => formatFoodItem(foodItem));

      response.send(dataToClient);
    } catch (error) {
      console.log(error);
      response.status(500).send();
    }
  };

  return {
    index,
    reviewItems,
  };
}
