import {ChangeDetectionStrategy, Component, inject, Injectable} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormsModule} from '@angular/forms';

/**
 * @title Dialog Animations
 */
@Component({
  selector: 'new-user-dialog',
  templateUrl: './template/new-user-dialog.component.html',
  imports: [MatButtonModule, MatDialogActions, MatLabel, FormsModule, MatFormField, MatDialogContent, MatDialogTitle, MatDialogClose, MatInput],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewUserDialogComponent {

  readonly dialog = inject(MatDialog);

  public userName: string = '';

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {

    this.dialog.open(NewUserDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
