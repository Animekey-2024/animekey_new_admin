import { Component, OnInit, inject } from '@angular/core';
import {
  NavigationEnd,
  NavigationStart,
  Router,
  RouterModule,
} from '@angular/router';
import { LoaderService } from './services/loader.service';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoaderComponent } from '@components/static/loader/loader.component';
import { ProgressTrackerComponent } from '@shared/components/progress-tracker/progress-tracker.component';
import { BreadcrumbService } from '@shared/components/breadcrumb/breadcrumb.service';
import { HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    LoaderComponent,
    MatSnackBarModule,
    HttpClientModule,
    MatNativeDateModule,
    ProgressTrackerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loader = false;
  breadcrumbService = inject(BreadcrumbService);
  constructor(private router: Router, private loaderService: LoaderService) {}

  ngOnInit() {
    this.listenRouterEvents();
  }

  /**
   * Method for initiating and stopping loader on route change
   */
  listenRouterEvents() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loaderService.displayLoader();
      } else if (event instanceof NavigationEnd) {
        this.loaderService.hideLoader();
        this.breadcrumbService.routerEvents();
      }
    });
    this.loaderService.showLoader.subscribe((data: any) => {
      setTimeout(() => {
        this.loader = data;
      });
    });
  }
}
