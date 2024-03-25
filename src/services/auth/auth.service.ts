import { Injectable } from '@angular/core';
import { devEnvironment } from '../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private router: Router){}
  
  validateUser(email: string, password: string): boolean {
    const { testUserEmail, testUserPassword } = devEnvironment;
    if(email === testUserEmail && password === testUserPassword){
        this.loginUser(email);
        return true;
    }
    return false
  }

  loginUser(email: string): void{
    // Just for logout functionality, not really an auth service, should use Laravel sessions or JWT.
    localStorage.setItem('email', email)
  }

  logoutUser(){
    localStorage.removeItem('email');
    this.router.navigate(['/login'])
  }

  isUserAuthenticated(): boolean{
    const email = localStorage.getItem('email');
    return email ? true : false;
  }

}
