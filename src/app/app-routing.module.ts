import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes
import { ListUsersComponent } from './componentes/list-users/list-users.component';
import { HomeComponent } from  './componentes/home/home.component'
import { AddEditUserComponent } from './componentes/add-edit-user/add-edit-user.component';
import { AllDataComponent } from './componentes/all-data/all-data.component';

const routes: Routes = [
  { path: '', component: ListUsersComponent },
  { path: 'all/:id', component: ListUsersComponent },
  { path: '', component: HomeComponent },
  { path: 'add', component: AddEditUserComponent },
  { path: 'all', component: AllDataComponent },
  { path: 'edit/:id', component: AddEditUserComponent },
  { path: ':id', component: ListUsersComponent },
  { path: '**', redirectTo:'', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
