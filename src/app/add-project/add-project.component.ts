import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterEvent, RouterLink } from '@angular/router';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-project',
  imports: [ReactiveFormsModule, RouterLink, NgFor, NgIf, NavBarComponent],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css'
})
export class AddProjectComponent {
  projectForm: FormGroup;
  projects: any[] = []; // Store multiple projects
  submitted = false;
  currentUsername: string = '';


  constructor(private fb: FormBuilder,private router:Router) {
    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    this.currentUsername = user.username; // Save current user's name
  
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      createdBy: [user.username || '', Validators.required],
      projectManager: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      teamMembers: ['', Validators.required],
      dueDate: ['', Validators.required]
    });
  
    this.loadProjects(); // Load only this user's projects
  
  }

  
  onSubmit() {
    this.submitted = true;
    if (this.projectForm.invalid) {
      return;
    }
  
    const projectData = this.projectForm.value;
    this.projects.push(projectData); // Add project to this user's list
  
    // Save only for this user
    localStorage.setItem(`projects_${this.currentUsername}`, JSON.stringify(this.projects));
  
    console.log('Project added successfully!');
    this.projectForm.reset();
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 0);
  }
  


  loadProjects() {
    const storedProjects = localStorage.getItem(`projects_${this.currentUsername}`);
    if (storedProjects) {
      this.projects = JSON.parse(storedProjects);
    }
  }
  


 
  

}