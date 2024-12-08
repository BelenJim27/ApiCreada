import { Component, computed, Input } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { signal } from '@angular/core';
import {MatListModule} from '@angular/material/list'
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../Services/user.service';

export type MenuItem={
  icon:string;
  label:string;
  link:string;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatIconModule, MatListModule, CommonModule,RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  constructor(private userService: UserService) {}

  @Input() userImage: string | null = null; // Imagen del usuario logueado
  loggedInUser: any = null;

  sideNavCollapsed=signal(false);
  @Input() set collapsed(value: boolean) {
    this.sideNavCollapsed.set(value);
  };
  menuItems = signal<MenuItem[]>([
    {icon: 'shopping_cart',label: 'Productos',link: '/sidebar/productos' },
    { icon: 'person', label: 'usuarios', link: '/sidebar/usuarios' },
  ]);
  

  profilePicsSize=computed(()=>this.sideNavCollapsed()? '32px' : '100px');

  ngOnInit(): void {
    this.loggedInUser = this.userService.getLoggedInUser();
    console.log('Usuario logueado:', this.loggedInUser); 

  }
}
