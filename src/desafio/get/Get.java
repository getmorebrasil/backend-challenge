package desafio.get;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ViewScoped;
import javax.faces.component.html.HtmlOutputText;

import desafio.categories.Category;
import desafio.categories.CategoryDAO;

@ManagedBean(name="getBean")
@ViewScoped
public class Get {
	private List<Category> categories;
	private String htmlError;
	
	@PostConstruct
	public void init() {
		categories = new ArrayList<>();
	}
	
	public void add() {
		categories.add(new Category());
	}
	
	public List<Category> getCategories(String id) {
		System.out.println("parametrizado");
		
		CategoryDAO ctgrDAO = new CategoryDAO();
		ctgrDAO.setup();
		
		try {
			Category category = ctgrDAO.getCategory(Integer.parseInt(id));
			categories.add(category);
		}catch (NumberFormatException ex) {
			if(ex.getMessage().equals("For input string: \"\"")) {
				categories = ctgrDAO.getCategories();
			}
			else {
				htmlError = "InvalidId - Id inserido é invalido.";
				return null;
			}
		}
		
		try{
			categories.get(0);
		} catch (Exception ex) {
			htmlError = "EmptyResult - Nenhuma categoria encontrada.";
			return null;
		}
		
		return categories;
	}

	public String getHtmlError() {
		return htmlError;
	}

	public void setHtmlError(String htmlError) {
		this.htmlError = htmlError;
	}
}
