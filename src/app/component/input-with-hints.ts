import {Component, ViewChild} from '@angular/core';
import {MatInput, MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';

/**
 * @title Input with hints
 */
@Component({
  selector: 'input-hint',
  templateUrl: 'template/input-with-hints.html',
  imports: [FormsModule, MatFormFieldModule, MatInputModule],
})
export class InputWithHintsComponent {

  public label: string;
  public placeholder: string;
  public value: string;
  public warning: string;
  public maxLength: number;

  constructor() {
    this.label = 'User Name';
    this.placeholder = 'Please Enter User Name...';
    this.value = '';
    this.warning = 'Don"t disclose personal information';
    this.maxLength = 50;
  }
}
