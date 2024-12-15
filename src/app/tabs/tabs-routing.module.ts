import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardPageModule),
      },
      {
        path: 'maps2',
        loadChildren: () => import('../maps2/maps2.module').then(m => m.Maps2PageModule),
      },
      {
        path: 'map-analyst',
        loadChildren: () => import('../map-analyst/map-analyst.module').then(m => m.MapAnalystPageModule),
      },
      {
        path: 'database',
        loadChildren: () => import('../database/database.module').then(m => m.DatabasePageModule),
      },
      {
        path: '',
        redirectTo: 'folder/Inbox',
        pathMatch: 'full',
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
