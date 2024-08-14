import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CONTACT_INFO } from '@enums/contact-info.enum';
import { ICONS } from '@enums/icons.enum';
import { AbsoluteRoutingPipe } from '@shared/pipes/absolute-routing/absolute-routing.pipe';

@Component({
  selector: 'app-expiry-link',
  templateUrl: './expiry-link.component.html',
  styleUrls: ['./expiry-link.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    RouterModule,
    AbsoluteRoutingPipe,
  ],
})
export class ExpiryLinkComponent {
  adminEmail = CONTACT_INFO.ADMIN_EMAIL;
  icons = ICONS;
}
