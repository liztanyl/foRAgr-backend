const formatFridgeItem = (item) => {
  const {
    food_item: foodItem, category, storage, shelfLifeDays,
  } = item.shelf_life_item;

  return {
    id: item.id,
    name: foodItem.name,
    category: category.name,
    storageMethod: storage.name,
    shelfLifeDays,
    purchaseDate: item.addedOn,
    expiryDate: item.expiry,
    notes: item.notes,
  };
};

export default function initFridgeItemsController(db) {
  const index = async (request, response) => {
    try {
      const fridgeItems = await db.FridgeItem.findAll({
        where: { userId: 1 },
        include: {
          model: db.ShelfLifeItem,
          attributes: ['id', 'foodItemId', 'categoryId', 'storageId', 'shelfLifeDays'],
          include: [{ model: db.FoodItem, attributes: ['id', 'name'] },
            { model: db.Category, attributes: ['id', 'name'] },
            { model: db.Storage, attributes: ['id', 'name'] }],
        },
      });

      const dataToClient = fridgeItems.map((item) => formatFridgeItem(item));
      response.send(dataToClient);
    } catch (err) {
      console.log(err.message);
      response.send('Something went wrong');
    }
  };

  const add = async (request, response) => {
    try {
      const items = request.body;

      const addedItems = await db.FridgeItem.bulkCreate(
        items,
        {
          fields:
          ['userId', 'shelfLifeItemId', 'addedOn', 'expiry', 'notes'],
        },
      );

      const addedItemsIds = addedItems.map((item) => item.id);
      const addedItemsDetails = await db.FridgeItem.findAll({
        where: { id: addedItemsIds },
        include: {
          model: db.ShelfLifeItem,
          attributes: ['id', 'foodItemId', 'categoryId', 'storageId', 'shelfLifeDays'],
          include: [{ model: db.FoodItem, attributes: ['id', 'name'] },
            { model: db.Category, attributes: ['id', 'name'] },
            { model: db.Storage, attributes: ['id', 'name'] }],
        },
      });

      const dataToClient = addedItemsDetails.map((item) => formatFridgeItem(item));
      response.send(dataToClient);
    } catch (err) {
      console.log(err.message);
      response.send('Something went wrong');
    }
  };

  const destroy = async (request, response) => {
    try {
      const { itemId } = request.params;
      await db.FridgeItem.destroy({ where: { id: itemId } });
      response.send('success');
    } catch (err) {
      console.log(err.message);
      response.send('Something went wrong');
    }
  };

  return { index, add, destroy };
}