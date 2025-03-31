import {Component, inject, Injectable, ViewChild, viewChild} from '@angular/core';
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {Tab} from '../model/tab.model';
import {SocialLinksComponent} from './sociallinks.component';
import {MainTabComponent} from './maintab.component';
import {ChatTabComponent} from './chattab.component';
import {ChatBoxComponent} from './chatbox.component';
import {UserTabComponent} from './usertab.component';
import {NewUserDialogComponent} from './new-user-dialog.component';
import {UserService} from '../service/user.service';
import {User} from '../model/user.model';
import {firstValueFrom} from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [NgOptimizedImage, NgIf, NgClass, SocialLinksComponent, MainTabComponent, ChatTabComponent,
    ChatBoxComponent, NgForOf, UserTabComponent, NewUserDialogComponent],
  templateUrl: './template/app.component.html'
})

export class AppComponent {

  private readonly dialog: NewUserDialogComponent;
  private readonly userService: UserService;

  // PRIMARY USER MODEL:  This should store user's data (could be relocated to user service.. which
  //                      would then be the "user's service"
  public primaryUser: User;

  // TODO: Fix the modal dialog
  private userNameInput: string;

  title = 'sm-esports-web';

  tabs = [new Tab('Community Meta', 'main', 0), new Tab('Chat', 'chat', 1), new Tab('Users', 'users', 2)];
  selectedTab: Tab;

  constructor(userService: UserService) {

    this.dialog = new NewUserDialogComponent(userService);
    this.primaryUser = new User(-1, 'Not Logged In');
    this.userService = userService;
    this.userNameInput = '';

    // Initialize tabs
    this.selectedTab = this.tabs[0];

    /*
    // TODO: Look for active route <-> tab
    for (let tab of this.tabs){
      if (tab.route == activeRoute.toString())
        this.selectedTab = tab;
    }
    */
  }

  createUser(userName: string){

    // Create the user
    this.userService.createUser(new User(-1, userName)).subscribe(user => {

      // Finally, query for all user's app data
      this.userService.getUser(userName).then(value =>
      {
        // FINALLY, have the user's data cached.
        this.primaryUser.id = value.id;
        this.primaryUser.name = value.name;
        //this.primaryUser.selected = value.selected;
      });
    });
  }

  ngOnInit() {

    // Must "Log On" as (development) user
    //this.dialog?.openDialog('150ms', '50ms');

    setTimeout(() => {
      this.dialog.openDialog('150ms', '50ms');
    });

  }

  ngAfterViewInit() {

    // Must "Log On" as (development) user
    this.dialog.createUserEvent.subscribe((userName: string) => {
      this.createUser(userName);
    }, (error) =>{
      console.error(error);
    }, () =>
    {
      console.log("complete");
    });

    // TODO: Remove this once the other emitter is fixed
    this.dialog.onUserNameChange.subscribe((userName: string) => {
      this.userNameInput = userName;
    })
  }
}
