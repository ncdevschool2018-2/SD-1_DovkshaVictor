import {Role} from "./enums/role";

export class User {
  id: number;
  username:string;
  password:string;
  role: Role;
}
