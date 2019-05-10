import { Router } from "express";
import handlerCategory from "../controllers/handler-category";

const router = Router();

router.get('/', handlerCategory.allCategories);

router.get('/children', handlerCategory.allChildren);

router.get('/:id', handlerCategory.getCategory);

router.post('/', handlerCategory.addCategory);

router.delete('/:id', handlerCategory.deleteCategory);

router.delete('/children/:id', handlerCategory.deleteChildren);

export default router;