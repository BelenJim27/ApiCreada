import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../Services/products.service';

@Component({
  selector: 'app-product-create-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './product-create-modal.component.html',
  styleUrls: ['./product-create-modal.component.css']
})
export class ProductCreateModalComponent {
  newProduct: any = {
    nombre: '',
    descripcion: '',
    precio: 0,
    cantidad: 0,
    image: null, // Aquí se almacenará el archivo seleccionado
  };

  selectedFile: File | null = null;

  constructor(
    public dialogRef: MatDialogRef<ProductCreateModalComponent>,
    private productService: ProductService
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  createProduct(): void {
    const formData = new FormData();
    formData.append('nombre', this.newProduct.nombre);
    formData.append('descripcion', this.newProduct.descripcion);
    formData.append('precio', this.newProduct.precio.toString());
    formData.append('cantidad', this.newProduct.cantidad.toString());
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    this.productService.createProducto(formData).subscribe(
      (response) => {
        this.dialogRef.close(true);
      },
      (error) => {
        console.error('Error al crear el producto:', error);
      }
    );
  }
}
