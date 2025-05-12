import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-connexion',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css'
})
export class ConnexionComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  loading: boolean = false; // Added loading flag

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.errorMessage = '';
    this.loading = true; // Set loading to true when the form is submitted

    if (!this.email || !this.password) {
      this.errorMessage = 'Veuillez entrer votre email et votre mot de passe';
      this.loading = false; // Set loading to false if validation fails
      return;
    }

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        this.loading = false;
        // Handle redirection inside the service or directly here
        this.router.navigate(['/home']); // Example of redirection after login
      },
      error: (error) => {
        console.error('Login failed', error);
        this.loading = false;
        this.errorMessage = error.error?.message || 'Email ou mot de passe incorrect';
      }
    });
  }
}
