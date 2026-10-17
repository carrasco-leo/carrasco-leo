//
// base-component.ts — @carrasco-leo/ng/core
// ~/projects/ng/core/src/base
//

import type { OnDestroy } from '@angular/core';
import { Directive } from '@angular/core';

import { Subject } from 'rxjs';

@Directive()
export abstract class ClBaseComponent
	implements OnDestroy
{
	protected $onDestroy: Subject<void> = new Subject();

	ngOnDestroy(): void {
		this.$onDestroy.next();
		this.$onDestroy.complete();
	}

	stopEvent(event: Event): void {
		if (event) {
			event.stopPropagation();
			event.preventDefault();
		}
	}
}
