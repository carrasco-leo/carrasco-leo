//
// page-layout.service.ts — @carrasco-leo/ng/page-layout
// ~/projects/ng/page-layout/src
//

import { Service, signal } from '@angular/core';

import { ClPageLayoutCategory, ClPageLayoutTemplate } from './directives';

@Service()
export class ClPageLayoutService
{
	readonly sidenavOpened = signal<boolean>(false);
	readonly currentCategory = signal<ClPageLayoutCategory|null>(null);
	readonly categories = signal<ClPageLayoutCategory[]>([]);

	templates: Record<string, ClPageLayoutTemplate[]> = {};

	toggleSidenav(toggled: boolean = !this.sidenavOpened()): void {
		this.sidenavOpened.set(toggled);
	}

	addCategory(cat: ClPageLayoutCategory): void {
		if (cat.actived()) {
			this.currentCategory.set(cat);
		}

		this.categories.update((values) => {
			this._add(values, cat);
			return [...values];
		})
	}

	removeCategory(cat: ClPageLayoutCategory): void {
		this.categories.update((values) => {
			this._remove(values, cat);
			return [...values];
		});
	}

	addTemplate(template: ClPageLayoutTemplate): void {
		if (!this.templates[template.category()]) {
			this.templates[template.category()] = [];
		}

		this._add(this.templates[template.category()], template);
	}

	removeTemplate(template: ClPageLayoutTemplate): void {
		this._remove(this.templates[template.category()], template);

		if (this.templates[template.category()].length === 0) {
			delete this.templates[template.category()];
		}
	}

	protected _add(
		values: Array<ClPageLayoutTemplate|ClPageLayoutCategory>,
		value: ClPageLayoutTemplate|ClPageLayoutCategory,
	): void {
		let index = values.indexOf(value);
		if (index !== -1) {
			values.splice(index, 1);
		}

		index = values.findIndex((it) => it.priority() > value.priority());
		if (index === -1) {
			values.push(value);
		} else {
			values.splice(index, 0, value);
		}
	}

	protected _remove(
		values: Array<ClPageLayoutTemplate|ClPageLayoutCategory>,
		value: ClPageLayoutTemplate|ClPageLayoutCategory,
	): void {
		let index = values.indexOf(value);
		if (index !== -1) {
			values.splice(index, 1);
		}
	}
}
