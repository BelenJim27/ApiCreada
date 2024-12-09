import { Component, computed } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MenuComponent } from "../menu/menu.component";
import { signal } from '@angular/core';
import { RouterOutlet,RouterLink,RouterLinkActive, Router } from '@angular/router';

import { MatMenuModule } from '@angular/material/menu';
import { UserService } from '../Services/user.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule, MatIconModule, MatToolbarModule, MenuComponent, RouterOutlet,
  MatMenuModule,CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SiderbarComponent {
  constructor(private router: Router, private userService: UserService) {}
  loggedInUser: any = null;
  collapsed=signal(false);
  sidevabWidth=computed(()=>this.collapsed() ? '65px' : '250px');
  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']); 
  }
  
  ngOnInit(): void {
    this.loggedInUser = this.userService.getLoggedInUser();
    console.log('Usuario logueado:', this.loggedInUser); 

  }
}
