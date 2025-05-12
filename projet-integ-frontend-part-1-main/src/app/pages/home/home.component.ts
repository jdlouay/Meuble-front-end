import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Category {
  name: string;
  image: string;
  count: string;
  route: string;
}

interface NewProduct {
  name: string;
  description: string;
  price: number;
  image: string;
  isNew: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Hero Section -->
    <section class="relative">
      <div class="bg-gradient-to-r from-indigo-900 to-indigo-700 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div class="md:w-2/3">
            <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Des meubles uniques pour des intérieurs d'exception
            </h1>
            <p class="text-lg md:text-xl text-indigo-100 mb-8">
              Découvrez notre collection exclusive de meubles design alliant élégance et confort pour créer un espace qui vous ressemble.
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <a routerLink="/furniture" 
                class="inline-block px-6 py-3 bg-white text-indigo-700 rounded-md font-medium shadow-md hover:bg-indigo-50 transition-colors duration-200 text-center">
                Découvrir la collection
              </a>
              <a routerLink="/about" 
                class="inline-block px-6 py-3 bg-transparent border border-white text-white rounded-md font-medium hover:bg-white hover:text-indigo-700 transition-colors duration-200 text-center">
                Notre histoire
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Catégories populaires -->
    <div class="container mx-auto px-4 py-8">
      <section class="mb-12">
        <h2 class="text-3xl font-bold mb-4">Catégories populaires</h2>
        <p class="text-gray-600 mb-8">Explorez nos collections par catégorie</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div *ngFor="let category of categories" 
               [routerLink]="['/furniture', category.route]"
               class="relative bg-white rounded-lg shadow-md overflow-hidden cursor-pointer group h-[300px]">
            <div class="h-full w-full">
              <div class="w-full h-full bg-gray-200 flex items-center justify-center">
                <img [src]="category.image" 
                     [alt]="category.name"
                     class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                     (error)="handleImageError($event)">
              </div>
              <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h3 class="text-xl font-semibold text-white mb-2">{{ category.name }}</h3>
                <p class="text-gray-200">{{ category.count }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Nouveautés -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-2">Nouveautés</h2>
        <p class="text-gray-600 mb-8">Découvrez nos dernières collections</p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div *ngFor="let product of newProducts" 
               class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div class="relative h-64 overflow-hidden">
              <img [src]="product.image" 
                   [alt]="product.name"
                   class="w-full h-full object-cover"
                   (error)="handleProductImageError($event)">
              <div *ngIf="product.isNew" 
                   class="absolute top-0 right-0 bg-indigo-600 text-white px-3 py-1 m-2 rounded-full text-sm font-medium">
                Nouveau
              </div>
            </div>
            <div class="p-4">
              <h3 class="text-xl font-semibold mb-2 text-gray-900">{{ product.name }}</h3>
              <p class="text-gray-600 mb-4">{{ product.description }}</p>
              <div class="flex justify-between items-center">
                <span class="text-xl font-bold text-gray-900">{{ product.price }} €</span>
                <button class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Ajouter au panier
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-2 text-center">Nos services</h2>
        <p class="text-gray-600 mb-12 text-center">Nous vous accompagnons à chaque étape</p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white p-6 rounded-lg shadow-md text-center">
            <div class="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <svg class="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2 text-gray-900">Paiement sécurisé</h3>
            <p class="text-gray-600">
              Paiement 100% sécurisé avec possibilité de financement sans frais jusqu'à 10 fois.
            </p>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow-md text-center">
            <div class="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <svg class="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2 text-gray-900">Livraison gratuite</h3>
            <p class="text-gray-600">
              Livraison gratuite à domicile pour toute commande supérieure à 200€.
            </p>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow-md text-center">
            <div class="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <svg class="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2 text-gray-900">Garantie 5 ans</h3>
            <p class="text-gray-600">
              Tous nos meubles sont garantis 5 ans pour vous assurer une tranquillité d'esprit.
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .h-[300px] {
      height: 300px;
    }
  `]
})
export class HomeComponent {
  categories: Category[] = [
    {
      name: 'Canapés',
      image: '/assets/images/categories/canape.jpg',
      count: 'Plus de 50 modèles',
      route: 'canapes'
    },
    {
      name: 'Tables',
      image: '/assets/images/categories/table.jpg',
      count: 'Plus de 30 modèles',
      route: 'tables'
    },
    {
      name: 'Chaises',
      image: '/assets/images/categories/chaise.jpg',
      count: 'Plus de 40 modèles',
      route: 'chaises'
    },
    {
      name: 'Lits',
      image: '/assets/images/categories/lit.jpg',
      count: 'Plus de 25 modèles',
      route: 'lits'
    }
    
  ];

  newProducts: NewProduct[] = [
    {
      name: 'Canapé Moderne',
      description: 'Un canapé confortable avec un design élégant qui s\'adapte à tout intérieur.',
      price: 799,
      image: '/assets/images/products/canape-moderne.jpg',
      isNew: true
    },
    {
      name: 'Fauteuil Confort',
      description: 'Fauteuil ergonomique pour un confort optimal même après de longues heures.',
      price: 349,
      image: '/assets/images/products/fauteuil-confort.jpg',
      isNew: true
    },
    {
      name: 'Table à Manger',
      description: 'Table à manger en bois massif, idéale pour les dîners en famille.',
      price: 599,
      image: '/assets/images/products/table-manger.jpg',
      isNew: true
    }
  ];

  handleImageError(event: any) {
    const categoryName = event.target.alt.toLowerCase();
    // Afficher une icône SVG à la place de l'image manquante
    event.target.parentElement.innerHTML = `
      <div class="w-full h-full bg-gray-100 flex items-center justify-center">
        <svg class="w-24 h-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          ${this.getCategoryIcon(categoryName)}
        </svg>
      </div>
    `;
  }

  private getCategoryIcon(category: string): string {
    const icons: { [key: string]: string } = {
      'canapés': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 12v-2a2 2 0 00-2-2h-2V5a2 2 0 00-2-2H10a2 2 0 00-2 2v3H6a2 2 0 00-2 2v2m16 0v7a2 2 0 01-2 2H6a2 2 0 01-2-2v-7m16 0h-2v4a1 1 0 11-2 0v-4H10v4a1 1 0 11-2 0v-4H6"/>',
      'tables': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 6h18M7 6v12m10-12v12M3 18h18M5 6a2 2 0 012-2h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6z"/>',
      'chaises': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4v16m-8-8h16"/>',
      'lits': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12h18m-18-6h18M3 18h18"/>'
    };
    return icons[category] || icons['canapés'];
  }

  handleProductImageError(event: any) {
    const productName = event.target.alt.toLowerCase();
    event.target.parentElement.innerHTML = `
      <div class="w-full h-full bg-gray-100 flex items-center justify-center">
        <svg class="w-24 h-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 12v-2a2 2 0 00-2-2h-2V5a2 2 0 00-2-2H10a2 2 0 00-2 2v3H6a2 2 0 00-2 2v2m16 0v7a2 2 0 01-2 2H6a2 2 0 01-2-2v-7m16 0h-2v4a1 1 0 11-2 0v-4H10v4a1 1 0 11-2 0v-4H6"/>
        </svg>
      </div>
    `;
  }
} 