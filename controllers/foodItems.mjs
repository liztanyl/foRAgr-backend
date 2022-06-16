export default function initFoodItemsController(db) {
  const index = async (request, response) => {
    try {
      const foodItems = await db.FoodItem.findAll({
        attributes: ['id', 'name']
      });
      response.send(foodItems);
    } catch (error) {
      console.log(error)
      response.status(500).send();
    }
  };

  return {
    index,
  };
}
