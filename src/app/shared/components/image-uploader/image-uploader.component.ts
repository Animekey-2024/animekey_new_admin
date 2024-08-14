import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SnackbarService } from '@services/snackbar.service';
import { ERROR_TOASTS } from '@constants/toast-messages';
import { ResizeImageComponent } from '../resize-image/resize-image.component';
import { PLACEHOLDERS } from '@enums/icons.enum';
import { FileUploadConfig } from '@constants/file-upload-config';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export const ALLOWED_FORMATS = ['jpg', 'jpeg', 'png'];

const materials = [MatIconModule, MatDialogModule, MatButtonModule, MatProgressSpinnerModule];

@Component({
  selector: 'app-image-uploader',
  standalone: true,
  imports: [CommonModule, ...materials],
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
})
export class ImageUploaderComponent {
  UPLOAD_IMAGE: string = PLACEHOLDERS.PROFILE_PLACEHOLDER;
  UPLOAD_CSV: string = PLACEHOLDERS.CSV_PLACEHOLDER;

  @ViewChild('file') file!: ElementRef;
  @Output() fileChange = new EventEmitter();
  @Input() defaultPlaceholder!: string;
  @Input() isZipcodeCSV = false;
  @Input() allowFileType = ['.csv'];
  loading = false;

  @Input() set fileImage(e: string) {
    if (e) {
      this.loading = true;
      this.image = e;
      const img = new Image();
      img.src = e;
      img.onload = () => {
        this.loading = false;
      };
      this.showRemoveImage = true;
    }
    else {
      this.image = this.UPLOAD_IMAGE;
    }
  }

  @Input() ratio = '';

  @Input() fileTypes = ALLOWED_FORMATS;
  @Input() maxFileSizeInKB = 5120;
  @Input() imageShape = 'square';
  @Input() cropImageInPopup = false;
  @Input() roundCropper = false;
  @Input() disabled = false;
  @Input() imageTextTemplate!: TemplateRef<unknown>;
  @Input() errorKey = 'Image';
  @Input() controlName = '';

  @Input() aspectRatio = 4 / 4;
  zipcodeCsvFileName = '';

  image = '';
  base64 = '';
  showRemoveImage = false;
  @Input() isVideoUpload = false;

  #toastService = inject(SnackbarService);
  #dialog = inject(MatDialog);
  allowedImageFormats = FileUploadConfig.ALLOWED_IMAGE_FORMATS;

  ngOnInit(): void {
    if (this.defaultPlaceholder && !this.isVideoUpload) {
      this.image = this.defaultPlaceholder;
      this.UPLOAD_IMAGE = this.image;
    }
  }

  openFileSelection() {
    this.file.nativeElement.click();
  }

  handleFileChange(ev: any) {
    const file = ev.target.files[0];
    if (file) {
      if (!this.isValidFileType(file.type)) {
        this.#toastService.openErrorToast(
          ERROR_TOASTS.NOT_VALID_FORMAT(this.fileTypes)
        );
        return;
      }
      if (+(file.size / 1000).toFixed(0) > +this.maxFileSizeInKB) {
        this.#toastService.openErrorToast(
          ERROR_TOASTS.FILE_SIZE_EXCEED(this.maxFileSizeInKB, this.errorKey)
        );
        this.clearFileInputField();
        return;
      }
      const reader = new FileReader();
      this.zipcodeCsvFileName = file.name;
      reader.onload = (ev: any) => {
        const blobFile = ev.target.result;
        if (this.cropImageInPopup) {
          this.openDialog({
            base64: blobFile,
            name: file.name,
            roundCropper: this.roundCropper,
            aspectRatio: this.aspectRatio,
          });
        } else {
          this.image = blobFile;
          this.base64 = blobFile;
          this.showRemoveImage = true;
          this.fileChange.emit({
            file: file,
            base64: this.base64,
            aspectRatio: this.ratio,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  }

  clearFileInputField() {
    this.file.nativeElement.value = null;
  }

  isValidFileType(type: string) {
    return this.fileTypes.includes(type.split('/')[1]);
  }

  removeSelectedFile() {
    this.zipcodeCsvFileName = '';
    this.clearFileInputField();
    if (!this.isVideoUpload) {
      this.image = this.UPLOAD_IMAGE;
    } else {
      this.image = '';
    }
    this.fileChange.emit(null);
    this.showRemoveImage = false;
  }

  openDialog(event: any): void {
    const dialogRef = this.#dialog.open(ResizeImageComponent, {
      data: { data: event, controlName: this.controlName },
    });
    dialogRef.afterClosed().subscribe({
      next: (data: any) => {
        if (data) {
          this.image = data.base64;
          this.base64 = data.base64;
          this.showRemoveImage = true;
          this.fileChange.emit(data);
        } else this.clearFileInputField();
      },
    });
  }
}
