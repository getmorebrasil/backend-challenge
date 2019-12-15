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
			// Create category from data
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

	async fetchCategories(offset = 0, limit?: number): Promise<Category[]> {
		// Try fetch categories
		try {
			// Set Projection
			const projection = "-_id id name childrenIds";
			// Fetch data
			const fetchedCategories = await CategoryModel.find({}, projection, {
				skip: offset,
				limit: limit,
			}).lean();
			// Return Projected Data
			return fetchedCategories;
		} catch (err) {
			switch (err.code) {
				default:
					throw err;
			}
		}
	}

	async fetchCategoryById(idToFind: number): Promise<Category> {
		// Try fetch category
		try {
			// Set Projection
			const projection = "-_id id name childrenIds";
			// Fetch data
			const fetchedCategory = await CategoryModel.findOne(
				{ id: idToFind },
				projection,
			).lean();
			// Return Projected Data
			return fetchedCategory;
		} catch (err) {
			switch (err.code) {
				default:
					throw err;
			}
		}
	}
}

export default new CategoriesService();
