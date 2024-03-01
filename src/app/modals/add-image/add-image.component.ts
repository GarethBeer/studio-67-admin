import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SectionImage } from 'src/app/models/section';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrl: './add-image.component.scss',
})
export class AddImageComponent {
  constructor(
    public dialogRef: MatDialogRef<AddImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SectionImage
  ) {
    if (data) {
      this.imageForm = data;
      this.imageUrl =
        'https://res.cloudinary.com/denerup17/image/upload/v1707048218/' +
        data.imageUrl;
    } else {
      this.imageForm = new SectionImage();
    }
  }
  file: any;
  fileName: string = '';
  todaysDate: string = '';
  imageUrl: string = '';
  imageForm: SectionImage;

  onFileSelected(event: any): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.file = inputElement.files[0];
      this.fileName = this.file.name;

      // Format today's date (e.g., YYYYMMDD)
      const today = new Date();
      this.todaysDate = today.toISOString().slice(0, 10).replace(/-/g, '');

      // Optional: Display a preview of the selected image
      this.previewImage();
    }
  }

  private previewImage(): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imageUrl = e.target?.result as string;
    };
    reader.readAsDataURL(this.file);
  }

  closeDialog() {
    this.dialogRef?.close({
      file: this.file,
      imageData: this.imageForm,
    });
  }
}
