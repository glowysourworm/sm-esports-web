import {
  Component, ComponentRef,
  ContentChild,
  contentChild,
  ElementRef,
  forwardRef,
  Signal,
  ViewChild,
  viewChild
} from '@angular/core';
import {IGetUsersResponse, IUser, IUserResponse} from '../model/user.model';
import {UserService} from '../service/user.service';
import {User} from '../model/user.model';
import {NgClass, NgForOf} from '@angular/common';
import {InputWithHintsComponent} from './input-with-hints';
import {InputWithValidationComponent} from './input-with-validation';
import {BasicButtonComponent} from './basic-button';

@Component({
  selector: 'usertab',
  imports: [
    NgClass,
    NgForOf,
    InputWithHintsComponent,
    InputWithValidationComponent,
    BasicButtonComponent
  ],
  templateUrl: './template/usertab.component.html'
})

export class UserTabComponent {

  //@ts-ignore
  @ViewChild(InputWithHintsComponent, {read: InputWithHintsComponent}) userInput: InputWithHintsComponent;

  private readonly userService: UserService;
  public users: IUser[]

  constructor(theService: UserService) {

    this.userService = theService;
    this.users = [];

    /*
    // Initialize -> getAllUsers
    userService.getAllUsers().forEach(value => {
        return value.users;
    }).then(newUsers => {
      for (let user: IUser in newUsers) {
        this.users.push(new User(user.id, user.name) as IUser);
      }
    });
    */
  }

  addUser() {

    if (!this.userInput.value)
      console.log('Must enter a user name!');

    else
    {
      console.log('Adding user ' + this.userInput.value);

      this.userService
          .createUser(new User(0, this.userInput.value))
          .subscribe((response: IUserResponse) =>
      {
        // Reset user array
        this.userService.getAllUsers().forEach((userResponse) => {

          // Clear
          this.users = [];

          // Apply user response
          userResponse.users.forEach((user) => {
            this.users.push(user);
          })
        }).finally(() =>
        {
          console.log('Users updated');
        });

      });
    }
  }
}
