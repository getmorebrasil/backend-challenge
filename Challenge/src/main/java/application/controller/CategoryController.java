package application.controller;

import java.util.ArrayList;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import application.category.Category;
import application.category.CategoryRepository;

@RestController
public class CategoryController {
	@Autowired
    private CategoryRepository repository;
    
	@RequestMapping(value="/categories/{id}", method=RequestMethod.GET)
    public ResponseEntity<ArrayList<Category>> getCategory(@PathVariable(value = "id", required=false) Long id) {
    	final ArrayList<Category> categories = new ArrayList<>();

    	repository.findById(id)
    		.ifPresent(category -> {
    			categories.add(category);
    		});
    	
    	return new ResponseEntity<ArrayList<Category>>(categories, HttpStatus.OK);
    }
    
	@RequestMapping(value="/categories", method=RequestMethod.GET)
    public ResponseEntity<ArrayList<Category>> getAllCategories() {
    	ArrayList<Category> categories = new ArrayList<>();
    	
		for(Category category : repository.findAll()) {
			categories.add(category);
		}
		
    	return new ResponseEntity<ArrayList<Category>>(categories, HttpStatus.OK);
    }
    
    @RequestMapping(value="/categories", method=RequestMethod.POST)
    public ResponseEntity<Category> post(@Valid @RequestBody Category category) {
    	repository.save(category);
    	return new ResponseEntity<Category>(category, HttpStatus.OK);
    }
}