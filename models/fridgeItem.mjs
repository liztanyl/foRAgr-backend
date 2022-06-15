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
				allowNull: false,
				type: DataTypes.INTEGER,
				references: {
					model: "users",
					key: "id",
				},
			},
			shelfLifeItemId: {
				allowNull: false,
				type: DataTypes.INTEGER,
				references: {
					model: "shelf_life_items",
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
				allowNull: false,
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
