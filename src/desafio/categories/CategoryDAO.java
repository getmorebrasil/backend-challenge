package desafio.categories;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;

public class CategoryDAO {
	protected SessionFactory sessionFactory;

	//Faz o setup do hibernate
	public void setup() {
		Configuration configuration = new Configuration();
		configuration.configure("hibernate.cfg.xml");

		ServiceRegistry registry = new StandardServiceRegistryBuilder().applySettings(configuration.getProperties()).build();

		try {
			sessionFactory = configuration.buildSessionFactory(registry);
		} catch (Exception ex) {
			StandardServiceRegistryBuilder.destroy(registry);
		}
	}

	public void exit() {
		sessionFactory.close();
	}

	//Insere a categoria no DB
	public boolean insertCategory(Category category) {
		try {
			Session session = sessionFactory.openSession();
			Transaction tr = session.beginTransaction();

			session.save(category);

			tr.commit();
			session.close();

			return true;
		} catch (Exception e) {
			return false;
		}
	}

	//Pega a categoria no DB com o id recebido 
	public Category getCategory(Integer id) {
		Session session = sessionFactory.openSession();

		Category category = (Category) session.get(Category.class, new Integer(id));

		session.close();

		if(category == null) {
			return null;
		} else {
			return category;
		}
	}
	
	public List<Category> getCategories() {
		List<Category> categories = null;
		
		Session session = sessionFactory.openSession();
		
		Query query = session.createQuery("from Category");
		
		try {
			categories = query.list();
		} catch (Exception e) {
			System.out.println("getCategories error");
		}
		
		return categories;
	}
} 
