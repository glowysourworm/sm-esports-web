import {ChangeDetectionStrategy, Component, EventEmitter, inject, Injectable, Output} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {UserService} from '../service/user.service';
import {User} from '../model/user.model';
import {NgClass} from '@angular/common';
import {FunctionExpr} from '@angular/compiler';

/**
 * @title Dialog Animations
 */
@Component({
  selector: 'new-user-dialog',
  templateUrl: './template/new-user-dialog.component.html',
  imports: [MatButtonModule, MatDialogActions, MatLabel, FormsModule, MatFormField, MatDialogContent, MatDialogTitle, MatDialogClose, MatInput, MatError, NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewUserDialogComponent {

  @Output() createUserEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() onUserNameChange: EventEmitter<string> = new EventEmitter<string>();

  // Used for communicating entered user the parent of the dialog
  readonly userService: UserService;
  readonly dialog = inject(MatDialog);

  private dialogRef: MatDialogRef<NewUserDialogComponent> | undefined;

  // User name <- (dialog erases data during its close procedure)
  public value: string;

  constructor(userService: UserService) {
    this.value = '';
    this.userService = userService;
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string) {

    return this.dialog.open(NewUserDialogComponent, {
      id: '1',
      width: '350px',
      disableClose: true,
      enterAnimationDuration,
      exitAnimationDuration
    });
  }

  createUserAndClose() {
    this.createUserEvent.emit(this.value);
    this.dialog.closeAll();
  }

  validateDialog(){

    // TODO: Fix crash on the material dialog (which isn't firing the event)
    this.onUserNameChange.emit(this.value);

    return this.value?.length > 0 || false;

    /*
    if (this.errorMessage())
      return false;

    else {
      return this.userService.hasDuplicateUser(this.userName);
    }
    */
  }

  errorMessage(){

    if (!this.value)
      return 'Please Enter User Name';

    else if (this.value.length > 50)
      return 'Must be less than 50 characters';

    else if (this.value.includes(' '))
      return 'Must not contain white spaces';

    else
      return '';
  }
}
