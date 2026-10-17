//
// page-layout-sidenav-link.component.ts — @carrasco-leo/ng/page-layout
// ~/projects/ng/page-layout/src/page-layout-sidenav-link
//

import { Component, input, output } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';

@Component({
	standalone:          true,
	selector:            '[cl-page-layout-sidenav-link]',
	templateUrl:         './page-layout-sidenav-link.component.html',
	styleUrl:            './page-layout-sidenav-link.component.scss',
	encapsulation:       ViewEncapsulation.None,
	preserveWhitespaces: true,
	host: {
		'class': 'cl-page-layout-sidenav-link',
	},

	imports: [
		MatRippleModule,
	],
})
export class ClPageLayoutSidenavLink
{
}
