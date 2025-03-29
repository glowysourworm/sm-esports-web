import {IUser} from './user.model';

export class Chat {
  user: IUser;
  text: string;
  when: Date;

  constructor(theUser: IUser, theText: string) {
    this.text = theText;
    this.user = theUser;
    this.when = new Date();
  }
}
