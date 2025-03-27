import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgStyle],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sm-esports-web';
}
