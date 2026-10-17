//
// notification-options.ts — @carrasco-leo/ng/notification
// ~/projects/ng/notification/src
//

export type ClNotificationType =
	'primary'
	| 'success'
	| 'info'
	| 'warn'
	| 'error'
	| 'secondary'
;

export class ClNotificationOptions
{
	id?: string;
	type?: ClNotificationType;
	title?: string;
	message?: string;
	timeout?: number = 3000;
	panelClass?: string|string[];
	icon?: string;
}
