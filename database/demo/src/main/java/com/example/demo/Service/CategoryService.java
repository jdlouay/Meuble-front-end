package com.example.demo.Service;

import com.example.demo.Repository.CategoryRepository;
import com.example.demo.entity.Category;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Optional<Category> getCategoryById(Long id) {
        return categoryRepository.findById(id);
    }

    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }
    
    public Category updateCategory(Long id, Category updatedCategory) {
        Optional<Category> existingCategoryOpt = categoryRepository.findById(id);
        
        if(existingCategoryOpt.isPresent()) {
            Category existingCategory = existingCategoryOpt.get();
            
            // Update the fields of the existing category with the new data
            existingCategory.setName(updatedCategory.getName());
            existingCategory.setDescription(updatedCategory.getDescription());
            
            // Save the updated category
            return categoryRepository.save(existingCategory);
        } else {
            // Handle case where category with the given ID does not exist
            throw new RuntimeException("Category with id " + id + " not found");
        }
    }
}
