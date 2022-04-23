import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CompanyComponent } from './company/company.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { FormGroup, FormsModule, ReactiveFormsModule,  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CreateCompanyComponent } from './create-company/create-company.component';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS, } from '@angular/material/dialog'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { UserAssociateComponent } from './user-associate/user-associate.component';
import { UsersComponent } from './users/users.component';
import { MatSelectModule } from '@angular/material/select';
import { ViewCompanyComponent } from './view-company/view-company.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    CompanyComponent,
    CreateCompanyComponent,
    CreateEmployeeComponent,
    UserAssociateComponent,
    UsersComponent,
    ViewCompanyComponent,

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    ReactiveFormsModule,
    MatSelectModule,

    
  ],
  providers: [authInterceptorProviders, {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}, {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  
  
  bootstrap: [AppComponent]
})
export class AppModule { }
