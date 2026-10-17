//
// page-layout-topbar.component.ts — @carrasco-leo/ng/page-layout
// ~/projects/ng/page-layout/src/page-layout-topbar
//

import { Component, inject } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

import { ClPageLayoutService } from '../page-layout.service';

@Component({
	standalone:          true,
	selector:            'cl-page-layout-topbar, [cl-page-layout-topbar]',
	templateUrl:         './page-layout-topbar.component.html',
	styleUrl:            './page-layout-topbar.component.scss',
	encapsulation:       ViewEncapsulation.None,
	preserveWhitespaces: true,
	host: {
		'class': 'cl-page-layout-topbar',
	},

	imports: [
		MatRippleModule,
		MatIconModule,
	],
})
export class ClPageLayoutTopbar
{
	protected $pageLayout: ClPageLayoutService = inject(ClPageLayoutService);

	toggleSidenav(): void {
		this.$pageLayout.toggleSidenav();
	}
}
