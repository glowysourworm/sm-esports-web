import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgClass, NgIf, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'sociallinks',
  templateUrl: './component/sociallinks.html'
})
export class SocialLinksComponent {
}

// Tab Components

export class Tab {
  name: string;
  index: number;
  constructor(theName: string, theIndex: number) {
    this.name = theName;
    this.index = theIndex;
  }
}

@Component({
  selector: 'maintab',
  templateUrl: './component/maintab.html'
})
export class MainTabComponent {
}

@Component({
  selector: 'chattab',
  templateUrl: './component/chattab.html'
})
export class ChatTabComponent {

}

@Component({
  selector: 'chatbox',
  templateUrl: './component/chatbox.html'
})
export class ChatBoxComponent {
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,  NgOptimizedImage, NgIf, NgClass, SocialLinksComponent, MainTabComponent, ChatTabComponent, ChatBoxComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'sm-esports-web';

  tabs = [new Tab('Business Center', 0), new Tab('Chat', 1)];

  selectedTab: Tab;

  constructor() {
    this.selectedTab = this.tabs[0];
  }
}
