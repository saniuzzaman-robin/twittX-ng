import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './components/home-page/home-page.component';
import { Route, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { MenuComponent } from './components/menu/menu.component';
import { CreateTweetComponent } from './components/create-tweet/create-tweet.component';
import { SuggestedUsersComponent } from './components/suggested-users/suggested-users.component';
import { TweetTimelineComponent } from './components/tweet-timeline/tweet-timeline.component';

const routes: Route[] = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomePageComponent,
  },
];

@NgModule({
  declarations: [HomePageComponent, MenuComponent, CreateTweetComponent, SuggestedUsersComponent, TweetTimelineComponent],
  imports: [CommonModule, RouterModule.forChild(routes), MaterialModule],
})
export class HomeModule {}
