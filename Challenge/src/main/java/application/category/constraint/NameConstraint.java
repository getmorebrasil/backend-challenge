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

@Documented
@Constraint(validatedBy = NameConstraintValidator.class)
@Target( { ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface NameConstraint {
    String message() default "Invalid name";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

class NameConstraintValidator  implements ConstraintValidator<NameConstraint, String> {
    @Override
    public void initialize(NameConstraint nameConstraint) {
    }

    @Override
    public boolean isValid(String nameField, ConstraintValidatorContext cxt) {
    	return !nameField.isEmpty() && nameField != null;
    }
}
