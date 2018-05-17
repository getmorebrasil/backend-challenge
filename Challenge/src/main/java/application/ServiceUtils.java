package application;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import application.category.CategoryRepository;

@Component
public class ServiceUtils {
  private static ServiceUtils instance;

  @Autowired
  private CategoryRepository categoryRepository;

  @PostConstruct
  public void fillInstance() {
    instance = this;
  }

  public static CategoryRepository getCategoryRepository() {
    return instance.categoryRepository;
  }
}
