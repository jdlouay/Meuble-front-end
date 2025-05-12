import { Component } from '@angular/core';
import { Category } from '../class/category';
import { CategoryServiceService } from '../service/category-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-cat',
  imports: [FormsModule,CommonModule],
  templateUrl: './list-cat.component.html',
  styleUrl: './list-cat.component.css'
})
export class ListCatComponent {
  categories: Category[] = [];

  showModal: boolean = false;
  isEditMode: boolean = false;

  searchName: string = '';
  searchDescription: string = '';

  categoryForm: Category = { name: '', description: '' };

  constructor(private categoryService: CategoryServiceService) {}

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data: Category[]) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des catégories :', err);
      }
    });
  }

  filteredCategories(): Category[] {
    return this.categories.filter(cat => {
      const nameMatch = this.searchName
        ? cat.name?.toLowerCase().includes(this.searchName.toLowerCase())
        : true;

      const descMatch = this.searchDescription
        ? cat.description?.toLowerCase().includes(this.searchDescription.toLowerCase())
        : true;

      return nameMatch && descMatch;
    });
  }

  openAddCategoryModal(): void {
    this.showModal = true;
    this.isEditMode = false;
    this.categoryForm = { name: '', description: '' };
  }

  closeModal(): void {
    this.showModal = false;
  }

  saveCategory(): void {
    if (this.isEditMode && this.categoryForm.id) {
      this.categoryService.updateCategory(this.categoryForm.id.toString(), this.categoryForm).subscribe(() => {
        this.fetchCategories();
        this.closeModal();
      });
    } else {
      this.categoryService.createCategory(this.categoryForm).subscribe(() => {
        this.fetchCategories();
        this.closeModal();
      });
    }
  }

  editCategory(cat: Category): void {
    this.isEditMode = true;
    this.showModal = true;
    this.categoryForm = { ...cat };
  }

  deleteCategory(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette catégorie ?')) {
      this.categoryService.deleteCategory(id.toString()).subscribe(() => {
        this.fetchCategories();
      });
    }
  }
}