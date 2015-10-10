package org.devefx.servlet;

import java.io.IOException;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.devefx.config.ValidatorConfig;
import org.devefx.core.ValidatorManager;
import org.devefx.validator.Validator;

public class ValidatorServlet extends HttpServlet {
	private static final long serialVersionUID = -3634086291767542989L;

	private ValidatorConfig validatorConfig;
	private String basePath = "";
	
	private static final ValidatorManager validatorManager = new ValidatorManager();

	private int contextPathLength;
	
	@Override
	public void init(ServletConfig servletConfig) throws ServletException {
		createValidatorConfig(servletConfig.getInitParameter("configClass"));
		
		if (!validatorManager.init(validatorConfig)) {
			throw new RuntimeException("ValidatorManager init error!");
		}
		
		String path = servletConfig.getInitParameter("basePath");
		if (path != null)
			basePath = path;
		
		String contextPath = servletConfig.getServletContext().getContextPath();
		contextPathLength = (contextPath == null || "/".equals(contextPath) ? 0 : contextPath.length());
	}
	
	private void createValidatorConfig(String configClass) {
		if (configClass == null)
			throw new RuntimeException("Please set configClass parameter of ValidatorServlet in web.xml");
		Object temp = null;
		try {
			temp = Class.forName(configClass).newInstance();
		} catch (Exception e) {
			throw new RuntimeException("Can not create instance of class: " + configClass, e);
		}
		if (temp instanceof ValidatorConfig)
			validatorConfig = (ValidatorConfig)temp;
		else
			throw new RuntimeException("Can not create instance of class: " + configClass + ". Please check the config in web.xml");
	}
	
	@Override
	protected void service(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("text/plain;charset=UTF-8");
		
		String target = request.getRequestURI();
		if (contextPathLength != 0)
			target = target.substring(contextPathLength);
		if (basePath != "") {
			target = target.substring(basePath.length());
		}
		
		try {
			Validator validator = validatorManager.getValidator(target);
			if (validator != null) {
				validator.output(response.getWriter());
			}
		} catch (Exception e) {
		}
	}
}
