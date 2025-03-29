import { Component } from '@angular/core';
import {ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet, Routes} from '@angular/router';
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {Tab} from '../model/tab.model';
import {SocialLinksComponent} from './sociallinks.component';
import {MainTabComponent} from './maintab.component';
import {ChatTabComponent} from './chattab.component';
import {ChatBoxComponent} from './chatbox.component';
import {UserTabComponent} from './usertab.component';
import {Router} from 'express';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgOptimizedImage, NgIf, NgClass, SocialLinksComponent, MainTabComponent, ChatTabComponent, ChatBoxComponent, NgForOf, UserTabComponent, RouterLink, RouterLinkActive],
  templateUrl: './template/app.component.html'
})

export class AppComponent {
  title = 'sm-esports-web';

  tabs = [new Tab('Community Meta', 'main', 0), new Tab('Chat', 'chat', 1), new Tab('Users', 'users', 2)];
  selectedTab: Tab;

  constructor(activeRoute: ActivatedRoute) {

    // Initialize tabs
    this.selectedTab = this.tabs[0];

    // TODO: Look for active route <-> tab
    for (let tab of this.tabs){
      if (tab.route == activeRoute.toString())
        this.selectedTab = tab;
    }
  }
}
