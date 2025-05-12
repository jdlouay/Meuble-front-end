import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartItem, CartService } from '../../core/services/cart.service';
import { combineLatest, Observable } from 'rxjs';
import { map, take, filter, first } from 'rxjs/operators';
@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  cartItems$: Observable<CartItem[]>;
  cartItemCount$: Observable<number>;
  totalPrice: Observable<number>;
  shippingCost: Observable<number>;
  grandTotal: Observable<number>;
  
  constructor(private cartService: CartService) {
    this.cartItems$ = this.cartService.cart$;
    this.cartItemCount$ = this.cartService.cartItemCount$;
    
    // Calculer le prix total
    this.totalPrice = this.cartService.cart$.pipe(
      map(items => items.reduce((total, item) => total + (item.price * item.quantity), 0))
    );
    
    // Calculer les frais de livraison (gratuit si > 200€)
    this.shippingCost = this.totalPrice.pipe(
      map(total => total > 200 ? 0 : 10)
    );
    
    // Calculer le total général
    this.grandTotal = combineLatest([this.totalPrice, this.shippingCost]).pipe(
      map(([total, shipping]) => total + shipping)
    );
  }
  
  ngOnInit(): void {
    // Ajouter des données de test si le panier est vide
    this.cartService.cart$.pipe(
      take(1),
      filter(items => items.length === 0)
    ).subscribe(() => {
      this.addTestData();
    });
  }
  
  incrementQuantity(productId: string): void {
    this.cartService.cart$.pipe(
      first()
    ).subscribe(items => {
      const item = items.find((i: CartItem) => i.productId === productId);
      if (item) {
        this.cartService.updateQuantity(productId, item.quantity + 1);
      }
    });
  }
  
  decrementQuantity(productId: string): void {
    this.cartService.cart$.pipe(
      first()
    ).subscribe(items => {
      const item = items.find((i: CartItem) => i.productId === productId);
      if (item && item.quantity > 1) {
        this.cartService.updateQuantity(productId, item.quantity - 1);
      }
    });
  }
  
  removeItem(productId: string): void {
    this.cartService.removeFromCart(productId);
  }
  
  private addTestData(): void {
    // Ajouter quelques produits de test
    this.cartService.addToCart({
      id: '1',
      productId: '1',
      name: 'Canapé Moderne',
      price: 799,
      quantity: 1,
      imageUrl: 'assets/images/sofa.jpg'
    });
    
    this.cartService.addToCart({
      id: '2',
      productId: '3',
      name: 'Fauteuil Confort',
      price: 349,
      quantity: 2,
      imageUrl: 'assets/images/chair.jpg'
    });
  }
}
