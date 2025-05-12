import { Component } from '@angular/core';
import { Furniture } from '../class/furniture';
import { Category } from '../../categoy/class/category';
import { FurnitureService } from '../service/furniture.service';
import { CategoryServiceService } from '../../categoy/service/category-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-furniture-admin',
  imports: [FormsModule,CommonModule],
  templateUrl:'./list-furniture-admin.component.html',
  styleUrl: './list-furniture-admin.component.css'
})
export class ListFurnitureAdminComponent {
  furnitureItems: Furniture[] = [];
  categories: Category[] = [];

  showModal = false;
  isEditMode: boolean = false;

  searchName: string = '';
  searchCategoryId: string = ''; // ✅ Rename to match HTML

  furnitureForm: Furniture = new Furniture();

  constructor(
    private furnitureService: FurnitureService,
    private categoryService: CategoryServiceService
  ) {}

  ngOnInit(): void {
    this.fetchFurniture();
    this.fetchCategories();
  }

  fetchFurniture(): void {
    this.furnitureService.getFurniture().subscribe((furnitureItems: Furniture[]) => {
      this.furnitureItems = furnitureItems;
    });
  }

  fetchCategories(): void {
    this.categoryService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

  openAddFurnitureModal(): void {
    this.showModal = true;
    this.isEditMode = false;
    this.furnitureForm = new Furniture();
  }

  closeModal(): void {
    this.showModal = false;
  }

  addFurniture(): void {
    const selectedCategory = this.categories.find(cat => cat.id === Number(this.furnitureForm?.category?.id));
    if (selectedCategory) {
      this.furnitureForm.category = selectedCategory;
    }

    this.furnitureService.createFurniture(this.furnitureForm).subscribe(() => {
      this.fetchFurniture();
      this.closeModal();
    });
  }

  editFurniture(furniture: Furniture): void {
    this.isEditMode = true;
    this.showModal = true;
  
    this.furnitureForm = {
      ...furniture,
      category: this.categories.find(cat => cat.id === furniture.category?.id)
    };
  }

  updateFurniture(): void {
    const selectedCategory = this.categories.find(cat => cat.id === Number(this.furnitureForm?.category?.id));
    if (selectedCategory) {
      this.furnitureForm.category = selectedCategory;
    }

    if (this.furnitureForm.id) {
      this.furnitureService.updateFurniture(this.furnitureForm.id, this.furnitureForm).subscribe(() => {
        this.fetchFurniture();
        this.closeModal();
      });
    }
  }

  filteredFurnitureItems(): Furniture[] {
    return this.furnitureItems.filter(item => {
      const nameMatch = this.searchName
        ? item.name?.toLowerCase().includes(this.searchName.toLowerCase())
        : true;

      const categoryMatch = this.searchCategoryId
        ? item.category?.id?.toString() === this.searchCategoryId
        : true;

      return nameMatch && categoryMatch;
    });
  }


  deleteFurniture(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer ce meuble ?')) {
      this.furnitureService.deleteFurniture(id).subscribe(() => {
        this.fetchFurniture();
      });
    }
  }
}