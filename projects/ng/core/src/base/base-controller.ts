//
// base-controller.ts — @carrasco-leo/ng/core
// ~/projects/ng/core/src/base
//

import { Directive, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ClBaseComponent } from './base-component';

@Directive()
export abstract class ClBaseController
	extends ClBaseComponent
{
	protected $router: Router = inject(Router);
	protected $route: ActivatedRoute = inject(ActivatedRoute);
}
