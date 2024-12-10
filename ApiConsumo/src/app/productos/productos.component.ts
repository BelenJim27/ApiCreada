import { Component, OnInit } from '@angular/core';
import { ProductService } from '../Services/products.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProductDetailModalComponent } from '../product-detail-modal/product-detail-modal.component';
import { ProductEditModalComponent } from '../product-edit-modal/product-edit-modal.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatDialogModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: any[] = [];

  constructor(private productService: ProductService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadProductos(); // Cargar productos al inicio
  }

  loadProductos(): void {
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
    console.log('Crear producto:', producto);
  }

  editarProducto(producto: any): void {
    const dialogRef = this.dialog.open(ProductEditModalComponent, {
      width: '400px',
      data: { ...producto } // Pasamos una copia del producto al modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Actualizamos el producto en el backend
        this.productService.updateProducto(result.id, result).subscribe(
          (updatedProduct) => {
            // Reemplazamos el producto actualizado en la lista local
            const index = this.productos.findIndex(p => p.id === updatedProduct.id);
            if (index !== -1) {
              // Actualizamos el producto en la lista sin necesidad de recargar
              this.productos[index] = updatedProduct;
              console.log('Producto actualizado correctamente:', updatedProduct);
            }
  
            // Volver a cargar los productos desde el servidor para asegurarse de que la tabla está actualizada
            this.loadProductos();  // Llamamos a la función para actualizar la lista de productos
  
          },
          (error) => {
            console.error('Error al actualizar el producto:', error);
            alert('Hubo un error al actualizar los datos.');
          }
        );
      }
    });
  }
  
  

  mostrarProducto(producto: any): void {
    this.dialog.open(ProductDetailModalComponent, {
      width: '400px',
      data: producto
    });
  }

  eliminarProducto(producto: any): void {
    const confirmDelete = window.confirm(
      `¿Estás seguro de que deseas eliminar el producto "${producto.nombre}"?`
    );

    if (confirmDelete) {
      this.productService.deleteProducto(producto.id).subscribe(
        () => {
          // Eliminar el producto de la lista local después de eliminar en el backend
          this.productos = this.productos.filter(p => p.id !== producto.id);
          console.log(`Producto "${producto.nombre}" eliminado correctamente.`);
        },
        (error) => {
          console.error('Error al eliminar el producto:', error);
        }
      );
    }
  }
}
