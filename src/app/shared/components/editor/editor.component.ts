import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
// import { QuillModule } from 'ngx-quill';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ICONS } from '@enums/icons.enum';

declare const Quill: any;

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
  @ViewChild('editor') editor!: ElementRef;
  @Input() htmlContent: any = '';
  @Input() toolbarOptions = [
    ['bold', 'italic', 'underline'],
    [{ list: 'bullet' }],
    [{ align: [] }],
    ['undo', 'redo'],
    [
      {
        color: ['#F00', '#0F0', '#00F', '#000', '#FFF', 'color-picker'],
      },
    ],
  ];
  @Input() placeholder = 'Add content...';
  @Input() required = true;
  @Output() onDone = new EventEmitter();
  @Output() enableEditor = new EventEmitter();
  @Input() readOnly = false;
  _quillEditor: any = undefined;
  showActionButtons = false;

  constructor(
    private renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document
  ) {}

  ngOnInit(): void {
    this.loadEditorStyles();
    this.loadEditorScript();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this._quillEditor && changes['htmlContent']) {
      this._quillEditor.root.innerHTML = changes['htmlContent']['currentValue'];
    }
  }

  loadEditorStyles() {
    const linkElement: HTMLLinkElement = this.renderer2.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = 'https://cdn.quilljs.com/1.3.6/quill.snow.css';
    this.renderer2.appendChild(this._document.body, linkElement);
  }

  loadEditorScript() {
    const script: HTMLScriptElement = this.renderer2.createElement('script');
    script.src = 'https://cdn.quilljs.com/1.3.6/quill.js';
    script.async = true;
    script.defer = true;
    this.renderer2.appendChild(this._document.body, script);

    script.addEventListener('load', (e) => {
      var icons = Quill.import('ui/icons');
      icons['undo'] = ICONS.UNDO;
      icons['redo'] = ICONS.REDO;
      this._quillEditor = new Quill('#editor', {
        theme: 'snow',
        modules: {
          toolbar: {
            container: this.toolbarOptions,
            handlers: {
              undo: () => this.undo(),
              redo: () => this.redo(),
            },
          },
        },
        placeholder: this.readOnly ? '' : this.placeholder,
      });

      this._quillEditor.on('text-change', this.onTextChange.bind(this));

      if (this.htmlContent) {
        this._quillEditor.root.innerHTML = this.htmlContent;
      }
      if (this.readOnly) {
        this._quillEditor.disable();
      } else {
        const editor = document.getElementById('editor-wrapper');
        if (editor) {
          editor.addEventListener('click', () => {
            this.showActionButtons = true;
            this.enableEditor.emit(true);
          });
        }
      }
    });
  }

  onTextChange(delta: unknown, oldDelta: unknown, source: unknown) {
    // Handle the text change event here
    this.done();
  }

  hideActions() {
    this.showActionButtons = false;
    this.enableEditor.emit(false);
  }

  // showColorPicker(value: string) {
  //   if (value === 'color-picker') {
  //     var picker = document.getElementById('color-picker')! as any;
  //     if (!picker) {
  //       picker = document.createElement('input');
  //       picker.id = 'color-picker';
  //       picker.type = 'color';
  //       picker.style.display = 'none';
  //       picker.value = '#FF0000';
  //       document.body.appendChild(picker);

  //       picker.addEventListener('change', function() {
  //         quill.format('color', picker.value);
  //       }, false);
  //     }
  //     picker.click();
  //   } else {
  //     quill.format('color', value);
  //   }
  // }

  done() {
    this.htmlContent = this._quillEditor.root.innerHTML;
    this.onDone.emit({
      innerHTML: this._quillEditor.root.innerHTML,
      text: this._quillEditor.getText(),
    });
    this.hideActions();
    this.checkContent();
  }

  // Check if there is content in the editor
  checkContent() {
    const content = this._quillEditor.getContents();
    const hasContent = content.ops && content.ops.length > 1; // Adjust this condition as needed
    if (hasContent) {
      // Editor has content
      // this._quillEditor.enable();  // Enable the editor
      this.enableEditor.emit(false);
    } else {
      // Editor has no content
      // this._quillEditor.disable(); // Disable the editor
      this.enableEditor.emit(true);
    }
  }

  cancel() {
    if (this.htmlContent) {
      this._quillEditor.root.innerHTML = this.htmlContent;
    }
    this.hideActions();
  }

  undo() {
    this._quillEditor.history.undo();
  }

  redo() {
    this._quillEditor.history.redo();
  }
}
