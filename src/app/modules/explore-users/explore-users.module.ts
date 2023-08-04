import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExploreUsersComponent } from './components/explore-users/explore-users.component';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
  {
    path: '',
    component: ExploreUsersComponent,
  },
];
@NgModule({
  declarations: [ExploreUsersComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ExploreUsersModule {}
