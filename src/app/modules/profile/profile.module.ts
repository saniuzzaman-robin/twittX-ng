import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { RouterModule, Route } from '@angular/router';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { TweetCardComponent } from "../../shared/components/tweet-card/tweet-card.component";

const routes: Route[] = [
  {
    path: '',
    component: UserProfileComponent,
  },
];
@NgModule({
    declarations: [UserProfileComponent],
    imports: [CommonModule, RouterModule.forChild(routes), MaterialModule, TweetCardComponent]
})
export class ProfileModule {}
