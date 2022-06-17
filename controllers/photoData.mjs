import getMatches from '../matchWord.mjs';

export default function initPhotoDataController(db) {
  const addPhotoData = async (request, response) => {
    try {
      // send image uri
      const imageUri = request.body.imageData;
      console.log(imageUri);
      const matchedData = getMatches();
      console.log(matchedData);
      response.send(matchedData);
    } catch (error) {
      console.log(error);
      response.status(500).send();
    }
  };
  return {
    addPhotoData,
  };
}
