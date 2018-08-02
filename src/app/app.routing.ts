import { Routes, RouterModule } from '@angular/router';
import { StartScreenComponent } from './components/start-screen/start-screen.component';
import { MainDashboardComponent } from './components/main-dashboard/main-dashboard.component';
import { DashboardsComponent } from './components/dashboards/dashboards.component';
import { Dashboards2Component } from './components/dashboards2/dashboards2.component';

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
  },
  {
    path: 'dash',
    component: DashboardsComponent
  },
  {
    path: 'dash2',
    component: Dashboards2Component
  }
];

export const AppRoutes = RouterModule.forRoot(routes);
