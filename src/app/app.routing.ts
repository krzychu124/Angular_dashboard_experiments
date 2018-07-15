import { Routes, RouterModule } from '@angular/router';
import { StartScreenComponent } from './components/start-screen/start-screen.component';
import { MainDashboardComponent } from './components/main-dashboard/main-dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: StartScreenComponent
  },
  {
    path: 'app',
    component: MainDashboardComponent
  }
];

export const AppRoutes = RouterModule.forRoot(routes);
