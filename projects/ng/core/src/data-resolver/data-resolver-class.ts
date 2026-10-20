//
// data-resolver-class.ts — @carrasco-leo/ng/core
// ~/projects/ng/core/src/data-resolver
//

import { Injectable, inject } from '@angular/core';

import type { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';

import type { Observable } from 'rxjs';

import { DataResolverService } from './data-resolver.service';

@Injectable()
export abstract class DataResolverClass<T>
	implements Resolve<Observable<T>>
{
	protected $dataResolver: DataResolverService = inject(DataResolverService);

	resolve(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot,
	): Promise<Observable<T>> {
		return this.$dataResolver.resolve(this.source(route, state));
	}

	abstract source(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<T>;
}
