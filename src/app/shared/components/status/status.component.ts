import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { STATUS_ENUM } from '@enums/status.enum';
// import { ContentStatus } from '@enums/content-status.enum';

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent {
  statusText = '';
  statusEnum = STATUS_ENUM;
  val: any;

  @Input() set status(val: any) {
    if (typeof val == 'boolean') {
      if (val) {
        this.statusText = this.statusEnum.ACTIVATED;
        // this.statusText = this.statusEnum.PUBLISHED;
      } else {
        this.statusText = this.statusEnum.DEACTIVATED;
        // this.statusText = this.statusEnum.DRAFT;
      }
    } else {
      // switch (val) {
      //   case ContentStatus.Init:
      //   case ContentStatus.ReadyToPublish:
      //     this.statusText = this.statusEnum.DRAFT;
      //     break;
      //   case ContentStatus.Transcoding:
      //     this.statusText = this.statusEnum.IN_PROGRESS;
      //     break;
      //   case ContentStatus.Published:
      //     this.statusText = this.statusEnum.PUBLISHED;
      //     break;
      //   case ContentStatus.Failed:
      //     this.statusText = this.statusEnum.FAILED;
      //     break;
      //   default:
      //     this.statusText = this.statusEnum.DRAFT;
      //     break;
      // }
    }
  }
  @Input() isDanger = false;
  @Input() statusClass!: string | boolean | number;
  @Input() isBackground = true;
  constructor() {}

  ngOnInit(): void {
    // if (typeof this.statusClass == 'string') {
    //   if (
    //     this.statusClass === ContentStatus.Init ||
    //     this.statusClass === ContentStatus.ReadyToPublish
    //   ) {
    //     this.statusClass = 'DRAFT';
    //   }
    //   this.statusClass = this.statusClass.toLowerCase();
    // }
  }
}
