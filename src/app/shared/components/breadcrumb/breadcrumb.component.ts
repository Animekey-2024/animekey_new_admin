import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { BreadcrumbService } from './breadcrumb.service';
import { Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs$!: Observable<Breadcrumb[]>;
  router = inject(Router);
  breadcrumbService = inject(BreadcrumbService);

  ngOnInit() {
    this.breadcrumbs$ = this.breadcrumbService.breadcrumbs$;
    //this.breadcrumbs = this.breadcrumbService.breadcrumbs;
  }
}
