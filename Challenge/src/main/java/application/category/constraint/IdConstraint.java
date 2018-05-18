package application.category.constraint;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import javax.validation.Payload;

import org.springframework.beans.factory.annotation.Autowired;

import application.ServiceUtils;
import application.category.CategoryRepository;

//Constraint for Category's id
@Documented
@Constraint(validatedBy = IdConstraintValidator.class)
@Target( { ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface IdConstraint {
    String message() default "Invalid id";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

//Validator for the Category's id
class IdConstraintValidator implements ConstraintValidator<IdConstraint, Long> {
	@Autowired
	private CategoryRepository repository;
	
	//Initializes the validator and get the Category Repository for SQL Query
    @Override
    public void initialize(IdConstraint idConstraint) {
    	  repository = ServiceUtils.getCategoryRepository();
    }
    /*Validates that the id is:
     * - Not null;
     * - Numeric;
     * - There is no Category with the same id contained in the database.
     */
    @Override
    public boolean isValid(Long idField, ConstraintValidatorContext cxt) {
    	return idField != null && idField.toString().matches("[0-9]*") && !(repository.findById(idField).isPresent());
    }
}

