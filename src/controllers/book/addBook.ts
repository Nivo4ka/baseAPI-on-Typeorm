import path from 'path';
import fs from 'fs';
import db from '../../db';
import type { AddBookHandlerType } from '../../handlerTypes';
import Book from '../../db/entities/Book';

const addBook: AddBookHandlerType = async (req, res, next) => {
  try {
    const { title, autor, price, genre } = req.body;
    const newBook = new Book();
    newBook.title = title;
    newBook.autor = autor;
    newBook.price = price;
    newBook.genre = genre;

    if (req.body.cover) {
      const { cover } = req.body;
      const fileData = cover.split('base64,')[1];
      const fileType = cover.split(';')[0].split('/')[1];
      const fileName = `${newBook.title.split('@')[0]}-${Date.now()}.${fileType}`;

      await fs.promises.writeFile(
        `${path.resolve(__dirname, '../../source/images/books', fileName)}`,
        fileData,
        { encoding: 'base64' },
      );
      newBook.cover = fileName;
    }

    if (req.body.description) {
      newBook.description = req.body.description;
    }

    await db.book.save(newBook);

    return res.json({ book: newBook });
  } catch (err) {
    return next(err);
  }
};

export default addBook;
