import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExploreUsersComponent } from './components/explore-users/explore-users.component';
import { Route, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

const routes: Route[] = [
  {
    path: '',
    component: ExploreUsersComponent,
  },
];
@NgModule({
  declarations: [ExploreUsersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    InfiniteScrollModule,
  ],
})
export class ExploreUsersModule {}
