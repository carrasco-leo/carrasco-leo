//
// base-app.ts — @carrasco-leo/ng/core
// ~/projects/ng/core/src/base
//

import type { OnInit } from '@angular/core';
import { Directive, inject, signal, computed } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';

import { filter, first } from 'rxjs/operators';

@Directive()
export abstract class ClBaseApp
	implements OnInit
{
	protected $router: Router = inject(Router);
	protected $changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);
	protected $mediaMatcher: MediaMatcher = inject(MediaMatcher);
	protected $document: Document = inject(DOCUMENT);

	readonly appReady = signal<boolean>(false);
	readonly isTablet = computed<boolean>(() => this.tabletQuery.matches);
	readonly isDesktop = computed<boolean>(() => this.desktopQuery.matches);

	// check the different screen sizes
	tabletQuery!: MediaQueryList;
	desktopQuery!: MediaQueryList;

	ngOnInit(): void {
		this._checkAppReady();
		this._setupPageLayout();

		this.$router.events
			.pipe(filter((event): event is NavigationError => event instanceof NavigationError))
			.subscribe((event) => this._onNavigationError(event));
	}

	setAppReady(): void {
		this.appReady.set(true);
	}

	protected _setupPageLayout(): void {
		this.tabletQuery = this.$mediaMatcher.matchMedia('(min-width: 768px)');
		this.desktopQuery = this.$mediaMatcher.matchMedia('(min-width: 992px)');
		this._checkScreenSetup();

		this.tabletQuery.addEventListener('change', () => {
			this._checkScreenSetup();
			this.$changeDetectorRef.detectChanges();
		});

		this.desktopQuery.addEventListener('change', () => {
			this._checkScreenSetup();
			this.$changeDetectorRef.detectChanges();
		});
	}

	protected _checkScreenSetup(): void {
		const classList = this.$document.documentElement.classList;
		let ismobile = false;
		let istablet = false;
		let isdesktop = false;

		if (!this.tabletQuery.matches) {
			ismobile = true;
		} else if (!this.desktopQuery.matches) {
			istablet = true;
		} else {
			isdesktop = true;
		}

		classList.toggle('is-mobile', ismobile);
		classList.toggle('is-tablet', istablet);
		classList.toggle('is-desktop', isdesktop);
	}

	protected _checkAppReady(): void {
		this.$router.events
			.pipe(first((event) => (
				event instanceof NavigationEnd
				|| event instanceof NavigationCancel
				|| event instanceof NavigationError
			)))
			.subscribe(() => this.setAppReady());
	}

	protected _onNavigationError(event: NavigationError): void {
		console.error(event.error);
	}
}
