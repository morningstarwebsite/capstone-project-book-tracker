import { Model } from 'sequelize';

export default function (sequelize, DataTypes) {
  class Book extends Model {
    static associate(models) {
      Book.hasMany(models.BookLibrary, {
        foreignKey: 'book_id',
        as: 'libraryEntries',
        onDelete: 'CASCADE',
      });
    }
  }

  Book.init(
    {
      title: { type: DataTypes.STRING(500), allowNull: false },
      author: { type: DataTypes.STRING(500), allowNull: false },
      isbn: { type: DataTypes.STRING(20), allowNull: true },
      cover_url: { type: DataTypes.STRING(1000), allowNull: true },
    },
    { sequelize, modelName: 'Book', tableName: 'books' }
  );

  return Book;
}
