//
// message.component.ts — @carrasco-leo/ng/message
// ~/projects/ng/message/src
//

import { Component, input, signal } from '@angular/core';
import type { OnChanges, SimpleChanges } from '@angular/core';
import { ViewEncapsulation, booleanAttribute } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

export type ClMessageType =
	'primary'
	| 'success'
	| 'info'
	| 'warn'
	| 'error'
	| 'secondary'
;

@Component({
	standalone:          true,
	selector:            'cl-message',
	templateUrl:         './message.component.html',
	styleUrl:            './message.component.scss',
	encapsulation:       ViewEncapsulation.None,
	preserveWhitespaces: true,
	host: {
		'class': 'cl-message',
		'[class.cl-message-primary]': 'type() === "primary"',
		'[class.cl-message-info]': 'type() === "info"',
		'[class.cl-message-success]': 'type() === "success"',
		'[class.cl-message-warn]': 'type() === "warn"',
		'[class.cl-message-error]': 'type() === "error"',
		'[class.cl-message-secondary]': 'type() === "secondary"',
		'[class.cl-message-no-icon]': 'noIcon()',
	},

	imports: [
		MatIconModule,
	],
})
export class ClMessage
	implements OnChanges
{
	type = input<ClMessageType | null>(null);
	noIcon = input<boolean>(false, { transform: booleanAttribute });

	icon = signal<string>('info');

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['type']) {
			this._setIcon(this.type());
		}
	}

	protected _setIcon(type: ClMessageType | null): void {
		switch (type) {
			case 'success':
				this.icon.set('check');
				break;

			case 'warn':
				this.icon.set('warning');
				break;

			case 'error':
				this.icon.set('error_outline');
				break;

			case 'info':
				this.icon.set('info_outline');
				break;

			case 'secondary':
				this.icon.set('info');
				break;

			default:
				this.icon.set('info');
				break;
		}
	}
}
