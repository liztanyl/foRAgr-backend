import { getMatches } from '../matchWord.mjs';

export default function initPhotoDataController(db) {
  const addPhotoData = async (request, response) => {
    try {
      // send image uri
      const { detection } = request.body;
      const matchedData = getMatches(detection);
      console.log(matchedData);

      const foodItems = await db.FoodItem.findAll({
        attributes: ['id', 'name'],
      });

      const compiledMatches = matchedData.map((data) => {
        foodItems.forEach((food) => {
          if (food.name === data.match[0].itemName) {
            data.dataId = food.id;
          }
        });
        return data;
      });

      response.send(compiledMatches);
    } catch (error) {
      console.log(error);
      response.status(500).send();
    }
  };
  return {
    addPhotoData,
  };
}
