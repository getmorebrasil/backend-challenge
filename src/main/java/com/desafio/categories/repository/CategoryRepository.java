package com.desafio.categories.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.desafio.categories.domain.Category;

public interface CategoryRepository extends JpaRepository<Category, Long>{

}

