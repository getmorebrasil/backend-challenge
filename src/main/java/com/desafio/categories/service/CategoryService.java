package com.desafio.categories.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.desafio.categories.domain.Category;
import com.desafio.categories.repository.CategoryRepository;
import com.desafio.categories.service.exception.CategoryNotExistException;

@Service
public class CategoryService {

	@Autowired
	private CategoryRepository categoryRepository;

	public Category save(Category category) {
		boolean verified = verifyChildrenids(category);

		if (verified) {
			return categoryRepository.save(category);
		} else {
			throw new CategoryNotExistException();
		}

	}

	public boolean verifyChildrenids(Category category) {
		int[] childrens = category.getChildrenIds();
        
		if (childrens.length == 0) {
			return true;
		} else if (childrens.length != 0) {
			for (int children : childrens) {
				
				Optional<Category> foundCategory = categoryRepository.findById((long) children);
				
				if (foundCategory.get().getId() == children) {
					return true;
				} else if(foundCategory.get().getId() == null) {
					return false;
				}
			}
		}
		return true;
	}
}
