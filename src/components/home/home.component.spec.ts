import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeComponent } from './home.component';
import { AuthService } from '../../services/auth/auth.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['validateUser']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should validate form and call validateUser on submit', () => {
    const formData = {
      email: 'user@demo.com',
      password: '123456'
    };
    component.loginForm.patchValue(formData);
    authService.validateUser.and.returnValue(true);
    component.onSubmit();
    expect(authService.validateUser).toHaveBeenCalledWith(formData.email, formData.password);
    expect(router.navigate).toHaveBeenCalledWith(['/shopping']);
  });

  it('should show error messages for invalid form inputs', () => {
    const emailControl = component.loginForm.get('email');
    const passwordControl = component.loginForm.get('password');
    emailControl?.setValue('user@demo.com');
    passwordControl?.setValue('1234');
    component.onSubmit();
    expect(passwordControl?.hasError('minlength')).toBeTrue();
  });
  
  
  
});
