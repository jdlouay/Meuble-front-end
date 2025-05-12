import { Component, Input } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-furniture',
  imports: [[CommonModule, RouterLink]],
  templateUrl: './furniture.component.html',
  styleUrl: './furniture.component.css'
})
export class FurnitureComponent {
  @Input() furniture!: Furniture;

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
