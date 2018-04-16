package com.desafio.categories.resources;


import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.desafio.categories.domain.Category;
import com.desafio.categories.repository.CategoryRepository;
import com.desafio.categories.service.CategoryService;



@RestController
@RequestMapping("/categories")
public class CategoryResources {
	
	@Autowired
	private CategoryService categoryService;
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	@PostMapping
	public ResponseEntity<Category> salvar(@Valid @RequestBody Category category) {
		Category categorySaved = categoryService.save(category);
		return ResponseEntity.status(HttpStatus.CREATED).body(categorySaved);

    }
	@GetMapping
	public ResponseEntity<List<Category>> listar() {
		return ResponseEntity.ok(categoryRepository.findAll());
    }	
	
	@GetMapping("/{id}")
	public ResponseEntity<?> buscar(@PathVariable("id") Long id) {
		Category category = categoryRepository.getOne(id);
		return category != null ? ResponseEntity.ok(category) : ResponseEntity.notFound().build();
	}
}
