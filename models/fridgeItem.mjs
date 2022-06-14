export default function initFridgeItemModel(sequelize, DataTypes) {
	return sequelize.define(
		"fridge_item",
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			userId: {
				type: DataTypes.INTEGER,
				references: {
					model: "users",
					key: "id",
				},
			},
			foodItemId: {
				type: DataTypes.INTEGER,
				references: {
					model: "food_items",
					key: "id",
				},
			},
			addedOn: {
				allowNull: false,
				type: DataTypes.DATE,
			},
			expiry: {
				allowNull: false,
				type: DataTypes.DATE,
			},
			price: {
				allowNull: true,
				type: DataTypes.DECIMAL(10, 2),
			},
			notes: {
				allowNull: true,
				type: DataTypes.TEXT,
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
			tableName: "fridge_items",
			underscored: true,
		}
	);
}
