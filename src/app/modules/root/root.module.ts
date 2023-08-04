import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootComponent } from './root/root.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { Route, RouterModule } from '@angular/router';
import { MenuComponent } from '../../shared/components/menu/menu.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ComingSoonComponent } from 'src/app/shared/components/coming-soon/coming-soon.component';

const routes: Route[] = [
  {
    path: '',
    component: RootComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () =>
          import('../home/home.module').then(m => m.HomeModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../profile/profile.module').then(m => m.ProfileModule),
      },
      {
        path: 'profile/:id',
        loadChildren: () =>
          import('../profile/profile.module').then(m => m.ProfileModule),
      },
      {
        path: 'explore-users',
        loadChildren: () =>
          import('../explore-users/explore-users.module').then(
            m => m.ExploreUsersModule
          ),
      },
      {
        path: 'coming-soon',
        component: ComingSoonComponent,
      },
    ],
  },
];
@NgModule({
  declarations: [RootComponent],
  imports: [
    CommonModule,
    HeaderComponent,
    RouterModule.forChild(routes),
    MenuComponent,
    MatProgressBarModule,
  ],
})
export class RootModule {}
