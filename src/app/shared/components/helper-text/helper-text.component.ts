import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-helper-text',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './helper-text.component.html',
  styleUrls: ['./helper-text.component.scss'],
})
export class HelperTextComponent implements OnInit {
  @Input() pattern!: string;
  @Input() text!: string;

  constructor() {}

  ngOnInit(): void {}
}
