//
// notification-container.component.ts — @carrasco-leo/ng/notification
// ~/projects/ng/notification/src/notification-container
//

import { Component, Directive, inject, viewChild, computed, ViewRef } from '@angular/core';
import type { StaticProvider } from '@angular/core';
import { ViewEncapsulation, ViewContainerRef, Injector } from '@angular/core';

import { Subject } from 'rxjs';

import { ClNotificationOptions } from '../notification-options';
import { ClNotificationRef } from '../notification-ref';
import { ClNotificationItem } from '../notification-item';

// used to generate unique notification ID
let uniqueId: number = 0;

@Component({
	standalone:          true,
	selector:            'cl-notification-container',
	templateUrl:         './notification-container.component.html',
	styleUrl:            './notification-container.component.scss',
	encapsulation:       ViewEncapsulation.None,
	preserveWhitespaces: true,
	host: {
		'class': 'cl-notification-container',
	},

	imports: [
	],
})
export class ClNotificationContainer
{
	protected $closeAllEvents: Subject<void> = new Subject();
	protected $notifications: ClNotificationRef[] = [];

	host = viewChild.required('container', { read: ViewContainerRef });

	open(options: ClNotificationOptions): ClNotificationRef {
		options = { ...new ClNotificationOptions(), ...options };
		if (!options.id) {
			options.id = `cl-notification-${uniqueId++}`;
		}

		const providers: StaticProvider[] = [
			{ provide: ClNotificationOptions, useValue: options },
		];

		const index = this.$notifications.findIndex((value) => value.id === options.id);

		const componentRef = this.host().createComponent(
			ClNotificationItem,
			{
				index: (index === -1) ? this.host().length : index,
				injector: Injector.create({
					providers,
					parent: this.host().injector,
				}),
			},
		);

		const ref = new ClNotificationRef(
			componentRef,
			this.$closeAllEvents,
			options.timeout || 3000,
			this.$notifications[index],
		);

		if (index === -1) {
			this.$notifications.push(ref);
		} else {
			this.$notifications.splice(index, 0, ref);
		}

		ref.afterClose().subscribe(() => {
			this.$notifications.splice(this.$notifications.indexOf(ref), 1);
		});

		return ref;
	}

	close(id: string): void {
		const ref = this.$notifications.find((value) => value.id === id)
		if (ref) {
			ref.dismiss();
		}
	}

	closeAll(): void {
		this.$closeAllEvents.next();
	}
}
