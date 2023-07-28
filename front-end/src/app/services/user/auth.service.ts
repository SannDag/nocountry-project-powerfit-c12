import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponse } from 'src/app/model/auth-response';
import { UserDto } from 'src/app/model/user-dto';
import { environment } from 'src/environments/environment';
import { Login } from 'src/app/model/login';
import { JwtDto } from 'src/app/model/jwt-dto';
import { Jwt } from 'src/app/model/jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authURL = environment.apiResrURL + '/auth/';
  private isLoggedIn = false;
  private cartIdKey = 'cartId';
  private nameUser = 'nameUser';

  constructor(private httpClient: HttpClient) { }

  public register(userDto: UserDto): Observable<Jwt> {
    return this.httpClient.post<Jwt>(this.authURL + 'register', userDto);
  }

  public login(loginUser: Login): Observable<JwtDto> {
    return this.httpClient.post<JwtDto>(this.authURL + 'login', loginUser);
  }

  public loginSecurely(login: Login): Observable<Jwt>{
    return this.httpClient.post<Jwt>(this.authURL + 'login', login);
  }

  public getIsLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  public setIsLoggedIn(value: boolean): void {
    this.isLoggedIn = value;
  }

  setCartId(cartId:number): void{
    localStorage.setItem(this.cartIdKey, cartId.toString());

  }
  getCartId(): number | null {
    const cartId = localStorage.getItem(this.cartIdKey);
    return cartId ? parseInt(cartId, 10) : -1;
  }
  removeCartId(): void{
    localStorage.removeItem(this.cartIdKey);
  }
  setNameUser(name:string):void{
    localStorage.setItem(this.nameUser, name);
  }
  getNameUser(): string | null{
    return localStorage.getItem(this.nameUser);
  }
  removeNameUser(): void{
    localStorage.removeItem(this.nameUser);
  }

}
