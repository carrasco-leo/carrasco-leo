//
// directives.ts — @carrasco-leo/ng/page-layout
// ~/projects/ng/page-layout/src
//

import type { OnInit, OnDestroy } from '@angular/core';
import { Directive, inject, input } from '@angular/core';
import { TemplateRef, numberAttribute, booleanAttribute } from '@angular/core';

import { ClPageLayoutService } from './page-layout.service';

@Directive({
	selector: 'cl-page-layout-category',
})
export class ClPageLayoutCategory
	implements OnInit, OnDestroy
{
	protected $pageLayout: ClPageLayoutService = inject(ClPageLayoutService);

	readonly id = input.required<string>({ alias: 'cat-id' });
	readonly label = input.required<string>();

	readonly actived = input<boolean>(false, { transform: booleanAttribute });
	readonly disabled = input<boolean>(false, { transform: booleanAttribute });
	readonly priority = input<number>(0, { transform: numberAttribute });

	ngOnInit(): void {
		this.$pageLayout.addCategory(this);
	}

	ngOnDestroy(): void {
		this.$pageLayout.removeCategory(this);
	}
}

@Directive({
	selector: 'ng-template[cl-page-layout-template]',
})
export class ClPageLayoutTemplate
	implements OnInit, OnDestroy
{
	protected $pageLayout: ClPageLayoutService = inject(ClPageLayoutService);
	readonly templateRef: TemplateRef<void> = inject(TemplateRef);

	readonly category = input.required<string>();

	readonly priority = input<number>(0, { transform: numberAttribute });

	ngOnInit(): void {
		this.$pageLayout.addTemplate(this);
	}

	ngOnDestroy(): void {
		this.$pageLayout.removeTemplate(this);
	}
}

@Directive({
	selector: 'cl-page-layout-toolbar, [cl-page-layout-toolbar]',
	host: {
		'class': 'cl-page-layout-toolbar',
	},
})
export class ClPageLayoutToolbar
{
}

@Directive({
	selector: '[cl-page-layout-sidenav-links]',
	host: {
		'class': 'cl-page-layout-sidenav-content-links',
	},
})
export class ClPageLayoutSidenavLinks
{
}

@Directive({
	selector: '[cl-page-layout-sidenav-link-content]',
	host: {
		'class': 'cl-page-layout-sidenav-link-content',
	},
})
export class ClPageLayoutSidenavLinkContent
{
}

@Directive({
	selector: 'cl-page-layout-sidenav-title, [cl-page-layout-sidenav-title]',
	host: {
		'class': 'cl-page-layout-sidenav-content-title',
	},
})
export class ClPageLayoutSidenavTitle
{
}

@Directive({
	selector: 'cl-page-layout-sidenav-header, [cl-page-layout-sidenav-header]',
	host: {
		'class': 'cl-page-layout-sidenav-header',
	},
})
export class ClPageLayoutSidenavHeader
{
}

@Directive({
	selector: 'cl-page-layout-sidenav-footer, [cl-page-layout-sidenav-footer]',
	host: {
		'class': 'cl-page-layout-sidenav-footer',
	},
})
export class ClPageLayoutSidenavFooter
{
}

@Directive({
	selector: 'cl-page-layout-body, [cl-page-layout-body]',
	host: {
		'class': 'cl-page-layout-body',
	},
})
export class ClPageLayoutBody
{
}
