// import mongoose from "mongoose";
import models from "../models";

const CategoryModel = models.mongo.Category;

interface Category {
    id: number;
    name: string;
    childrenIds: number[];
}

class CategoriesService {
    async createCategory(category: Category): Promise<void> {
        // Try to add new category
        try {
            // Ensure that childrenIds have only
            // existing values
            for (const childId of category.childrenIds) {
                if (!(await CategoryModel.exists({ id: childId }))) {
                    throw new Error("InvalidCategories");
                }
            }

            await CategoryModel.create(category);
        } catch (err) {
            switch (err.code) {
                case 11000:
                    throw new Error("CategoryAlreadyExists");
                default:
                    throw err;
            }
        }
    }
}

export default new CategoriesService();
