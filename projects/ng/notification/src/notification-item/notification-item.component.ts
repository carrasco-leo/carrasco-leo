//
// notification-item.component.ts — @carrasco-leo/ng/notification
// ~/projects/ng/notification/src/notification-item
//

import { Component, inject } from '@angular/core';
import type { OnInit } from '@angular/core';
import { ViewEncapsulation, ElementRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { Subject } from 'rxjs';

import { ClNotificationOptions } from '../notification-options';

@Component({
	standalone:          true,
	selector:            'cl-notification-item',
	templateUrl:         './notification-item.component.html',
	styleUrl:            './notification-item.component.scss',
	encapsulation:       ViewEncapsulation.None,
	preserveWhitespaces: true,
	host: {
		'class': 'cl-notification-item',
		'[id]': 'options.id',
		'[class]': 'options.panelClass',
		'[class.cl-notification-primary]': 'options.type === "primary"',
		'[class.cl-notification-info]': 'options.type === "info"',
		'[class.cl-notification-success]': 'options.type === "success"',
		'[class.cl-notification-warn]': 'options.type === "warn"',
		'[class.cl-notification-error]': 'options.type === "error"',
		'[class.cl-notification-secondary]': 'options.type === "secondary"',
	},

	imports: [
		MatIconModule,
		MatButtonModule,
	],
})
export class ClNotificationItem
	implements OnInit
{
	readonly options: ClNotificationOptions = inject(ClNotificationOptions);
	protected $elementRef: ElementRef<HTMLElement> = inject(ElementRef);

	protected $activeAnimation: Animation | null = null;
	protected $hasEntered: boolean = false;
	protected $isExiting: boolean = false;

	readonly afterExit: Subject<void> = new Subject();
	readonly afterEnter: Subject<void> = new Subject();

	icon: string = 'info';

	ngOnInit(): void {
		if (this.options.icon) {
			this.icon = this.options.icon || 'info';
			return;
		}

		switch (this.options.type) {
			case 'success':
				this.icon = 'check';
				break;

			case 'warn':
				this.icon = 'warning';
				break;

			case 'error':
				this.icon = 'error_outline';
				break;

			case 'info':
				this.icon = 'info_outline';
				break;

			case 'secondary':
				this.icon = 'info';
				break;

			default:
				this.icon = 'info';
				break;
		}
	}

	enter(): void {
		if (this.$hasEntered || this.$isExiting) {
			return;
		}

		const element = this.$elementRef.nativeElement;
		const keyframes: Keyframe[] = [
			{ opacity: 0, transform: 'translateX(-20%)' },
			{ opacity: 1 },
		];

		const animation = element.animate(keyframes, {
			duration: 300,
			easing: 'ease-out',
			fill: 'both',
		});

		this.$activeAnimation = animation;
		animation.finished
			.then(() => {
				if (this.$activeAnimation !== animation || this.$isExiting) {
					return;
				}

				this.$activeAnimation = null;
				this.$hasEntered = true;

				this.afterEnter.next();
				this.afterEnter.complete();
			})
			.catch((error) => console.error(error))
		;
	}

	exit(): void {
		if (this.$isExiting || !this.$hasEntered) {
			return;
		}

		this.$isExiting = true;
		const element = this.$elementRef.nativeElement;
		const keyframes: Keyframe[] = [
			{ opacity: 1 },
			{ opacity: 0, transform: 'translateY(-50%)'},
		];

		const animation = element.animate(keyframes, {
			duration: 300,
			easing: 'ease-out',
			fill: 'forwards',
		});

		this.$activeAnimation = animation;
		animation.finished
			.then(() => {
				if (this.$activeAnimation !== animation) {
					return;
				}

				this.$activeAnimation = null;

				this.afterExit.next();
				this.afterExit.complete();
			})
			.catch((error) => console.error(error))
		;
	}
}
