import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'; 
import { UserInterface } from '../interfaces/User';
import { UserService } from '../service/user.service';


@Component({
  selector: 'app-login',
  imports: [NgIf,ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 

 
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private router:Router, private userService:UserService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]], 
      password: ['', [Validators.required]]  
    });
  }

  
  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
  
      const storedUsers: UserInterface[] = JSON.parse(localStorage.getItem('users') || '[]');
      const loggedInUser = storedUsers.find(user => user.username === username && user.password === password);
  
      if (loggedInUser) {
        // Save session data
        localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
        // alert(`Welcome ${loggedInUser.username}`);
        this.router.navigate(['/dashboard']);
      } else {
        alert('Invalid username or password');
      }
    }
  }


}