import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth-service.service';

@Component({
  selector: 'app-root',
  template: ` <form [formGroup]="form">
    <fieldset>
      <legend>Login</legend>
      <div class="form-field">
        <label>Email:</label>
        <input name="email" formControlName="email" />
      </div>
      <div class="form-field">
        <label>Password:</label>
        <input name="password" formControlName="password" type="password" />
      </div>
    </fieldset>
    <div class="form-buttons">
      <button class="button button-primary" (click)="login()">Login</button>
    </div>
  </form>`,
})
export class AppComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    const val = this.form.value;

    if (val.email && val.password) {
      this.authService.login(val.email, val.password).subscribe(() => {
        console.log('User is logged in');
        this.router.navigateByUrl('/');
      });
    }
  }
}
