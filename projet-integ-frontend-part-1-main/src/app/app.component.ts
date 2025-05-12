import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { CartService } from './core/services/cart.service';
import { Observable, Subscription } from 'rxjs';
import { User } from './core/models/user.model';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  isAuthenticated$: Observable<boolean>;
  currentUser$: Observable<User | null>;
  user?:User | null;
  cartItemCount$: Observable<number>;
  
  isDropdownOpen = false;
  isMobileMenuOpen = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private cartService: CartService
  ) {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
    this.currentUser$ = this.authService.currentUser$;
    this.cartItemCount$ = this.cartService.cartItemCount$;
    
  }

  ngOnInit() {
    // Subscribe to user updates
    const userSub = this.authService.currentUser$.subscribe(user => {
      this.user = user;
      console.log('User updated:', this.user);
    });
    this.subscriptions.push(userSub);
  
    // Close dropdown on outside click
    const clickSub = fromEvent(document, 'click').subscribe((event: Event) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.user-menu')) {
        this.isDropdownOpen = false;
      }
    });
    this.subscriptions.push(clickSub);
  }
  

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  logout() {
    this.authService.logout();
    this.isDropdownOpen = false;
    this.isMobileMenuOpen = false;
  }
}
