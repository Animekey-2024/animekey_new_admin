import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortNamePipe } from '@shared/pipes/short-name/short-name.pipe';
import { ImagePlaceholderPipe } from '../../pipes/imagePlaceholder/imagePlaceholder.pipe';

@Component({
  selector: 'app-image-preview',
  standalone: true,
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.scss'],
  imports: [CommonModule, ShortNamePipe, ImagePlaceholderPipe],
})
export class ImagePreviewComponent {
  @Input() image: string = '';
  @Input() text: any;
  @Input() styleClass: string = '';

  constructor() {}

  ngOnInit(): void {}
}
