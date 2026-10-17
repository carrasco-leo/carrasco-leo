//
// page-layout.component.ts — @carrasco-leo/ng/page-layout
// ~/projects/ng/page-layout/src/page-layout
//

import { Component, inject } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

import { ClPageLayoutService } from '../page-layout.service';

@Component({
	standalone:          true,
	selector:            'cl-page-layout',
	templateUrl:         './page-layout.component.html',
	styleUrl:            './page-layout.component.scss',
	encapsulation:       ViewEncapsulation.None,
	preserveWhitespaces: true,
	host: {
		'class': 'cl-page-layout',
	},

	imports: [
	],
})
export class ClPageLayout
{
	protected $pageLayout: ClPageLayoutService = inject(ClPageLayoutService);

	readonly isSidenavOpened = this.$pageLayout.sidenavOpened.asReadonly();

	closeSidenav(): void {
		this.$pageLayout.toggleSidenav(false);
	}
}
