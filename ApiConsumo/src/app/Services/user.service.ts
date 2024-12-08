import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8000/api/users'; // URL de tu API
  private loggedInUser: any = null;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // Obtener todos los usuarios
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Obtener un usuario por su ID
  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo usuario
  createUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }

  // Actualizar un usuario existente
  updateUser(id: number, user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, user);
  }

  // Eliminar un usuario
  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // Establecer el usuario que ha iniciado sesión
  setLoggedInUser(user: any): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loggedInUser = user;
      localStorage.setItem('loggedInUser', JSON.stringify(user));
    }
  }

  // Obtener el usuario que ha iniciado sesión
  getLoggedInUser(): any {
    if (isPlatformBrowser(this.platformId)) {
      if (!this.loggedInUser) {
        this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
      }
    }
    return this.loggedInUser;
  }
}
