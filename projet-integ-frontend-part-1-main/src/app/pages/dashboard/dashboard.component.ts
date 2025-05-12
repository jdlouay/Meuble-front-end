import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
constructor(private authService: AuthService,private route:Router) {}

  ngOnInit() {
    // Vérifier si l'utilisateur est bien un admin
    this.authService.currentUser$.subscribe(user => {
      if (!user || user.role !== 'ADMIN') {
        // Rediriger vers la page d'accueil si l'utilisateur n'est pas admin
        window.location.href = '/';
      }
    });
  }

  list()
  {
    this.route.navigate(['/admin/dashboard/listFuniture']);
  }
 
  listcat()
  {
    this.route.navigate(['/admin/dashboard/list-Cat']);
  }

  listUser()
  {
    this.route.navigate(['/admin/dashboard/list-User']);
  }
}
