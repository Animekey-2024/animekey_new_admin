import { Component, OnInit, ViewChild, inject } from '@angular/core';
import {
  MatDrawer,
  MatDrawerMode,
  MatSidenavModule,
} from '@angular/material/sidenav';
import { SidenavService } from './layout/sidenav/services/sidenav.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { MatListModule } from '@angular/material/list';
import { ICONS } from '@enums/icons.enum';
import { SidebarComponent } from './layout/sidebar/sidebar.component';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    MatSidenavModule,
    MatButtonModule,
    RouterModule,
    SidebarComponent,
    MatListModule,
  ],
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
})
export class FeaturesComponent implements OnInit {
  @ViewChild(MatDrawer) drawer!: MatDrawer;
  hasBackdrop = false;
  mode: MatDrawerMode = 'side';
  #sidenavService = inject(SidenavService);
  icons = ICONS;

  ngOnInit(): void {
    this.#sidenavService.sidenavOpened.subscribe((opened: boolean) => {
      this.drawer.toggle();
    });
  }
}
