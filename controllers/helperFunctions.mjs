import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export async function userIdFromJwt(token, db) {
  try {
    const { email } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await db.User.findOne({
      where: { email },
      attributes: ['id'],
    });

    return user.id;
  } catch (err) {
    console.log(err);
  }
}

export const assignUserIdToItems = (items, userId) => {
  items.forEach((item) => {
    item.userId = userId;
  });
  return items;
};
