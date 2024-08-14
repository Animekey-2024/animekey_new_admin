import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { PERMISSIONS } from '@enums/permissions.enum';
import { PermissionService } from '@services/permission.service';
import { MENUS } from '../sidenav/data/menu';
import { RouterModule } from '@angular/router';
import { SafeContentPipe } from '@shared/pipes/safe-content/safe-content.pipe';
import { HeaderComponent } from '../header/header.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    RouterModule,
    SafeContentPipe,
    HeaderComponent
  ]
})
export class SidebarComponent {
  menus = MENUS;
  #permissionService = inject(PermissionService);
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  ngOnInit(): void {
    this.menus.forEach((item) => {
      item.isVisible = this.#permissionService.hasPermission(
        item.feature,
        PERMISSIONS.VIEW
      );
    });
  }
}
