import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  private cartItemCountSubject = new BehaviorSubject<number>(0);

  cart$ = this.cartSubject.asObservable();
  cartItemCount$ = this.cartItemCountSubject.asObservable();

  private apiUrl = environment.apiUrl + '/cart';

  constructor(private http: HttpClient) {
    this.loadCartFromLocalStorage();
  }

  private loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
      this.cartSubject.next(this.cartItems);
      this.updateCartItemCount();
    }
  }

  private saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  private updateCartItemCount() {
    const count = this.cartItems.reduce((total, item) => total + item.quantity, 0);
    this.cartItemCountSubject.next(count);
  }

  getCart(): Observable<CartItem[]> {
    return this.cart$;
  }

  addToCart(item: CartItem): void {
    const existingItem = this.cartItems.find(i => i.productId === item.productId);
    
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.cartItems.push(item);
    }
    
    this.cartSubject.next(this.cartItems);
    this.updateCartItemCount();
    this.saveCartToLocalStorage();
  }

  updateQuantity(productId: string, quantity: number): void {
    const item = this.cartItems.find(i => i.productId === productId);
    
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        this.cartSubject.next(this.cartItems);
        this.updateCartItemCount();
        this.saveCartToLocalStorage();
      }
    }
  }

  removeFromCart(productId: string): void {
    this.cartItems = this.cartItems.filter(item => item.productId !== productId);
    this.cartSubject.next(this.cartItems);
    this.updateCartItemCount();
    this.saveCartToLocalStorage();
  }

  clearCart(): void {
    this.cartItems = [];
    this.cartSubject.next(this.cartItems);
    this.updateCartItemCount();
    this.saveCartToLocalStorage();
  }

  // Pour le développement, ajout de méthodes de synchronisation avec le backend
  syncWithServer(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.apiUrl);
  }

  saveCartToServer(): Observable<any> {
    return this.http.post(this.apiUrl, { items: this.cartItems });
  }
} 