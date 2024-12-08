import { Component, OnInit } from '@angular/core';
import { ProductService } from '../Services/products.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-product',
  standalone:true,
  imports:[CommonModule,MatTableModule,MatButtonModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Llamamos al servicio para obtener los productos
    this.productService.getProductos().subscribe(
      (response: any) => {
        this.productos = response.products; // Asumimos que la respuesta tiene una propiedad 'products'
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }
  crearProducto(producto: any) {
    // Lógica para crear el producto (puede ser un modal, redirección, etc.)
    console.log('Crear producto:', producto);
  }
  editarProducto(producto: any) {
    // Lógica para editar el producto (puede ser un modal, formulario, etc.)
    console.log('Editar producto:', producto);
  }

  eliminarProducto(producto: any) {
    // Lógica para eliminar el producto
    console.log('Eliminar producto:', producto);
    // Aquí podrías eliminarlo de la lista o hacer una solicitud a la API
    this.productos = this.productos.filter(p => p !== producto);
  }
  }
