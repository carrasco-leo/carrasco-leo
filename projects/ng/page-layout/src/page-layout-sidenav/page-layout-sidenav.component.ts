//
// page-layout-sidenav.component.ts — @carrasco-leo/ng/page-layout
// ~/projects/ng/page-layout/src/page-layout-sidenav
//

import { Component, inject } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

import { ClPageLayoutService } from '../page-layout.service';

@Component({
	standalone:          true,
	selector:            'cl-page-layout-sidenav, [cl-page-layout-sidenav]',
	templateUrl:         './page-layout-sidenav.component.html',
	styleUrl:            './page-layout-sidenav.component.scss',
	encapsulation:       ViewEncapsulation.None,
	preserveWhitespaces: true,
	host: {
		'class': 'cl-page-layout-sidenav',
		'[class.opened]': 'isOpened()'
	},

	imports: [
		NgTemplateOutlet,
		MatRippleModule,
		MatIconModule,
	],
})
export class ClPageLayoutSidenav
{
	protected $pageLayout: ClPageLayoutService = inject(ClPageLayoutService);

	readonly currentCategory = this.$pageLayout.currentCategory.asReadonly();
	readonly isOpened = this.$pageLayout.sidenavOpened.asReadonly();

	get categories() { return this.$pageLayout.categories; }
	get templates() { return this.$pageLayout.templates; }

	toggleActiveCategory(id: string): void {
		for (const cat of this.$pageLayout.categories) {
			if (cat.id() === id) {
				if (this.currentCategory() === cat) {
					this.$pageLayout.currentCategory.set(null);
				} else {
					this.$pageLayout.currentCategory.set(cat);
				}

				return;
			}
		}

		this.$pageLayout.currentCategory.set(null);
	}
}
