import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-progress-tracker',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatCardModule,
    NgFor,
    MatIconModule,
  ],
  templateUrl: './progress-tracker.component.html',
  styleUrl: './progress-tracker.component.scss',
})
export class ProgressTrackerComponent {
  progressValue!: number;
  @Input({ required: true }) set totalProgress(progress: number) {
    this.progressValue = progress;
    console.log(this.progressValue);
  }
  uploadProgressData = [];
}
