//
// notification-ref.ts — @carrasco-leo/ng/notification
// ~/projects/ng/notification/src
//

import type { ComponentRef } from '@angular/core';

import type { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';

import { ClNotificationItem } from './notification-item';

export class ClNotificationRef
{
	protected $onAction: Subject<number> = new Subject();
	protected $afterClose: Subject<void> = new Subject();
	protected $afterOpen: Subject<void> = new Subject();
	protected $timeoutId: any;

	get id() { return this.$componentRef.instance.options.id; }

	constructor(
		protected $componentRef: ComponentRef<ClNotificationItem>,
		closeEvents: Observable<void>,
		timeout: number,
		previous?: ClNotificationRef,
	) {
		this.$componentRef.instance.afterExit.subscribe(() => this._finish());
		closeEvents.pipe(first()).subscribe(() => this.dismiss());

		this.$componentRef.instance.afterEnter.subscribe(() => {
			this.$afterOpen.next();
			this.$afterOpen.complete();

			if (timeout && timeout > 0) {
				this.$timeoutId = setTimeout(() => this.dismiss(), timeout);
			}
		});

		if (!previous) {
			this.$componentRef.instance.enter();
		} else {
			previous.afterClose().subscribe(() => this.$componentRef.instance.enter());
			previous.dismiss();
		}
	}

	dismiss(): void {
		this.$componentRef.instance.exit();
	}

	afterOpen(): Observable<void> {
		return this.$afterOpen.asObservable();
	}

	afterClose(): Observable<void> {
		return this.$afterClose.asObservable();
	}

	protected _finish(): void {
		this.$afterClose.next();
		this.$afterClose.complete();
		this.$onAction.complete();
		this.$componentRef.destroy();
		clearTimeout(this.$timeoutId);
	}
}
