import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ImageCroppedEvent,
  ImageCropperComponent,
} from 'ngx-image-cropper';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonSelectComponent } from '../common-select/common-select.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ASPECT_RATIOS } from '@constants/filter-data';

const materials = [MatDialogModule, MatButtonModule];

@Component({
  selector: 'app-resize-image',
  standalone: true,
  imports: [
    CommonModule,
    ...materials,
    ImageCropperComponent,
    CommonSelectComponent,
  ],
  templateUrl: './resize-image.component.html',
  styleUrls: ['./resize-image.component.scss'],
})
export class ResizeImageComponent {
  croppedImage: any = '';
  isImageLoaded = false;
  roundCropper = false;
  blobImage!: Blob;
  aspectRatios = ASPECT_RATIOS;
  controlName = '';
  form!: FormGroup;
  #formBuilder = inject(FormBuilder);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<ResizeImageComponent>,
  ) {
    this.controlName = this.data?.controlName;
    this.data = this.data?.data;
    this.roundCropper = this.data.roundCropper;
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.#formBuilder.group({
      ratio: [''],
    });
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.objectUrl;
    this.blobImage = event.blob as Blob;
  }

  imageLoaded() {
    this.isImageLoaded = true;
  }

  onCancel() {
    this.ref.close(null);
  }

  onSubmit() {
    let file: any = this.croppedImage;
    // file.name = this.data.name;
    this.ref.close({
      base64: this.croppedImage,
      file: this.blobImage,
      fileName: this.data.name,
      aspectRatio: this.form.get('ratio')?.value, 
    });
  }

  //set values to form control
  setValue(value: number, control: string) {
    const aspectRatio = this.aspectRatios.find(ratio => ratio.value === value);
    if (aspectRatio) {
      this.form.get(control)?.patchValue(aspectRatio.name);
    }
    this.data.aspectRatio= value;
  }
}
