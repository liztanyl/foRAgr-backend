export default function initShelfLifeItemModel(sequelize, DataTypes) {
  return sequelize.define(
    'shelf_life_item',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      foodItemId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'food_items',
          key: 'id',
        },
      },
      categoryId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'categories',
          key: 'id',
        },
      },
      storageId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'storage',
          key: 'id',
        },
      },
      shelfLifeDays: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      tableName: 'shelf_life_items',
      underscored: true,
    },
  );
}
