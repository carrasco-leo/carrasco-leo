//
// app.component.ts — carrasco-leo
// ~/projects/app-client/src/app
//

import { Component, ViewEncapsulation, inject } from '@angular/core';
import type { NavigationError } from '@angular/router';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { ClBaseApp } from '@carrasco-leo/ng/core';
import { ClPageLayoutModule } from '@carrasco-leo/ng/page-layout';
import { ClNotificationService } from '@carrasco-leo/ng/notification';

@Component({
	selector:            'app-root',
	templateUrl:         './app.component.html',
	styleUrl:            './app.component.scss',
	encapsulation:       ViewEncapsulation.None,
	preserveWhitespaces: true,

	imports: [
		RouterOutlet,
		RouterLink,
		RouterLinkActive,
		MatIconModule,
		ClPageLayoutModule,
	],
})
export class AppComponent
	extends ClBaseApp
{
	protected $notification: ClNotificationService = inject(ClNotificationService);

	override setAppReady(): void {
		super.setAppReady();
	}

	protected override _onNavigationError(event: NavigationError): void {
		this.$notification.error(event.error.message);

		super._onNavigationError(event);
	}
}
