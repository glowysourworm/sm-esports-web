export interface IUser {
  id: number;
  name: string;
  selected: boolean;
}

export interface IUserResponse {
  id: number;
  success: boolean;
  message: string;
}

export interface IGetUsersResponse {
  users: IUser[];
}

export class User implements IUser {
  id: number;
  name: string;
  selected: boolean;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.selected = false;
  }
}
