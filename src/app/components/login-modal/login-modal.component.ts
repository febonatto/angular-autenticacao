import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginService } from 'src/app/services/login.service';
import { UserService } from './../../services/user.service';

interface Login {
  data: {
    token: string
  },
  errors: Array<any>
}

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent {

  invalidAccount: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private loginService: LoginService,
    private userService: UserService) { }

  form: FormGroup = this.formBuilder.group({
    email: ['funcionario@empresa.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]]
  })

  validateField(field: string): string {
    const control = this.form.controls[field];

    if(control.touched) return control.errors ? 'is-invalid' : 'is-valid';
    return '';
  }

  labelColor(field: string): string {
    const control = this.form.controls[field];

    if(control.touched) return control.errors ? 'error' : 'success';
    return '';
  }

  login(): void {
    if(this.form.invalid) return;
    const { email, password } = this.form.controls;

    this.loginService.login(email.value, password.value)
      .subscribe(
        (success: Login) => {
          const { token } = success.data;

          this.invalidAccount = false;
          this.userService.setToken(token);
          localStorage.setItem('data', JSON.stringify({ token }));

          const close = document.querySelector('button[data-bs-dismiss="modal"]') as HTMLButtonElement;
          close.click();
        },
        (error) => {
          if(error.status === 401) {
            this.invalidAccount = true;
            this.form.controls['password'].setValue('');
            this.form.controls['password'].markAsUntouched();
          }
        }
      );
  }

  closeModal(): void {
    this.invalidAccount = false;
    this.form.reset();
  }

}
