import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './components/home-page/home-page.component';
import { Route, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { CreateTweetComponent } from './components/create-tweet/create-tweet.component';
import { SuggestedUsersComponent } from './components/suggested-users/suggested-users.component';
import { TweetTimelineComponent } from './components/tweet-timeline/tweet-timeline.component';
import { TweetCardComponent } from '../../shared/components/tweet-card/tweet-card.component';

const routes: Route[] = [
  {
    path: '',
    component: HomePageComponent,
  },
];

@NgModule({
  declarations: [
    HomePageComponent,
    CreateTweetComponent,
    SuggestedUsersComponent,
    TweetTimelineComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    TweetCardComponent,
  ],
})
export class HomeModule {}
