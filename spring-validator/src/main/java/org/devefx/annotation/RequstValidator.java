package org.devefx.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Inherited;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import org.devefx.validator.Validator;

@Inherited
@Target(value=ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface RequstValidator {
	public Class<? extends Validator> value();
}
