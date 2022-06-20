export default function initFridgeItemsController(db) {
  const index = async (request, response) => {
    try {
      console.log(request.body);

      const addedItems = await db.FridgeItem.create();

      response.send('success');
    } catch (err) {
      console.log(err);
    }
  };

  const addItems = async (request, response) => {
    try {
      console.log(request.body);
      response.send('success');
    } catch (err) {
      console.log(err);
    }
  };
  return { index, addItems };
}
