import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-on-boarding',
  standalone : true,
  imports : [CommonModule,RouterModule],
  templateUrl: './on-boarding.component.html',
  styleUrls: ['./on-boarding.component.scss'],
})
export class OnBoardingComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
