package application.category;

import java.util.ArrayList;

import javax.persistence.Entity;
import javax.persistence.Id;

import application.category.constraint.CategoryConstraint;
import application.category.constraint.IdConstraint;
import application.category.constraint.NameConstraint;

@Entity
@CategoryConstraint
public class Category {
	@IdConstraint
	@Id
    private long id;
	@NameConstraint
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
