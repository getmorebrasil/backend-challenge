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

@Documented
@Constraint(validatedBy = IdConstraintValidator.class)
@Target( { ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface IdConstraint {
    String message() default "Invalid id";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

class IdConstraintValidator implements ConstraintValidator<IdConstraint, Long> {
	@Autowired
	private CategoryRepository repository;
	
    @Override
    public void initialize(IdConstraint idConstraint) {
    	  repository = ServiceUtils.getCategoryRepository();
    }

    @Override
    public boolean isValid(Long idField, ConstraintValidatorContext cxt) {
    	return idField != null && idField.toString().matches("[0-9]*") && !(repository.findById(idField).isPresent());
    }
}

