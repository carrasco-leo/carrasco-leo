//
// homepage.controller.ts — carrasco-leo
// ~/projects/app-client/src/app/controllers/@homepage
//

import { Component, inject } from '@angular/core';
import type { OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

import type { Observable } from 'rxjs';
import { takeUntil, map, switchMap } from 'rxjs/operators';

import { ClBaseController } from '@carrasco-leo/ng/core';
import { ClNotificationService } from '@carrasco-leo/ng/notification';

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
