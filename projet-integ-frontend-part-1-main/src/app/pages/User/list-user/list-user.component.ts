import { Component } from '@angular/core';
import { User } from '../../../core/models/user.model';
import { UserServiceService } from '../service/user-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-user',
  imports: [FormsModule, CommonModule],
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css'
})
export class ListUserComponent {
  users: User[] = [];
  showModal: boolean = false;
  isEditMode: boolean = false;

  searchNom: string = '';  // Search field for user name
  searchEmail: string = '';  // Search field for user email

  userForm: User = { id: 0, nom: '', email: '', password: '', role: '' }; // Updated user form structure

  constructor(private userService: UserServiceService) {}

  ngOnInit(): void {
    this.fetchUsers();  // Fetch users when the component loads
  }

  fetchUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data: User[]) => {
        // Filter to keep only users with role = 'USER'
        this.users = data.filter(user => user.role === 'USER');
      },
      error: (err) => {
        console.error('Error loading users:', err);
      }
    });
  }
  

  filteredUsers(): User[] {
    return this.users.filter(user => {
      const nomMatch = this.searchNom
        ? user.nom.toLowerCase().includes(this.searchNom.toLowerCase())
        : true;

      const emailMatch = this.searchEmail
        ? user.email.toLowerCase().includes(this.searchEmail.toLowerCase())
        : true;

      return nomMatch && emailMatch;
    });
  }

  openAddUserModal(): void {
    this.showModal = true;
    this.isEditMode = false;
    this.userForm = { id: 0, nom: '', email: '', password: '', role: '' };  // Reset form for new user
  }

  closeModal(): void {
    this.showModal = false;  // Close the modal
  }

  saveUser(): void {
    if (this.isEditMode && this.userForm.id) {
      this.userService.updateUser(this.userForm.id, this.userForm).subscribe(() => {
        this.fetchUsers();  // Refresh user list
        this.closeModal();
      });
    } else {
      console.log('Adding new user is disabled'); // As per the requirement, no addition is allowed
      this.closeModal();
    }
  }

  editUser(user: User): void {
    this.isEditMode = true;
    this.showModal = true;
    this.userForm = { ...user };  // Pre-fill the form with the selected user's data
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe(() => {
        this.fetchUsers();  // Refresh user list after deletion
      });
    }
  }
}