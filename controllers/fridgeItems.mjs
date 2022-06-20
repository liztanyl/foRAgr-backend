export default function initFridgeItemsController(db) {
  const index = async (request, response) => {
    try {
      console.log(request.body);

      response.send('success');
    } catch (err) {
      console.log(err);
    }
  };

  const addItems = async (request, response) => {
    try {
      const items = request.body;
      const addedItems = await db.FridgeItem.bulkCreate(items);

      if (addedItems) {
        response.send('success');
      }
    } catch (err) {
      console.log(err);
      response.send('Something went wrong');
    }
  };
  return { index, addItems };
}
