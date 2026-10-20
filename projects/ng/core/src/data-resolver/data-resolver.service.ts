//
// data-resolver.service.ts — @carrasco-leo/ng/core
// ~/projects/ng/core/src/data-resolver
//

import { Service } from '@angular/core';
import { isDevMode } from '@angular/core';

import type { Subscription, Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';

@Service()
export class DataResolverService
{
	dataRef: Map<BehaviorSubject<any>, Subscription> = new Map();
	resolving: Map<BehaviorSubject<any>, Subscription> = new Map();

	ID: Map<BehaviorSubject<any>, any> = new Map();

	resolve<T>(source: Observable<T>): Promise<BehaviorSubject<T>> {
		return new Promise<BehaviorSubject<T>>((resolve, reject) => {
			const ticks = new BehaviorSubject<T>(undefined as T);
			this.ID.set(ticks, Math.random().toString(32).slice(2));

			if (isDevMode()) {
				console.log('data-ref: resolving() [%s]', this.ID.get(ticks));
			}

			this.resolving.set(ticks, ticks.pipe(first(($$, index) => index !== 0)).subscribe(
				() => {
					if (isDevMode()) {
						console.log('data-ref: resolved() %o [%s]', ticks, this.ID.get(ticks));
					}
					setTimeout(() => resolve(ticks));
				},
				(error) => reject(error),
			));

			this.dataRef.set(ticks, source.subscribe(
				(value) => {
					// console.log('tick %o [%s]', value, this.ID.get(ticks));
					ticks.next(value);
				},
				(error) => {
					if (isDevMode()) {
						console.log('error', error);
					}
					ticks.error(error);
				},
				() => {
					if (isDevMode()) {
						console.log('source completed [%s]', this.ID.get(ticks))
					}

					// ticks.complete();
				},
			));
		});
	}

	free<T>(dataRef: BehaviorSubject<T>): void {
		if (isDevMode()) {
			console.log('data-ref: free() [%s]', this.ID.get(dataRef))
		}
		dataRef.complete();

		if (this.resolving.has(dataRef)) {
			this.resolving.get(dataRef)!.unsubscribe();
			this.resolving.delete(dataRef);
		}

		if (this.dataRef.has(dataRef)) {
			this.dataRef.get(dataRef)!.unsubscribe();
			this.dataRef.delete(dataRef);
		}
	}
}
