//
// app-setup.ts — carrasco-leo
// ~/projects/app-client/src/app
//

import type { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import type { Observable } from 'rxjs';


import { Injectable, inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppSetup
	implements CanActivate
{
	ready: boolean = false;

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot,
	): Promise<boolean>|Observable<boolean>|boolean {
		return this.ready || this._init();
	}

	protected async _init(): Promise<boolean> {
		return this.ready = true;
	}
}
