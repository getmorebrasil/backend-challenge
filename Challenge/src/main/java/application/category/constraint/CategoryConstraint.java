package application.category.constraint;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.util.ArrayList;

import javax.validation.Constraint;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import javax.validation.Payload;

import org.springframework.beans.factory.annotation.Autowired;

import application.ServiceUtils;
import application.category.Category;
import application.category.CategoryRepository;

//Constraint for Category(Children ids)
@Documented
@Constraint(validatedBy = CategoryConstraintValidator.class)
@Target( { ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface CategoryConstraint {
    String message() default "Invalid children ids";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

//Validator for the Category(Children ids)
class CategoryConstraintValidator implements ConstraintValidator<CategoryConstraint, Category> {
	@Autowired
	private CategoryRepository repository;
	
	//Initializes the validator and get the Category Repository for SQL Query
    @Override
    public void initialize(CategoryConstraint categoryConstraint) {
  	  	repository = ServiceUtils.getCategoryRepository();
    }

    //Validates that the children ids exists and that the Category ain't parent of itself
    @Override
    public boolean isValid(Category categoryField, ConstraintValidatorContext cxt) {
    	ArrayList<Long> childrenIds = categoryField.getChildrenIds();
    	Long thisCategoryId = categoryField.getId();
    	
    	for(Long childrenId : childrenIds) {
    		if(!(repository.findById(childrenId).isPresent()) || childrenId == thisCategoryId) return false;
    	}
    	
    	return true;
    }
}
