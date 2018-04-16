package desafio.post;

import java.util.ArrayList;

import javax.faces.bean.ManagedBean;

import desafio.categories.Category;
import desafio.categories.CategoryDAO;

@ManagedBean(name="postBean")
public class Post {	
	private String id;
	private String name;
	private String childrenIds;
	private String resposta;

	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getChildrenIds() {
		return childrenIds;
	}
	public void setChildrenIds(String childrenIds) {
		this.childrenIds = childrenIds;
	}
	public String getResposta() {
		return resposta;
	}
	public void setResposta(String resposta) {
		this.resposta = resposta;
	}

	//Efetua o insert no banco caso os dados estejam em conforme com o escopo do DB
	public boolean post() {
		CategoryDAO ctgrDAO = new CategoryDAO();

		ctgrDAO.setup();

		try {
			if(!isNumero(id)) {
				throw new IllegalArgumentException("InvalidId - Id deve ser um número.");
			}else if(ctgrDAO.getCategory(Integer.parseInt(this.id)) != null) {
				throw new IllegalArgumentException("InvalidId - Já existe uma categoria com este id.");
			}else if(id.trim().equals("")) {
				throw new IllegalArgumentException("InvalidId - Id não pode ser vazio.");
			} 

			if(name.trim().equals("")) {
				throw new IllegalArgumentException("InvalidName - Nome não pode ser vazio.");
			}

			String[] childrenIdsStr = childrenIds.split(",");
			ArrayList<Integer> childrenIdsList = new ArrayList<>();

			for(int i = 0; i < childrenIdsStr.length; i++) {
				String idChildrenStr = childrenIdsStr[i].trim();
				//Verifica se o campo de childrenIds está vazio
				if(!idChildrenStr.equals("")) {
					if(!isNumero(idChildrenStr)) {
						throw new IllegalArgumentException("InvalidCategories - Id de categoria deve ser número.");
					}

					int idChildren = Integer.parseInt(idChildrenStr);
					if(idChildren == Integer.parseInt(id)) {
						throw new IllegalArgumentException("InvalidCategories - Uma categoria não pode ser filha dela mesma.");
					}
					childrenIdsList.add(idChildren);
					if(ctgrDAO.getCategory(idChildren) == null) {
						System.out.println("8");
						throw new IllegalArgumentException("InvalidCategories - Categoria "+ idChildren +" é inexistente.");
					}
				} else {
				}
			}

			Category category = new Category();
			category.setId(Integer.parseInt(this.id));
			category.setName(this.name);
			category.setChildrenIds(childrenIdsList);

			ctgrDAO.insertCategory(category);

		} catch (NumberFormatException ex) {
			resposta = ex.getMessage();
			return false;
		} catch(Exception ex) {
			resposta = ex.getMessage();
			return false;
		}

		resposta = "ok";

		ctgrDAO.exit();
		return true;
	}

	public boolean isNumero(String s) {
		return (s.matches("[-+]?\\d*\\.?\\d+"));
	}
}
