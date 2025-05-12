import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Furniture } from '../class/furniture';
import { FurnitureService } from '../service/furniture.service';
import { FormsModule } from '@angular/forms';
import { CategoryServiceService } from '../../categoy/service/category-service.service';
import { Category } from '../../categoy/class/category';
import { CartService } from '../../../core/services/cart.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-list-furniture',
  imports: [CommonModule, FormsModule],
  templateUrl: './list-furniture.component.html',
  styleUrl: './list-furniture.component.css',
})
export class ListFurnitureComponent {
  furnitureItems: Furniture[] = [];
  filteredFurnitureItems: Furniture[] = [];
  filters = {
    category: '',
    price: '',
    sort: 'popular',
  };

  categories: Category[] = []; // Empty array initially

  // Pagination variables
  currentPage = 1;
  itemsPerPage = 6;
  pageNumbers: number[] = [];

  constructor(
    private furnitureService: FurnitureService,
    private catservice: CategoryServiceService,
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchFurniture();
    this.fetchCategories(); // Fetch categories when component initializes
  }

  // Fetch all furniture items
  fetchFurniture(): void {
    this.furnitureService.getFurniture().subscribe(
      (furnitureItems: Furniture[]) => {
        this.furnitureItems = furnitureItems;
        this.updatePagination();
        this.applyFilters();
      },
      (error) => {
        console.error('Error fetching furniture:', error);
      }
    );
  }

  // Fetch categories from the backend
  fetchCategories(): void {
    this.catservice.getCategories().subscribe(
      (categories) => {
        this.categories = categories; // Populate categories array
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  // Apply filters to the furniture items
  applyFilters(): void {
    let filteredItems = [...this.furnitureItems];

    // Filter by category
    if (this.filters.category) {
      filteredItems = filteredItems.filter(
        (item) => item.category?.id === +this.filters.category
      );
    }

    // Filter by price range
    if (this.filters.price) {
      const priceRange = this.filters.price.split('-');
      const minPrice = parseInt(priceRange[0], 10);
      const maxPrice =
        priceRange[1] === '+' ? Infinity : parseInt(priceRange[1], 10);
      filteredItems = filteredItems.filter((item) => {
        const price = item.price || 0;
        return price >= minPrice && price <= maxPrice;
      });
    }

    // Sort by selected option
    if (this.filters.sort === 'price-asc') {
      filteredItems = filteredItems.sort(
        (a, b) => (a.price || 0) - (b.price || 0)
      );
    } else if (this.filters.sort === 'price-desc') {
      filteredItems = filteredItems.sort(
        (a, b) => (b.price || 0) - (a.price || 0)
      );
    } else if (this.filters.sort === 'newest') {
      // Assuming a `createdAt` field exists on furniture items
      // filteredItems = filteredItems.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    // Apply pagination
    this.filteredFurnitureItems = filteredItems.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );

    // Update pagination numbers
    this.updatePagination();
  }

  updatePagination(): void {
    const totalPages = Math.ceil(
      this.furnitureItems.length / this.itemsPerPage
    );
    this.pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  changePage(page: string | number): void {
    if (page === 'previous' && this.currentPage > 1) {
      this.currentPage--;
    } else if (page === 'next' && this.currentPage < this.pageNumbers.length) {
      this.currentPage++;
    } else if (typeof page === 'number') {
      this.currentPage = page;
    }
    this.applyFilters(); // Reapply filters and pagination
  }

  ajouterAuPanier(item: Furniture) {
    const user = this.authService.getCurrentUser();
    if (!user) {
      alert('Vous devez être connecté pour ajouter au panier.');
      return;
    }
    if (item.id === undefined || user.id === undefined) {
      alert("Erreur : identifiant manquant pour l'utilisateur ou le meuble.");
      return;
    }
    this.cartService.addToCartBackend(item.id, 1, user.id).subscribe({
      next: () => alert('Meuble ajouté au panier (serveur) !'),
      error: (err) =>
        alert("Erreur lors de l'ajout au panier : " + err.message),
    });
  }
}
