export default function initFoodItemModel(sequelize, DataTypes) {
	return sequelize.define(
		"food_item",
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			categoryId: {
				type: DataTypes.INTEGER,
				references: {
					model: "categories",
					key: "id",
				},
			},
			name: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			shelfLifeDays: {
				allowNull: false,
				type: DataTypes.INTEGER,
			},
			freezer: {
				allowNull: false,
				type: DataTypes.BOOLEAN,
			},
			fridge: {
				allowNull: false,
				type: DataTypes.BOOLEAN,
			},
			pantry: {
				allowNull: false,
				type: DataTypes.BOOLEAN,
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
			tableName: "food_items",
			underscored: true,
		}
	);
}
