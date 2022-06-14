export default function initUserModel(sequelize, DataTypes) {
	return sequelize.define(
		"user",
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			email: {
				allowNull: false,
				isEmail: true,
				type: DataTypes.STRING,
			},
			password: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			loginCredential: {
				allowNull: true,
				type: DataTypes.STRING,
			},
			name: {
				allowNull: false,
				type: DataTypes.STRING,
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
			tableName: "users",
			underscored: true,
		}
	);
}
