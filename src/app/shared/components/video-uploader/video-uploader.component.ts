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
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FileUploadConfig } from '@constants/file-upload-config';
import { CommonModule } from '@angular/common';
import { ERROR_TOASTS } from '@constants/toast-messages';
import { SnackbarService } from '@services/snackbar.service';

@Component({
  selector: 'app-video-uploader',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatDialogModule, MatButtonModule],
  templateUrl: './video-uploader.component.html',
  styleUrl: './video-uploader.component.scss',
})
export class VideoUploaderComponent {
  @ViewChild('file') file!: ElementRef;
  @Output() fileChange = new EventEmitter();
  @Input() defaultPlaceholder!: string;
  @Input() isZipcodeCSV = false;
  @Input() allowFileType = ['.csv'];
  fileName = '';
  videoUrl = '';

  @Input() set fileVideo(e: File | null | string) {
    if (e instanceof File) {
      this.previewVideo(e);
      this.fileName = e?.name;
    } else if (typeof e === 'string') {
      // Assuming the string represents the URL of the video
      this.videoUrl = e;
    }
  }
  @Input() fileTypes = FileUploadConfig.ALLOWED_VIDEO_FORMATS;
  @Input() disabled = false;
  @Input() imageTextTemplate!: TemplateRef<unknown>;
  @Input() errorKey = 'Image';
  @Input() aspectRatio = 4 / 4;
  #toastService = inject(SnackbarService);

  ngOnInit(): void {}

  openFileSelection() {
    if (this.file) {
      this.file?.nativeElement.click();
    }
  }

  handleVideoFileChange(ev: any) {
    const file = ev.target.files[0];
    if (file) {
      // Check if the file extension is allowed
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      if (this.allowFileType.includes(fileExtension)) {
        // Process the file
        this.fileChange.emit(file);
        this.fileName = file?.name;
        this.previewVideo(file); // Call previewVideo() to display preview or play video
        // reader.readAsDataURL(file);
      } else {
        // Invalid file extension
        this.#toastService.openErrorToast(
          ERROR_TOASTS.NOT_VALID_FORMAT(this.fileTypes)
        );
      }
    }
  }

  clearFileInputField() {
    this.videoUrl = '';
    this.file?.nativeElement?.setValue(null);
  }

  isValidFileType(type: string) {
    return this.fileTypes.includes(type.split('/')[1]);
  }

  removeSelectedFile() {
    this.fileChange.emit(null);
    this.clearFileInputField();
  }

  previewVideo(file: File) {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.videoUrl = event.target.result; // Data URL of the video
    };
    reader.readAsDataURL(file);
  }
}
