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

export class UserResponse implements IUserResponse {
  id: number;
  success: boolean;
  message: string;

  constructor(id: number, success: boolean, message: string) {
    this.id = id;
    this.success = success;
    this.message = message;
  }
}

export class GetUsersResponse implements IGetUsersResponse {
  users: IUser[];

  constructor(users: IUser[]) {
    this.users = users;
  }
}
