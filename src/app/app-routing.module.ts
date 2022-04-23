import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { CompanyComponent } from './company/company.component';
import { UsersComponent } from './users/users.component';
import { UserAssociateComponent } from './user-associate/user-associate.component';
import { ViewCompanyComponent } from './view-company/view-company.component';
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'company', component: CompanyComponent},
  { path: 'company/view/:id', component: ViewCompanyComponent },
  { path: 'employee', component: UsersComponent},
  { path: 'employee/associate/:id', component: UserAssociateComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }