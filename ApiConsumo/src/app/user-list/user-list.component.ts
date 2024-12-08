import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  imports: [CommonModule, HttpClientModule, MatTableModule,MatPaginator],
  providers: [UserService],
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  paginatedUsers: any[] = [];
  pageSize = 5;
  pageIndex = 0;


  @ViewChild(MatPaginator) paginator!: MatPaginator;// Referencia al paginador

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      this.updatePaginatedUsers();
    });
  }

  updatePaginatedUsers() {
    const startIndex = this.pageIndex * this.pageSize;
    this.paginatedUsers = this.users.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedUsers();
  }
}