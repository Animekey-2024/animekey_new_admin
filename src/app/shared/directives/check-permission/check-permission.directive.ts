import {
  AfterViewInit,
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { AppStateService } from '@services/app-state.service';

@Directive({
  selector: '[showIf]',
  standalone: true,
})
export class CheckPermissionDirective implements AfterViewInit {
  @Input('showIf') featureID: any | any[];
  @Input('showIfRole') permission!: any;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private appStateService: AppStateService
  ) {}

  ngAfterViewInit() {
    let canView = false;
    const permissions: any[] = this.appStateService.getUserPermissions();
    const permission = permissions.find((permission) => {
      return permission.entity === this.featureID;
    });
    canView = permission?.includes(this.permission);

    if (canView) {
      setTimeout(() => {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      });
    } else {
      this.viewContainerRef.clear();
    }
  }
}
