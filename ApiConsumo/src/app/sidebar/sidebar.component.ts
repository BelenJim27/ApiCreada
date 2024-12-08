import { Component, computed } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MenuComponent } from "../menu/menu.component";
import { signal } from '@angular/core';
import { RouterOutlet,RouterLink,RouterLinkActive, Router } from '@angular/router';

import { MatMenuModule } from '@angular/material/menu';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule, MatIconModule, MatToolbarModule, MenuComponent, RouterOutlet,
  MatMenuModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SiderbarComponent {
  constructor(private router: Router) {}

  collapsed=signal(false);
  sidevabWidth=computed(()=>this.collapsed() ? '65px' : '250px');
  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']); 
  }
  
}
