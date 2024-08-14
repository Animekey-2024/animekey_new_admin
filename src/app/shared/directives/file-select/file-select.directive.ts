import {Directive, EventEmitter, HostListener, input, Input, OnDestroy, Output, Renderer2} from '@angular/core';

@Directive({
  selector: '[appFileSelect]',
  standalone: true
})
export class FileSelectDirective implements OnDestroy {

  @HostListener('click', ['$event']) onClick(event: any) {
    this.openPicker();
  }
  maxSizeInMB = input(5);
  acceptType = input('image/*');
  multiple = input(false);
  @Output() fileSelect = new EventEmitter();
  constructor(private renderer2: Renderer2) { }

  ngOnInit() {

  }

  openPicker() {
    this.removeDummyFileTag();
    const fileTag: HTMLInputElement = this.renderer2.createElement('input');
    fileTag.id = 'file-tag';
    fileTag.type = 'file';
    document.body.appendChild(fileTag);
    fileTag.accept = this.acceptType();
    fileTag.multiple = this.multiple();
    fileTag.addEventListener('change', this.fileChangeListener.bind(this));
    this.renderer2.setProperty(fileTag, 'hidden', 'true');
    fileTag.click();
  }

  removeDummyFileTag() {
    const dummyTag = document.getElementById('file-tag');
    if (dummyTag) {
      document.body.removeChild(dummyTag);
    }
  }

  fileChangeListener(ev: any) {
    const media: FileList[] = ev.target.files;
    if (media) {
      this.removeDummyFileTag(); // iOS issue handling
      this.processFiles(media, (er: any, data: any) => {
        this.fileSelect.emit(data);
      });
    }
  }

  withinLimit(file: File) {
    return (file.size / 1024) < (this.maxSizeInMB() * 1024);
  }

  processFiles(files: any[], cb: any) {
    const updateFiles: any [] = [];
    Array.from(files).forEach((file, index) => {
      if (this.withinLimit(file) && this.acceptType().includes(file.type.split('/')[0])) {
        const reader = new FileReader();
        reader.onload = (ev: any) => {
          updateFiles.push({
            base64: ev.target.result,
            file: file
          });
          if (index === files.length - 1) {
            cb (null, updateFiles);
          }
        }
        reader.readAsDataURL(file);
      }
    });
  }

  ngOnDestroy() {
    this.removeDummyFileTag();
  }

}
