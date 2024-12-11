import { Component, OnInit } from '@angular/core';
import { ProductService } from '../Services/products.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProductDetailModalComponent } from '../product-detail-modal/product-detail-modal.component';
import { ProductEditModalComponent } from '../product-edit-modal/product-edit-modal.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: any[] = [];
  searchTerm: string = ''; // Variable para almacenar el término de búsqueda
  paginatedProducts: any[] = []; // Productos que se mostrarán por página
  currentPage: number = 1; // Página actual
  pageSize: number = 5; // Número de productos por página
  totalProducts: number = 0; // Total de productos

  constructor(private productService: ProductService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadProductos(); // Cargar productos al inicio
  }

  loadProductos(): void {
    this.productService.getProductos().subscribe(
      (response: any) => {
        this.productos = response.products; // Asumimos que la respuesta tiene una propiedad 'products'
        this.totalProducts = this.productos.length;
        this.updatePage(); // Actualizar los productos a mostrar después de cargar
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }

  // Actualiza los productos a mostrar según la página actual
  updatePage(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedProducts = this.filterProducts().slice(startIndex, endIndex);
  }

  // Filtra los productos según el término de búsqueda
  filterProducts(): any[] {
    if (!this.searchTerm) {
      return this.productos;
    }
    return this.productos.filter(producto => 
      producto.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      producto.descripcion.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Cambiar la página
  changePage(page: number): void {
    this.currentPage = page;
    this.updatePage();
  }

  // Crear producto
  crearProducto(producto: any) {
    console.log('Crear producto:', producto);
  }

  // Editar producto
  editarProducto(producto: any): void {
    const dialogRef = this.dialog.open(ProductEditModalComponent, {
      width: '400px',
      data: { ...producto } // Pasamos una copia del producto al modal
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.updateProducto(result.id, result).subscribe(
          (updatedProduct) => {
            const index = this.productos.findIndex(p => p.id === updatedProduct.id);
            if (index !== -1) {
              this.productos[index] = updatedProduct;
            }
            this.loadProductos();
          },
          (error) => {
            console.error('Error al actualizar el producto:', error);
          }
        );
      }
    });
  }

  // Mostrar detalles del producto
  mostrarProducto(producto: any): void {
    this.dialog.open(ProductDetailModalComponent, {
      width: '400px',
      data: producto
    });
  }

  // Eliminar producto
  eliminarProducto(producto: any): void {
    const confirmDelete = window.confirm(
      `¿Estás seguro de que deseas eliminar el producto "${producto.nombre}"?`
    );

    if (confirmDelete) {
      this.productService.deleteProducto(producto.id).subscribe(
        () => {
          this.productos = this.productos.filter(p => p.id !== producto.id);
          this.updatePage(); // Actualizamos la página después de eliminar
        },
        (error) => {
          console.error('Error al eliminar el producto:', error);
        }
      );
    }
  }
}
