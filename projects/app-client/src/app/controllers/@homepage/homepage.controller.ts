//
// homepage.controller.ts — carrasco-leo
// ~/projects/app-client/src/app/controllers/@homepage
//

import { Component, inject } from '@angular/core';
import type { OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import {RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import type { Observable } from 'rxjs';
import { takeUntil, map, switchMap } from 'rxjs/operators';

import { ClBaseController } from '@carrasco-leo/ng/core';
import { ClNotificationService } from '@carrasco-leo/ng/notification';
import { ClMessage } from '@carrasco-leo/ng/message';
import { ClPageLayoutModule } from '@carrasco-leo/ng/page-layout';

@Component({
	standalone:          true,
	selector:            'homepage-controller',
	templateUrl:         './homepage.controller.html',
	styleUrl:            './homepage.controller.scss',
	encapsulation:       ViewEncapsulation.None,
	preserveWhitespaces: true,
	host: {
		'class': 'homepage-controller',
	},

	imports: [
		RouterLink,
		RouterLinkActive,
		MatIconModule,
		ClMessage,
		ClPageLayoutModule,
	],
})
export class HomepageController
	extends ClBaseController
	implements OnInit
{
	protected $notification: ClNotificationService = inject(ClNotificationService);

	ngOnInit(): void {
	}

	notify(): void {
		this.$notification.info('This is a notification');
	}
}
