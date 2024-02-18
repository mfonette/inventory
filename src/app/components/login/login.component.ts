import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) { }

  login(): void {
    this.authService.login({ username: this.username, password: this.password })
      .subscribe(
        (response:any) => {
          // Handle successful login
          console.log('Login successful');
        },
        (error:any) => {
          // Handle login error
          console.error('Login failed:', error);
        }
      );
  }
}
