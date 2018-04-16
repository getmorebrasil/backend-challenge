package desafio.categories;

import java.util.ArrayList;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Category {
	
	@Id
	@Column(name="id", nullable=false, unique=true)
	private Integer id;
	
	@Column(name="name", nullable=false, unique=false)
	private String name;
	
	@Column(name="childrenIds", nullable=true, unique=false)
	private ArrayList<Integer> childrenIds;
	
	public Category() {
		childrenIds = new ArrayList<>();
	}

	public Integer getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public ArrayList<Integer> getChildrenIds() {
		return childrenIds;
	}

	public void setChildrenIds(ArrayList<Integer> childrenIds) {
		this.childrenIds = childrenIds;
	}
}
