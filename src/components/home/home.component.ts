import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged  } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgbModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthService
    ) { }

    loginForm: FormGroup = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)] ]
    });

    errorMessages = {
        requiredEmail: 'Email is required',
        minlength: 'Password must be at least 6 characters.',
        invalidCredentials: 'Email does not exist or incorrect password',
    };

    ngOnInit(){
        this.loginForm.valueChanges
        .pipe(
          debounceTime(800),
          distinctUntilChanged()
        )
        .subscribe(inputs => {
            const { email, password } = inputs;
            if(email != '' && !this.loginForm.get('email')?.valid){
                this.loginForm.get('email')?.setErrors({ requiredEmail: true })
            }
            if(password != '' && !this.loginForm.get('password')?.valid && !this.loginForm.getError('invalidCredentials')){
                this.loginForm.get('password')?.setErrors({ minlength: true })
            }
        });
    }

    onSubmit() {
        if (this.loginForm.valid) {
            const { email, password } = this.loginForm.value;
            const isValid = this.authService.validateUser(email, password);
            if(!isValid){
                return this.loginForm.get('password')?.setErrors({ invalidCredentials: true });
            }
            this.router.navigate(['/shopping']);
        }
    }
}

