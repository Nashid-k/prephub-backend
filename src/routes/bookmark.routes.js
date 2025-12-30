import express from 'express';
import { 
    getBookmarks, 
    addBookmark, 
    removeBookmark, 
    checkBookmark,
    syncBookmarks 
} from '../controllers/bookmark.controller.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect); // All bookmark routes are protected

router.route('/')
    .get(getBookmarks)
    .post(addBookmark);

router.post('/sync', syncBookmarks);

router.route('/:id')
    .delete(removeBookmark);

router.get('/check/:itemId', checkBookmark);

export default router;
