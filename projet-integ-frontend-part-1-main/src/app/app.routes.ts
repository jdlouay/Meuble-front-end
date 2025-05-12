import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';


import { ConnexionComponent } from './pages/auth/connexion/connexion.component';
import { InscriptionComponent } from './pages/auth/inscription/inscription.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CartComponent } from './pages/cart/cart.component';
import { ListFurnitureComponent } from './pages/furniture/list-furniture/list-furniture.component';
import { ListFurnitureAdminComponent } from './pages/furniture/list-furniture-admin/list-furniture-admin.component';
import { ListCatComponent } from './pages/categoy/list-cat/list-cat.component';
import { ListUserComponent } from './pages/User/list-user/list-user.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: ConnexionComponent
      },
      {
        path: 'insc',
        component: InscriptionComponent
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  },

  {
    path: 'furniture',
    component: ListFurnitureComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },

  {
    path: 'admin/dashboard',
    component: DashboardComponent
  },
  {
    path: 'admin/dashboard/listFuniture',
    component: ListFurnitureAdminComponent
  },
  {
    path: 'admin/dashboard/list-Cat',
    component: ListCatComponent
  },
  {
    path: 'admin/dashboard/list-User',
    component: ListUserComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
