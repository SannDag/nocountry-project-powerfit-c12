export class AuthResponse {

  name:string;
  lastName:string;
  email:string;
  role:string;
  token:string;

  constructor(name:string, lastName:string, email:string, role:string, token:string){
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.role = role;
    this.token = token;
  }
}
