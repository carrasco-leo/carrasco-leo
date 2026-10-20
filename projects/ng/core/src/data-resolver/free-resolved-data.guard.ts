//
// free-resolved-data.guard.ts — @carrasco-leo/ng/core
// ~/projects/ng/core/src/data-resolver
//

import { Service, inject } from '@angular/core';
import { isDevMode } from '@angular/core';
import type { ActivatedRouteSnapshot, CanDeactivate } from '@angular/router';

import { DataResolverService } from './data-resolver.service';

@Service()
export class FreeResolvedDataGuard<T>
	implements CanDeactivate<T>
{
	protected $dataResolver: DataResolverService = inject(DataResolverService);

	canDeactivate(_component: T, route: ActivatedRouteSnapshot): true {
		const keys: string[] = route.data['freeData'] || [];
		keys.forEach((key) => {
			if (route.data[key]) {
				if (isDevMode()) {
					console.log('data-ref: free "%s" slot', key, route.data[key]);
				}

				this.$dataResolver.free(route.data[key]);
			}
		});

		return true;
	}
}
