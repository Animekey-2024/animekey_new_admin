import { Injectable, inject } from '@angular/core';
import {
  Router,
  NavigationEnd,
  ActivatedRouteSnapshot,
  Data,
  RouterEvent,
} from '@angular/router';
import { UtilityService } from '@services/utility.service';
import { BehaviorSubject } from 'rxjs';
import { filter, pairwise, startWith, takeUntil } from 'rxjs/operators';

export interface Breadcrumb {
  label: string;
  url: string;
}

export interface RouteData {
  breadcrumb: string;
}

@Injectable({ providedIn: 'root' })
export class BreadcrumbService {
  // Subject emitting the breadcrumb hierarchy
  private readonly _breadcrumbs$ = new BehaviorSubject<Breadcrumb[]>([]);

  // Observable exposing the breadcrumb hierarchy
  readonly breadcrumbs$ = this._breadcrumbs$.asObservable();
  #utilityService = inject(UtilityService);

  constructor(private router: Router) {
    this.routerEvents();
  }

  routerEvents() {
    this.router.events
      .pipe(
        filter((event: any) => event instanceof NavigationEnd),
        pairwise(),
        filter((events: RouterEvent[]) => events[0].url === events[1].url),
        startWith('Initial call')
      )
      .subscribe((event) => {
        // Construct the breadcrumb hierarchy
        const root = this.router.routerState.snapshot.root;
        const breadcrumbs: Breadcrumb[] = [];
        this.addBreadcrumb(root, [], breadcrumbs);
        // Emit the new hierarchy
        const filteredBreadcrumb =
          this.#utilityService.removeDuplicateObjects(breadcrumbs);
        this._breadcrumbs$.next(filteredBreadcrumb);
      });
  }

  private addBreadcrumb(
    route: ActivatedRouteSnapshot,
    parentUrl: string[],
    breadcrumbs: Breadcrumb[]
  ) {
    if (route) {
      // Construct the route URL
      const routeUrl = parentUrl.concat(route.url.map((url) => url.path));
      // Add an element for the current route part
      if (route.data['breadcrumb']) {
        const breadcrumb = {
          label: this.getLabel(route.data),
          url: '/' + routeUrl.join('/'),
        };
        if (route.params && route.data['isShowId']) {
          const breadcrumbURL = breadcrumb.url.split('/');
          breadcrumb.label = breadcrumbURL[breadcrumbURL.length - 1];
        }

        breadcrumbs.push(breadcrumb);
      }

      // Add another element for the next route part
      this.addBreadcrumb(
        route.firstChild as ActivatedRouteSnapshot,
        routeUrl,
        breadcrumbs
      );
    }
  }

  private getLabel(data: Data) {
    // The breadcrumb can be defined as a static string or as a function to construct the breadcrumb element out of the route data
    return typeof data['breadcrumb'] === 'function'
      ? data['label'](data)
      : data['label'];
  }
}
