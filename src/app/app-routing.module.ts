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
import { SettingsComponent } from './settings/settings.component';
import { AuthenticationGuard } from './shared/authentication/authentication.guard';
const routes: Routes = [
  { path: 'home', component: HomeComponent,canActivate:[AuthenticationGuard] },
  { path: 'company', component: CompanyComponent,canActivate:[AuthenticationGuard]},
  { path: 'company/view/:id', component: ViewCompanyComponent,canActivate:[AuthenticationGuard] },
  { path: 'employee', component: UsersComponent,canActivate:[AuthenticationGuard]},
  { path: 'employee/associate/:id', component: UserAssociateComponent,canActivate:[AuthenticationGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent ,canActivate:[AuthenticationGuard]},
  { path: 'user', component: BoardUserComponent,canActivate:[AuthenticationGuard] },
  { path: 'mod', component: BoardModeratorComponent ,canActivate:[AuthenticationGuard]},
  { path: 'admin', component: BoardAdminComponent,canActivate:[AuthenticationGuard] },
  { path: 'settings', component: SettingsComponent ,canActivate:[AuthenticationGuard]},
  { path: '', redirectTo: 'login', pathMatch: 'full' }
  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }