//
// notification.service.ts — @carrasco-leo/ng/notification
// ~/projects/ng/notification/src
//

import { Service, inject } from '@angular/core';
import type { ComponentRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import type { ClNotificationOptions } from './notification-options';
import type { ClNotificationRef } from './notification-ref';
import { ClNotificationContainer } from './notification-container';

@Service()
export class ClNotificationService
{
	protected $overlay: Overlay = inject(Overlay);
	protected $dialog: MatDialog = inject(MatDialog);

	protected $overlayRef: OverlayRef | null = null;
	protected $componentRef: ComponentRef<any> | null = null;

	/**
	 * Open a notification message
	 */
	open(message: string): ClNotificationRef;
	open(message: string, options: ClNotificationOptions): ClNotificationRef;

	open(message: string | ClNotificationOptions, options?: ClNotificationOptions): ClNotificationRef {
		if (typeof message !== 'string') {
			options = message;
		} else if (!options) {
			options = { message };
		} else {
			options.message = message;
		}

		return this._container().open(options);
	}

	protected _container(): ClNotificationContainer {
		if (this.$componentRef) {
			return this.$componentRef.instance;
		}

		const portal = new ComponentPortal(ClNotificationContainer);
		this.$overlayRef = this.$overlay.create({
			panelClass: 'cl-notification-overlay-panel',
		});
		this.$componentRef = this.$overlayRef.attach(portal);

		return this.$componentRef.instance;
	}

	/** **/
	success(message: string): ClNotificationRef;
	success(message: string, options: ClNotificationOptions): ClNotificationRef;

	success(message: string | ClNotificationOptions, options?: ClNotificationOptions): ClNotificationRef {
		if (typeof message !== 'string') {
			options = message;
		} else if (!options) {
			options = { message };
		} else {
			options.message = message;
		}

		options.type = 'success';
		return this._container().open(options);
	}

	/** **/
	info(message: string): ClNotificationRef;
	info(message: string, options: ClNotificationOptions): ClNotificationRef;

	info(message: string | ClNotificationOptions, options?: ClNotificationOptions): ClNotificationRef {
		if (typeof message !== 'string') {
			options = message;
		} else if (!options) {
			options = { message };
		} else {
			options.message = message;
		}

		options.type = 'info';
		return this._container().open(options);
	}

	/** **/
	warn(message: string): ClNotificationRef;
	warn(message: string, options: ClNotificationOptions): ClNotificationRef;

	warn(message: string | ClNotificationOptions, options?: ClNotificationOptions): ClNotificationRef {
		if (typeof message !== 'string') {
			options = message;
		} else if (!options) {
			options = { message };
		} else {
			options.message = message;
		}

		options.type = 'warn';
		return this._container().open(options);
	}

	/** **/
	error(message: string): ClNotificationRef;
	error(message: string, options: ClNotificationOptions): ClNotificationRef;

	error(message: string | ClNotificationOptions, options?: ClNotificationOptions): ClNotificationRef {
		if (typeof message !== 'string') {
			options = message;
		} else if (!options) {
			options = { message };
		} else {
			options.message = message;
		}

		options.type = 'error';
		return this._container().open(options);
	}
}
