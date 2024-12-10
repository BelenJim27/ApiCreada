import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8000/api/products'; // Ajusta según la URL de tu API

  constructor(private http: HttpClient) {}

  getProductos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  uploadImage(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);
  
    return this.http.post('http://localhost:8000/api/upload', formData);
  }
  
  getProducto(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createProducto(producto: any): Observable<any> {
    return this.http.post(this.apiUrl, producto);
  }

  updateProducto(id: number, producto: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, producto);
  }
  

  deleteProducto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
