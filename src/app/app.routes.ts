import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { RegistrationComponent } from './registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileSettingComponent } from './profile-setting/profile-setting.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { ViewProjectsComponent } from './view-projects/view-projects.component';
import { TasksComponent } from './tasks/tasks.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'dashboard', component: DashboardComponent },

  // 👇 Disable prerendering for dynamic route
  {
    path: 'dashboard/:id',
    component: DashboardComponent,
    data: { renderMode: 'csr' } // client-side rendering only
  },

  { path: 'profile-setting', component: ProfileSettingComponent },
  { path: 'view-projects', component: ViewProjectsComponent },

  // 👇 Disable prerendering for dynamic route
  {
    path: 'tasks/:title',
    component: TasksComponent,
    data: { renderMode: 'csr' }
  },

  { path: 'add-project', component: AddProjectComponent }
];
