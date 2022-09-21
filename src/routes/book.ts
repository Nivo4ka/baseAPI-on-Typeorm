import express from 'express';
import tokenMiddleware from '../middelwares/tokenMiddleware';
import bookController from '../controllers/book/index';
import createValidationMiddleware from '../middelwares/createValidationMiddleware';
import schemes from '../schemesValidate/index';

const router = express.Router();

router.post('/add', tokenMiddleware, createValidationMiddleware(schemes.addBookSchema), bookController.addBook);
router.get('/getAll', createValidationMiddleware(schemes.getAllBooksSchema), bookController.getAllBooks);
router.get('/getByArray', tokenMiddleware, createValidationMiddleware(schemes.getBooksByArraySchema), bookController.getBooksByArray);
router.get('/:bookId', createValidationMiddleware(schemes.getBookByIdSchema), bookController.getBookById);

export default router;
