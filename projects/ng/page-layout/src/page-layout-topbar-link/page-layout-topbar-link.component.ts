//
// page-layout-topbar-link.component.ts — @carrasco-leo/ng/page-layout
// ~/projects/ng/page-layout/src/page-layout-topbar-link
//

import { Component, input, output } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';

@Component({
	standalone:          true,
	selector:            '[cl-page-layout-topbar-link]',
	templateUrl:         './page-layout-topbar-link.component.html',
	styleUrl:            './page-layout-topbar-link.component.scss',
	encapsulation:       ViewEncapsulation.None,
	preserveWhitespaces: true,
	host: {
		'class': 'cl-page-layout-topbar-link',
	},

	imports: [
		MatRippleModule,
	],
})
export class ClPageLayoutTopbarLink
{
}
