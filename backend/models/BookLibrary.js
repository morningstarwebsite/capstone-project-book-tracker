import { Model } from 'sequelize';

export default function (sequelize, DataTypes) {
  class BookLibrary extends Model {
    static associate(models) {
      BookLibrary.belongsTo(models.Book, {
        foreignKey: 'book_id',
        as: 'book',
      });
    }
  }

  BookLibrary.init(
    {
      book_id: { type: DataTypes.INTEGER, allowNull: false },
      review: { type: DataTypes.TEXT, allowNull: true },
    },
    { sequelize, modelName: 'BookLibrary', tableName: 'book_library' }
  );

  return BookLibrary;
}
