import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavBarComponent } from "../nav-bar/nav-bar.component";

@Component({
  selector: 'app-view-projects',
  imports: [NgFor, NgIf, FormsModule, RouterLink, NavBarComponent,NgClass],
  templateUrl: './view-projects.component.html',
  styleUrl: './view-projects.component.css'
})
export class ViewProjectsComponent {
  projects: any[] = [];
  showTaskForm: boolean = false;
  selectedProjectIndex: number | null = null;
  newTask: any = {
    title: '',
    assignedTo: '',
    status: 'Medium',
    assignedUser: '',
    estimate: '',
    timeSpent: ''
  };
  updateProjectIndex: number | null = null;
  updateProjectData: any = {
    title: '',
    description: '',
    createdBy: '',
    projectManager: '',
    startDate: '',
    endDate: '',
    teamMembers: '',
    dueDate: ''
  };
  constructor() {
    
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects() {
    const storedUser = localStorage.getItem('loggedInUser');
  
  if (storedUser) {
    const user = JSON.parse(storedUser);
    const userProjectsKey = `projects_${user.username}`;
    const storedProjects = localStorage.getItem(userProjectsKey);

    if (storedProjects) {
      this.projects = JSON.parse(storedProjects);
    } else {
      this.projects = [];
    }
  } else {
    this.projects = [];
  }
  }
  

  openTaskForm(index: number) {
    this.selectedProjectIndex = index; // Set selected project index
    this.newTask = { title: '', assignedTo: '', status: 'In Progress', assignedUser: '', estimate: '', timeSpent: '' };
  
    // Open Bootstrap modal with smooth effect
    const modal = document.getElementById('taskModal');
    if (modal) {
      (modal as any).classList.add('show');
      modal.style.display = 'block';
      document.body.classList.add('modal-open');
    }
  }


  openUpdateProjectModal(index: number): void {
    this.updateProjectIndex = index;
    // Make a shallow copy of the project data to update (to avoid two-way binding issues)
    this.updateProjectData = { ...this.projects[index] };
    // Open the modal (assumes you have an element with id 'updateProjectModal')
    const modal = document.getElementById('updateProjectModal');
    if (modal) {
      (modal as any).classList.add('show');
      modal.style.display = 'block';
      document.body.classList.add('modal-open');
    }
  }


  updateProject(): void {
    if (this.updateProjectIndex === null) {
      return;
    }
    // Update the project data in your projects array
    this.projects[this.updateProjectIndex] = { ...this.updateProjectData };

    // Save to localStorage using the user-specific key
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const userProjectsKey = `projects_${user.username}`;
      localStorage.setItem(userProjectsKey, JSON.stringify(this.projects));
    }

    // Close the update modal
    this.closeUpdateProjectModal();
  }

  closeUpdateProjectModal(): void {
    const modal = document.getElementById('updateProjectModal');
    if (modal) {
      (modal as any).classList.remove('show');
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    }
  }

  addTask() {
    if (this.selectedProjectIndex !== null) {
      const storedUser = localStorage.getItem('loggedInUser');
      if (!storedUser) return;
  
      const user = JSON.parse(storedUser);
      const userProjectsKey = `projects_${user.username}`;
  
      let project = this.projects[this.selectedProjectIndex];
  
      if (!project.tasks) {
        project.tasks = [];
      }
  
      project.tasks.push({ ...this.newTask });
  
      localStorage.setItem(userProjectsKey, JSON.stringify(this.projects));
  
      this.newTask = { title: '', assignedTo: '', status: 'In Progress', assignedUser: '', estimate: '', timeSpent: '' };
      this.closeTaskForm();
      this.loadProjects();
    }
  }
  
  
  deleteProject(index: number) {
    if (confirm("Are you sure you want to delete this project?")) {
      this.projects.splice(index, 1);
  
      const storedUser = localStorage.getItem('loggedInUser');
      if (!storedUser) return;
  
      const user = JSON.parse(storedUser);
      const userProjectsKey = `projects_${user.username}`;
  
      localStorage.setItem(userProjectsKey, JSON.stringify(this.projects));
    }
  }
  

  closeTaskForm() {
    const modal = document.getElementById('taskModal');
    if (modal) {
      (modal as any).classList.remove('show');
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    }
  }

  isDueSoon(dueDateStr: string): boolean {
    const today = new Date();
    const dueDate = new Date(dueDateStr);
    
    // Reset times to 0 for accurate date comparison
    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);
  
    const timeDiff = dueDate.getTime() - today.getTime();
    const dayDiff = timeDiff / (1000 * 60 * 60 * 24);
  
    return dayDiff >= 0 && dayDiff <= 3; // Due in 3 days or less
  }


  searchTerm: string = '';

get filteredProjects() {
  return this.projects.filter(project =>
    project.title.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
}

}