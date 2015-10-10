package org.devefx.core;

import java.util.HashMap;
import java.util.Map;

import org.devefx.validator.Validator;

public class Routes {
	
	private final Map<String, Validator> map = new HashMap<String, Validator>();
	
	public void add(String mapping, Class<? extends Validator> validatorClass) {
		if (mapping == null)
			throw new IllegalArgumentException("The mapping can not be null");
		if (validatorClass == null)
			throw new IllegalArgumentException("The validatorClass can not be null");
		if (!mapping.startsWith("/"))
			mapping = "/" + mapping;
		if (map.containsKey(mapping))
			throw new IllegalArgumentException("The mapping already exists: " + mapping);
		try {
			map.put(mapping, validatorClass.newInstance());
		} catch (InstantiationException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		}
	}
	
	public Validator get(String mapping) {
		return map.get(mapping);
	}
	
}
