import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'chatbox',
  templateUrl: './app.chatbox.html',
  styleUrl: './app.chatbox.css'
})
export class ChatBoxComponent {
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ChatBoxComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sm-esports-web';
}
