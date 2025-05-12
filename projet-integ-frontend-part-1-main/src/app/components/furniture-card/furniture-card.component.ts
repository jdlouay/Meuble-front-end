import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import { CartService } from '../../core/services/cart.service';
import { AuthService } from '../../core/services/auth.service';

interface Furniture {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  stock: number;
}

@Component({
  selector: 'app-furniture-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="relative h-64 overflow-hidden">
        <img
          [src]="getImageUrl(furniture.image_url)"
          [alt]="furniture.name"
          class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          (error)="onImageError($event)"
        />
      </div>
      <div class="p-4">
        <h3 class="text-xl font-semibold mb-2">{{ furniture.name }}</h3>
        <p class="text-gray-600 mb-4 line-clamp-2">
          {{ furniture.description }}
        </p>
        <div class="flex justify-between items-center">
          <span class="text-2xl font-bold text-blue-600">{{
            furniture.price | currency : 'EUR'
          }}</span>
          <button
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            [routerLink]="['/furniture', furniture.id]"
          >
            Voir détails
          </button>
          <button
            class="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition ml-2"
            (click)="ajouterAuPanier()"
          >
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  `,
})
export class FurnitureCardComponent {
  @Input() furniture!: Furniture;

  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ajouterAuPanier() {
    const user = this.authService.getCurrentUser();
    if (!user) {
      alert('Vous devez être connecté pour ajouter au panier.');
      return;
    }
    this.cartService.addToCartBackend(this.furniture.id, 1, user.id).subscribe({
      next: () => alert('Meuble ajouté au panier (serveur) !'),
      error: (err) =>
        alert("Erreur lors de l'ajout au panier : " + err.message),
    });
  }

  getImageUrl(imageUrl: string): string {
    // Si l'URL est absolue, la retourner telle quelle
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }

    // Sinon, construire l'URL complète
    return `${environment.apiUrl}/${imageUrl}`;
  }

  onImageError(event: any) {
    // En cas d'erreur de chargement, utiliser une image par défaut
    event.target.src = 'assets/images/placeholder.jpg';
  }
}
