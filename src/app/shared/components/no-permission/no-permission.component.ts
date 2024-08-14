import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DASHBOARD } from '@constants/routes';

@Component({
  selector: 'app-no-permission',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './no-permission.component.html',
  styleUrls: ['./no-permission.component.scss'],
})
export class NoPermissionComponent {
  constructor(private router: Router) {}

  goToHome() {
    this.router.navigate([DASHBOARD.fullUrl]);
  }
}
