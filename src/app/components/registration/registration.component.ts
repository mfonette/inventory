import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) { }

  register(): void {
    this.authService.signup({ username: this.username, password: this.password })
      .subscribe(
        (response:any) => {
          console.log(response)
          console.log('Registration successful');
        },
        (error:any) => {
          // Handle registration error
          console.error('Registration failed:', error);
        }
      );
  }
}
