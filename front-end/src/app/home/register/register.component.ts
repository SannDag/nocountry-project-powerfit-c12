import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserDto } from 'src/app/model/user-dto';
import { AuthService } from 'src/app/services/user/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name!:string;
  lastName!:string;
  phoneNumber!:string;
  email!:string;
  password!:string;
  confirmPassword: string = '';

  constructor(private authService: AuthService,
    private toastr: ToastrService,
    private router: Router){}

    ngOnInit(): void {}

  submitForm():void{
    const dto = new UserDto(this.name, this.lastName, this.phoneNumber, this.email, this.password);
    const positionClass = window.innerWidth <= 575.98 ? 'toast-top-center' : 'toast-top-right';
    if(dto.password !== this.confirmPassword){
      this.toastr.error('Error','Las contraseñas no coinciden', { timeOut: 8000, positionClass: positionClass });
      return;
    }
    this.authService.register(dto).subscribe(
      data =>{
        console.log(data.token);
        this.toastr.success(data.message,'Usuario Creado', { timeOut: 8000, positionClass: positionClass});
        this.router.navigate(['/login']);
      },
      err =>{
        console.log(err);
        this.toastr.error(err.error.message, 'Error', { timeOut: 8000, positionClass: positionClass});
      }
    )

  }
}
