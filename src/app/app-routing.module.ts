import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './_guards/login.guard';
import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { StaffComponent } from './staff/staff.component';
import { AddFormComponent } from './application/add-form/add-form.component';

const routes: Routes = [
  {
    path: '', component: LoginComponent
  },
  {
    path: 'admin', component: AdminComponent,
    canActivate: [LoginGuard],
    data: {
      role: 'admin'
    }
  },
  { path: 'staff', component: StaffComponent,
    canActivate: [LoginGuard],
    data: {
      role: 'staff'
    }
  },
  {
    path: 'edit-form/:formId', component: AddFormComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [LoginGuard]
})
export class AppRoutingModule { }
