import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../service/user.service';
import { UserInterface } from '../interfaces/User';
import { Router } from  '@angular/router';

@Component({
  selector: 'app-profile-setting',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-setting.component.html',
  styleUrl: './profile-setting.component.css'
})
export class ProfileSettingComponent {
  username: string = '';
  email: string = '';
  profileImage: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('loggedInUser');
    if (userData) {
      const user = JSON.parse(userData);
      this.username = user.username;
      this.email = user.email;
      this.profileImage = user.profileImage;
    }
  }

onImageChange(event: any): void {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      this.profileImage = reader.result as string;

      // ✅ Update loggedInUser in localStorage
      const user = JSON.parse(localStorage.getItem('loggedInUser')!);
      user.profileImage = this.profileImage;
      localStorage.setItem('loggedInUser', JSON.stringify(user));

      // ✅ Also update the user in the full users list
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const index = users.findIndex((u: any) => u.username === user.username);
      if (index !== -1) {
        users[index].profileImage = this.profileImage;
        localStorage.setItem('users', JSON.stringify(users));
      }

      alert('Profile image updated successfully!');
      this.router.navigate(['/dashboard']);
    };
    reader.readAsDataURL(file); // Convert image to base64
  }
}

}