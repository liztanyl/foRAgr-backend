const allSameCategory = (shelfLifeItems) => {
  let areAllSameCategory = true;
  const firstCategoryName = shelfLifeItems[0].categoryName;
  shelfLifeItems.forEach((item) => {
    if (firstCategoryName != item.categoryName) {
      areAllSameCategory = false;
    }
  });
  return areAllSameCategory;
};

const formatShelfLifeItems = (shelfLifeItems) => {
  const categoryNameTracker = {};
  shelfLifeItems.forEach((item) => {
    if (item.categoryName in categoryNameTracker) {
      categoryNameTracker[item.categoryName].push(item);
    } else {
      categoryNameTracker[item.categoryName] = [item];
    }
    return categoryNameTracker;
  });
};

const formatFoodItem = (foodItem) => {
  // filter data
  const shelfLifeItems = foodItem.shelf_life_items.map((item) => ({
    categoryId: item.categoryId,
    categoryName: item.category.name,
    shelfLifeDays: item.shelfLifeDays,
    storageId: item.storageId,
    storageName: item.storage.name,
  }));

  // check for combine shelflifeitems into duplicate categories
  const categoryNameTracker = {};
  shelfLifeItems.forEach((shelfLifeItem) => {
    if (shelfLifeItem.categoryName in categoryNameTracker) {
      categoryNameTracker[shelfLifeItem.categoryName].push(shelfLifeItem);
    } else {
      categoryNameTracker[shelfLifeItem.categoryName] = [shelfLifeItem];
    }
  });

  // manipulate categoryNameTracker to reformat object
  const categories = Object.keys(categoryNameTracker).map((category) => {
    return {
      categoryName: category,
      storageMethods: categoryNameTracker[category],
    };
  });

  return {
    id: foodItem.id,
    name: foodItem.name,
    categories,
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

      const dataToClient = foodItems.map((foodItem) =>
        formatFoodItem(foodItem)
      );

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
