export class UserDto {

  name:string;
  lastName:string;
  phoneNumber:string;
  email:string;
  password:string;

  constructor(name:string, lastName:string,phoneNumber:string, email:string , password:string){
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.password = password;
  }



}
