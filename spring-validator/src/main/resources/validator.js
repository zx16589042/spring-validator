function Validator(selector) {
	var valid = new Object();
	valid.form = $(selector);
	valid.invalid = false;
	valid.shortCircuit = false;
	valid.datePattern = null;
	valid.error = {};
	var DEFAULT_DATE_PATTERN = "yyyy-MM-dd";
	var emailAddressPattern = "\\b(^['_A-Za-z0-9-]+(\\.['_A-Za-z0-9-]+)*@([A-Za-z0-9-])+(\\.[A-Za-z0-9-]+)*((\\.[A-Za-z0-9]{2,})|(\\.[A-Za-z0-9]{2,}\\.[A-Za-z0-9]{2,}))$)\\b";
	var urlAddressPattern = "";
	
	valid.setShortCircuit = function(shortCircuit) {
		valid.shortCircuit = shortCircuit;
	};
	valid.setDatePattern = function(datePattern) {
		valid.datePattern = datePattern;
	};
	valid.getDatePattern = function() {
		return (valid.datePattern != null ? valid.datePattern : DEFAULT_DATE_PATTERN);
	};
	valid.validate = function () {};
	valid.addError = function(errorKey, errorMessage) {
		valid.invalid = true;
		valid.error[errorKey] = errorMessage;
		if (valid.shortCircuit) {
			throw new Error();
		}
	};
	valid.getParameter = function(name) {
		return valid.form.find("[name="+field+"]").val();
	};
	valid.validateRequired = function(field, errorKey, errorMessage) {
		var value = this.getParameter(name);
		if (value == null || "" == value)
			addError(errorKey, errorMessage);
	};
	valid.validateRequiredString = function(field, errorKey, errorMessage) {
		var value = this.getParameter(field);
		if (value == null || "" == value.replace(/\s/ig, ""))
			addError(errorKey, errorMessage);
	};
	valid.validateInteger = function(field, min, max, errorKey, errorMessage) {
		var value = this.getParameter(field);
		if (value == null || "" == value.replace(/\s/ig, "")) {
			addError(errorKey, errorMessage);
			return ;
		}
		var temp = parseInt(value.replace(/\s/ig, ""));
		if (isNaN(temp) || temp < min || temp > max)
			addError(errorKey, errorMessage);
	};
	valid.validateInteger = function(field, errorKey, errorMessage) {
		var value = this.getParameter(field);
		if (value == null || "" == value.replace(/\s/ig, "")) {
			addError(errorKey, errorMessage);
			return ;
		}
		if(isNaN(parseInt(value.replace(/\s/ig, "")))) {
			addError(errorKey, errorMessage);
			return ;
		}
	};
	valid.validateLong = function(field, min, max, errorKey, errorMessage) {
		validateInteger(field, min, max, errorKey, errorMessage);
	};
	valid.validateLong = function(field, errorKey, errorMessage) {
		validateInteger(field, errorKey, errorMessage);
	};
	valid.validateDouble = function(field, min, max, errorKey, errorMessage) {
		var value = this.getParameter(field);
		if (value == null || "" == value.replace(/\s/ig, "")) {
			addError(errorKey, errorMessage);
			return ;
		}
		var temp = parseFloat(value.replace(/\s/ig, ""));
		if (isNaN(temp) || temp < min || temp > max)
			addError(errorKey, errorMessage);
	};
	valid.validateDouble = function(field, errorKey, errorMessage) {
		var value = this.getParameter(field);
		if (value == null || "" == value.replace(/\s/ig, "")) {
			addError(errorKey, errorMessage);
			return ;
		}
		if (isNaN(parseFloat(value.replace(/\s/ig, ""))))
			addError(errorKey, errorMessage);
	};
	valid.validateDate = function(field, errorKey, errorMessage) {
		var value = this.getParameter(field);
		if (value == null || "" == value.replace(/\s/ig, "")) {
			addError(errorKey, errorMessage);
			return ;
		}
		
	};
	valid.validateDate = function(field, min, max, errorKey, errorMessage) {
		
	};
	valid.validateEqualField = function(field_1, field_2, errorKey, errorMessage) {
		var value_1 = this.getParameter(field_1);
		var value_2 = this.getParameter(field_2);
		if (value_1 == null || value_2 == null || value_1 != value_2)
			addError(errorKey, errorMessage);
	};
	valid.validateEqualString = function(s1, s2, errorKey, errorMessage) {
		if (s1 == null || s2 == null || s1 != s2)
			addError(errorKey, errorMessage);
	};
	valid.validateEqualInteger = function(i1, i2, errorKey, errorMessage) {
		validateEqualString(i1, i2, errorKey, errorMessage);
	};
	valid.validateEmail = function(field, errorKey, errorMessage) {
		validateRegex(field, emailAddressPattern, false, errorKey, errorMessage);
	};
	valid.validateUrl = function(field, errorKey, errorMessage) {
		validateRegex(field, urlAddressPattern, false, errorKey, errorMessage);
	};
	valid.validateRegex = function(field, regExpression, isCaseSensitive, errorKey, errorMessage) {
		var value = this.getParameter(field);
		if (value == null || "" == value.replace(/\s/ig, "")) {
			addError(errorKey, errorMessage);
			return ;
		}
		var reg = isCaseSensitive ? new RegExp(regExpression) : new RegExp(regExpression, "i");
		if (!reg.test(value)) {
			addError(errorKey, errorMessage);
		}
	};
	valid.validateRegex = function(field, regExpression, errorKey, errorMessage) {
		validateRegex(field, regExpression, true, errorKey, errorMessage);
	};
	valid.validateString = function(field, minLen, maxLen, errorKey, errorMessage) {
		var value = this.getParameter(field);
		if (value == null || "" == value.replace(/\s/ig, "")) {
			addError(errorKey, errorMessage);
			return ;
		}
		if (value.length < minLen || value.length > maxLen)
			addError(errorKey, errorMessage);
	};
	valid.validateBoolean = function(field, errorKey, errorMessage) {
		var value = this.getParameter(field);
		if (value == null || "" == value.replace(/\s/ig, "")) {
			addError(errorKey, errorMessage);
			return ;
		}
		value = value.replace(/\s/ig, "").toLowerCase();
		if ("1" == value || "true" == value)
			return ;
		else if ("0" == value || "false" == value)
			return ;
		addError(errorKey, errorMessage);
	};
	return valid;
}