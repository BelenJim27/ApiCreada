import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ProductService } from '../Services/products.service';

@Component({
  selector: 'app-product-edit-modal',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule, FormsModule, MatDialogModule],
  templateUrl: './product-edit-modal.component.html',
  styleUrls: ['./product-edit-modal.component.css']
})
export class ProductEditModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, // Recibe los datos del producto
    private dialogRef: MatDialogRef<ProductEditModalComponent>,
    private productService: ProductService  // Asegúrate de tener el servicio inyectado

  ) {}

  onNoClick(): void {
    this.dialogRef.close(); // Cerrar el modal sin hacer cambios
  }
  onSubmit() {
    const formData = new FormData();
    formData.append('nombre', this.data.nombre);
    formData.append('descripcion', this.data.descripcion);
    formData.append('precio', this.data.precio);
    formData.append('cantidad', this.data.cantidad);

    // No estamos actualizando la imagen
    this.productService.updateProducto(this.data.id, formData).subscribe(
      updatedProduct => {
        this.dialogRef.close(updatedProduct); // Pasamos el producto actualizado al componente principal
      },
      error => {
        console.error('Error al actualizar el producto:', error);
      }
    );
  }

}
