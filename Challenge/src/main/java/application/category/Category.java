package application.category;

import java.util.ArrayList;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Entity
public class Category {

	@Id
	@Column(unique = true)
    private long id;
	
	@NotNull()
	@NotEmpty()
    private String name;
	
    private ArrayList<Long> childrenIds;	

    public Category() {

    }
    
    public Category(long id, String name, ArrayList<Long> childrenids) {
    	this.id = id;
    	this.name = name;
    	this.childrenIds = childrenids;
    }

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public ArrayList<Long> getChildrenIds() {
		return childrenIds;
	}

	public void setChildrenIds(ArrayList<Long> childrenIds) {
		this.childrenIds = childrenIds;
	}
}
